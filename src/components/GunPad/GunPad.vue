<template>
  <div style="display:grid; grid-template-rows: 33% 33% 33%; gap: 2px; height: 100vh; user-select: none;">

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
    <div style="display: grid; gap: 2px; grid-template-columns: 25% 40% 35%">
      <div>
      </div>
      <div class="gunButton" v-if="gunButtons.extraButton" @touchstart="onExtraButtonPressed()">
        {{ gunButtons.extraButton.text ? gunButtons.extraButton.text : 'Extra' }}
      </div>
      <div v-else></div>
      <div class="gunButton" v-if="gunButtons.escButton" @touchstart="onEscButtonPressed()">
        {{ gunButtons.escButton.text ? gunButtons.escButton.text : 'Esc' }}
      </div>
      <div v-else></div>
    </div>

    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div>
      </div>
      <div class="gunButton" @touchstart="shoot()" @touchend="stopShoot()">
        Shoot
      </div>
      <div class="gunButton" @touchstart="reload()" v-if="gunButtons.reloadButton">
        {{ gunButtons.reloadButton.text ? gunButtons.reloadButton.text : 'Reload' }}
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

    <GunAnim />
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent, GetPointerEvent } from 'arcanepad-web-sdk';
import { GunButtons, MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent } from 'src/models/models';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import shootSound from '/assets/sounds/shotgun/shotgun_fire.mp3'
import triggerSound from '/assets/sounds/shotgun/trigger.wav'
import reloadSound from '/assets/sounds/shotgun/shotgun_reload.mp3'
import { playSound } from 'src/utils';
import reloadSound1 from '/assets/sounds/shotgun/shotgun_reload_1.wav'
import { MouseMoveEvent } from 'src/models';
import GunPadMenu from './GunPadMenu.vue';
import GunAnim from '../GunAnim.vue';

const props = defineProps<{ soundEnabled: boolean, vibrationEnabled: boolean, weaponEnabled: boolean, gunButtons: GunButtons }>()

const emit = defineEmits<{
  // shoot: [],
  // reload: [],
  // calibrateSequenceTopLeft: [],
  // calibrateSequenceBottomRight: [],
  // calibrateSequenceEnd: [],
}>()

const isSoundEnabled = ref(props.soundEnabled)
const isWeaponEnabled = ref(props.weaponEnabled)
const isVibrationEnabled = ref(props.vibrationEnabled)
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
  Arcane.pad?.stopGetPointer(true)
})

function changeBackgroundColorOnPress(event: any) {
  event.target.style.backgroundColor = 'rgba(0,100,255,.5)';
}

function resetBackgroundColorOnRelease(event: any) {
  event.target.style.backgroundColor = '';
}

function startCalibrateSequence() {
  // emit('calibrateSequenceTopLeft')
  Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceTopLeft'))
  isCalibrateSequenceTopLeft = true
  if (isSoundEnabled.value) playSound(reloadSound1)
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(50)
}

function onEscButtonPressed() {
  props.gunButtons?.escButton?.action ? props.gunButtons.escButton.action() : ''
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(50)
  if (isSoundEnabled.value) playSound(reloadSound1)
}

function onExtraButtonPressed() {
  if (!isWeaponEnabled.value) {
    if (isSoundEnabled.value) playSound(triggerSound)
    return
  }

  props.gunButtons?.extraButton?.action ? props.gunButtons.extraButton.action() : ''
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(50)
  if (isSoundEnabled.value) playSound(reloadSound1)
}

function shoot() {

  if (isCalibrateSequenceTopLeft) {
    Arcane.pad?.calibratePointer(true)
    isCalibrateSequenceTopLeft = false
    isCalibrateSequenceBottomRight = true
    // emit('calibrateSequenceBottomRight')
    Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceBottomRight'))
    if (isSoundEnabled.value) playSound(triggerSound)
    if (isVibrationEnabled.value) Arcane.pad?.vibrate(100)
    return
  }

  if (isCalibrateSequenceBottomRight) {
    Arcane.pad?.calibratePointer(false)
    isCalibrateSequenceBottomRight = false
    // emit('calibrateSequenceEnd')
    Arcane.msg.emitToViews(new ArcaneBaseEvent('CalibrateSequenceEnded'))
    if (isSoundEnabled.value) playSound(triggerSound)
    if (isVibrationEnabled.value) Arcane.pad?.vibrate(100)
    return
  }

  if (!isWeaponEnabled.value) {
    if (isSoundEnabled.value) playSound(triggerSound)
    return
  }

  Arcane.msg.emit(new MouseButtonHoldEvent('Left'), [])

  if (isSoundEnabled.value) playSound(shootSound)
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(100)

  window.dispatchEvent(new CustomEvent('GunShoot'))
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
  if (props.gunButtons.reloadButton?.action) props.gunButtons.reloadButton.action()
  // Arcane.msg.emit(new MouseButtonPressEvent('Right'), [])

  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(50) }, 50);
  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(50) }, 250);

  window.dispatchEvent(new CustomEvent('GunReload'))
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
  box-shadow: 0 0 10px black;
}
</style>
