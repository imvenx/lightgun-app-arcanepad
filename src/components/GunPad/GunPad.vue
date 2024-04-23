<template>
  <div
    style="display:grid; grid-template-rows: 33% 33% 33%; gap: 2px; height: 100vh; user-select: none;
  background-image: url('/src/assets/images/gun.webp'); background-position: 60% 25%; background-size: 130%; background-repeat: no-repeat;">

    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div class="gunButton" @touchend="openMenu()">
        Menu
      </div>
      <div class="gunButton" @touchstart="startCalibrateSequence()">
        Calibrate
      </div>
      <div class="gunButton" :style="`color:${isWeaponEnabled ? 'orange' : 'yellowgreen'}`"
        @touchstart="toggleWeaponEnabled()">
        {{ isWeaponEnabled ? 'Disable' : 'Enable' }} Weapon
      </div>
    </div>
    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div>
      </div>
      <div class="gunButton">
        Extra 1
      </div>
      <div class="gunButton">
        Extra 2
      </div>
    </div>

    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div>
        {{ count }}
      </div>
      <div class="gunButton" @touchstart="shoot()" @touchend="stopShoot()">
        Shoot
      </div>
      <div class="gunButton" @touchstart="reload()">
        Reload
      </div>
    </div>

    <div v-if="isMenuEnabled"
      style="position: absolute; background-color: black; width: 100%; height: 100%; padding: 5%; display: grid; gap: 5%;">
      <q-btn size="xl" outline @touchstart="closeMenu()">Back to Gun</q-btn>
      <q-btn size="xl" outline @click="toggleSound()">{{ isSoundEnabled ? `Sound Enabled` : `Sound
        Disabled` }}</q-btn>
      <q-btn size="xl" outline @click="toggleVibration()">{{ isVibrationEnabled ? `Vibration
        Enabled` : `Vibration
        Disabled` }}</q-btn>
      <q-btn size="xl" outline @touchend="exitApp()" color="red">Exit App</q-btn>
    </div>

  </div>

</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent, GetPointerEvent } from 'arcanepad-web-sdk';
import { MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent } from 'src/models/models';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import shootSound from 'assets/sounds/shotgun/shotgun_fire.mp3'
import triggerSound from 'assets/sounds/shotgun/trigger.wav'
import reloadSound from 'assets/sounds/shotgun/shotgun_reload.mp3'
import { playSound } from 'src/utils';
import reloadSound1 from 'assets/sounds/shotgun/shotgun_reload_1.wav'
import { MouseMoveEvent } from 'src/models';
import GunPadMenu from './GunPadMenu.vue';

const count = ref(0)
const isSoundEnabled = ref(true)
const isWeaponEnabled = ref(false)
const isVibrationEnabled = ref(true)
const isMenuEnabled = ref(false)

let isCalibrateSequenceTopLeft = false
let isCalibrateSequenceBottomRight = false

onMounted(() => {
  Arcane.pad?.setScreenOrientationLandscape()

  Arcane.pad?.startGetPointer()
  Arcane.pad?.onGetPointer((e: GetPointerEvent) => {
    emitMoveMouse(e)
  })

  document.querySelectorAll('.gunButton').forEach(button => {
    button.addEventListener('touchstart', changeBackgroundColorOnPress);
    button.addEventListener('touchend', resetBackgroundColorOnRelease);
  });
})

onUnmounted(() => {
  Arcane.pad?.stopGetPointer()
})

function changeBackgroundColorOnPress(event: any) {
  event.target.style.backgroundColor = 'rgba(0,100,255,.5)';
}

function resetBackgroundColorOnRelease(event: any) {
  event.target.style.backgroundColor = '';
}

function startCalibrateSequence() {
  Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceTopLeft'))
  isCalibrateSequenceTopLeft = true
  playSound(reloadSound1)
}

function shoot() {

  if (isCalibrateSequenceTopLeft) {
    Arcane.pad?.calibratePointer(true)
    isCalibrateSequenceTopLeft = false
    isCalibrateSequenceBottomRight = true
    Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceBottomRight'))
    if (isSoundEnabled.value) playSound(triggerSound)
    if (isVibrationEnabled.value) Arcane.pad?.vibrate(200)
    return
  }

  if (isCalibrateSequenceBottomRight) {
    Arcane.pad?.calibratePointer(false)
    isCalibrateSequenceBottomRight = false
    Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceEnded'))
    if (isSoundEnabled.value) playSound(triggerSound)
    if (isVibrationEnabled.value) Arcane.pad?.vibrate(200)
    return
  }

  if (!isWeaponEnabled.value) {
    if (isSoundEnabled.value) playSound(triggerSound)
    return
  }

  Arcane.msg.emit(new MouseButtonHoldEvent('Left'), [])

  if (isSoundEnabled.value) playSound(shootSound)
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(200)
}

function stopShoot() {
  Arcane.msg.emit(new MouseButtonReleaseEvent('Left'), [])
}

function reload() {
  if (!isWeaponEnabled.value) {
    if (isSoundEnabled.value) playSound(triggerSound)
    return
  }

  if (isSoundEnabled.value) playSound(reloadSound)
  Arcane.msg.emit(new MouseButtonPressEvent('Right'), [])

  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(100) }, 50);
  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(100) }, 250);
}

function toggleWeaponEnabled() {
  isWeaponEnabled.value = !isWeaponEnabled.value
  if (isWeaponEnabled.value) Arcane.msg.emitToViews(new ArcaneBaseEvent('WeaponEnabled'))

  // if (isShootEnabled.value) {
  //   Arcane.pad?.startGetPointer()
  // } else {
  //   Arcane.pad?.stopGetPointer()
  // }

  if (isVibrationEnabled.value) Arcane.pad?.vibrate(100)
  if (isSoundEnabled.value) playSound(reloadSound1)
}

function emitMoveMouse({ x, y }: GetPointerEvent) {
  if (!isWeaponEnabled.value) return

  if (isCalibrateSequenceTopLeft || isCalibrateSequenceBottomRight) return
  Arcane.msg.emit(new MouseMoveEvent(x, y), [])
}

function closeMenu() {
  if (isSoundEnabled.value) playSound(reloadSound1)
  isMenuEnabled.value = false
}

function openMenu() {
  if (isSoundEnabled.value) playSound(reloadSound1)
  isMenuEnabled.value = true
}

function toggleSound() {
  if (!isSoundEnabled.value) playSound(reloadSound1)
  isSoundEnabled.value = !isSoundEnabled.value
}

function toggleVibration() {
  if (isSoundEnabled.value) playSound(reloadSound1)
  isVibrationEnabled.value = !isVibrationEnabled.value
}

function exitApp() {
  if (isSoundEnabled.value) playSound(reloadSound1)
  Arcane.msg.emitToViews(new ArcaneBaseEvent('ExitApp'))
}

</script>

<style scoped>
.gunButton {
  display: grid;
  text-align: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, .5);
  border: 1px solid rgba(255, 255, 255, .5);
}
</style>
