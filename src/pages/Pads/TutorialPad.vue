<template>
  <div
    style="display:grid; grid-template-rows: 33% 33% 33%; gap: 2px; height: 100vh; user-select: none;
  background-image: url('/src/assets/images/gun.webp'); background-position: 60% 25%; background-size: 130%; background-repeat: no-repeat;">

    <div style="display: grid; gap: 2px; grid-template-columns: 30% 40% 30%;">
      <div class="gunButton">
        Menu
      </div>
      <div class="gunButton">
        Calibrate
      </div>
      <div class="gunButton">
        Safety Catch
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
  </div>
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import { MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent } from 'src/models/models';
import { onMounted, ref } from 'vue';
import shootSound from 'assets/sounds/shotgun/shotgun_fire.mp3'
import reloadSound from 'assets/sounds/shotgun/shotgun_reload.mp3'
import { playSound } from 'src/utils';

const count = ref(0)
const soundEnabled = ref(false)

onMounted(() => {
  Arcane.pad?.setScreenOrientationLandscape()
})

function shoot() {
  Arcane.pad?.vibrate(100)
  Arcane.msg.emit(new MouseButtonHoldEvent('Left'), [])

  if (soundEnabled.value) playSound(shootSound)
}

function stopShoot() {
  Arcane.msg.emit(new MouseButtonReleaseEvent('Left'), [])
}

function reload() {
  if (soundEnabled.value) playSound(reloadSound)
  Arcane.msg.emit(new MouseButtonPressEvent('Right'), [])
}

</script>

<style scoped>
.gunButton {
  display: grid;
  text-align: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, .5);
  border: 1px solid rgba(255, 255, 255, .5);
}
</style>
