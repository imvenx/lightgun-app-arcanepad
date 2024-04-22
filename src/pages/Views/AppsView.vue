<template>
  <h1>
    Apps View
  </h1>
  {{ selectedApp }}
</template>

<script setup lang="ts">
import { SharedState, sharedState } from 'src/stores/SharedState';
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent, IframePadDisconnectEvent } from 'arcanepad-web-sdk';
import Player from 'src/components/Player.vue';
import { Apps, MouseButtonHoldEvent, MouseButtonPressEvent, SelectAppEvent, UpdateSharedStateEvent } from 'src/models/models';
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import reloadSound2 from 'assets/sounds/shotgun/shotgun_reload_2.wav'
import { playSound } from 'src/utils';

const router = useRouter()
const selectedApp: Ref<Apps> = ref(sharedState.value.selectedApp)

const updateSharedState = () => {
  Arcane.msg.emitToPads(new UpdateSharedStateEvent(sharedState.value))
}

onMounted(() => {

  Arcane.msg.on('SelectApp', ({ app }: SelectAppEvent) => {
    setTimeout(() => playSound(reloadSound2), 200);

    if (app !== selectedApp.value) selectApp(app)
    else enterApp(app)

  })
})

onUnmounted(() => {
  Arcane.msg.off('SelectApp')
})

function selectApp(app: Apps) {

  selectedApp.value = app



}

function enterApp(app: Apps) {
  router.push({ name: app + 'View' })
  sharedState.value.selectedApp = app
  updateSharedState()
}

</script>
