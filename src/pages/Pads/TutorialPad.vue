<template>
  <div
    style="display:grid; grid-template-rows: 33% 33% 33%; gap: 2px; height: 100vh; user-select: none;
  background-image: url('/src/assets/images/gun.webp'); background-position: 60% 25%; background-size: 130%; background-repeat: no-repeat;">

    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div class="gunButton" @touchstart="isMenuEnabled = true">
        Menu
      </div>
      <div class="gunButton">
        Calibrate
      </div>
      <div class="gunButton" :style="`color:${isShootEnabled ? 'yellowgreen' : 'orange'}`"
        @touchstart="toggleShootEnabled()">
        Weapon {{ isShootEnabled ? 'Enabled' : 'Disabled' }}
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
      style="position: absolute; background-color: black; width: 100%; height: 100%; padding: 5%; display: grid;">
      <q-btn size="xl" outline @touchstart="isMenuEnabled = false">Back to Gun</q-btn>
      <q-btn size="xl" outline @touchend="exitApp()">Exit App</q-btn>
      <q-btn size="xl" outline>Disable Sound</q-btn>
      <q-btn size="xl" outline>Disable Vibration</q-btn>
    </div>
  </div>

</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent } from 'src/models/models';
import { onMounted, onUpdated, ref } from 'vue';
import shootSound from 'assets/sounds/shotgun/shotgun_fire.mp3'
import reloadSound from 'assets/sounds/shotgun/shotgun_reload.mp3'
import { playSound } from 'src/utils';
import reloadSound1 from 'assets/sounds/shotgun/shotgun_reload_1.wav'

const count = ref(0)
const isSoundEnabled = ref(true)
const isShootEnabled = ref(true)
const isVibrationEnabled = ref(true)
const isMenuEnabled = ref(false)

onMounted(() => {
  Arcane.pad?.setScreenOrientationLandscape()
})

function shoot() {
  if (!isShootEnabled.value) return

  Arcane.msg.emit(new MouseButtonHoldEvent('Left'), [])

  if (isSoundEnabled.value) playSound(shootSound)
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(200)
}

function stopShoot() {
  Arcane.msg.emit(new MouseButtonReleaseEvent('Left'), [])
}

function reload() {
  if (!isShootEnabled.value) return

  if (isSoundEnabled.value) playSound(reloadSound)
  Arcane.msg.emit(new MouseButtonPressEvent('Right'), [])

  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(100) }, 50);
  setTimeout(() => { if (isVibrationEnabled.value) Arcane.pad?.vibrate(100) }, 250);
}

function toggleShootEnabled() {
  isShootEnabled.value = !isShootEnabled.value
  if (isVibrationEnabled.value) Arcane.pad?.vibrate(100)
  if (isSoundEnabled.value) playSound(reloadSound1)
}

function exitApp() {
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
