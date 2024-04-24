<template>
  <div style="text-align: center; display: grid; grid-template-rows: 20% auto 10%; height: 100vh; padding: 4%;">
    <div style="align-items: center; display: grid;">
      <div style="font-size: 5rem;">
        {{ selectedApp.title }}
      </div>
    </div>
    <div
      style="align-items: center; display: grid; font-size: 2rem; text-align: left; display: grid; grid-template-columns: 47% 47%; gap: 6%;">
      {{ selectedApp.description }}
      <video v-if="selectedApp.video"
        style="margin: 1em auto; border-radius: 10px; box-shadow: 0 0 10px black; height: 30vh;" autoplay loop
        volume=".3">
        <source :src="'/assets/videos/' + selectedApp.video" />
      </video>
    </div>
    <div style="align-items: center; display: grid;">
      <div style="font-size: 2rem;" class="tiltAnim">Press start on your phone</div>
    </div>
    <!-- <div style="font-size: 5rem;">
      {{ selectedApp.title }}
    </div>
    <div class="text-left" style="display: grid; grid-template-columns: 45% 45%; gap: 5%; align-items: center;">
      {{ selectedApp.description }}
      <video style="margin: 1em auto; border-radius: 10px; box-shadow: 0 0 10px black; height: 40%;" autoplay muted
        loop>
        <source src="/src/assets/videos/test.mp4" />
      </video>
    </div>
    <div class="">Press start on your phone</div> -->
  </div>
</template>

<script setup lang="ts">
import { SharedState, sharedState } from 'src/stores/SharedState';
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent, IframePadDisconnectEvent } from 'arcanepad-web-sdk';
import Player from 'src/components/Player.vue';
import { MouseButtonHoldEvent, MouseButtonPressEvent, SelectAppEvent, UpdateSharedStateEvent } from 'src/models/models';
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import reloadSound2 from '/assets/sounds/shotgun/shotgun_reload_2.wav'
import { playSound, updateSharedState } from 'src/utils';
import { LightgunApp } from 'src/stores/AppsStore';

const router = useRouter()
const selectedApp: Ref<LightgunApp> = ref(sharedState.value.selectedApp)

onMounted(() => {

  Arcane.msg.on('SelectApp', ({ app }: SelectAppEvent) => {
    setTimeout(() => playSound(reloadSound2), 200);

    if (app.name !== selectedApp.value.name) selectApp(app)
    else enterApp(app)

  })
})

onUnmounted(() => {
  Arcane.msg.off('SelectApp')
})

function selectApp(app: LightgunApp) {

  selectedApp.value = app

}

function enterApp(app: LightgunApp) {
  router.push({ name: app.name + 'View' })
  sharedState.value.selectedApp = app
  sharedState.value.inApp = true
  updateSharedState()
}

</script>
