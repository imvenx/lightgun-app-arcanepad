<template>



  <!-- <h1>Viewer</h1>
  <div>Is app paused: {{ isAppPaused }}</div>
  <div style="display: grid; grid-template-columns: 50% 50%;">
    <div v-for="pad in pads">
      <Player :pad="pad" />
    </div>
  </div> -->
  <RouterView />
</template>

<script setup lang="ts">
import { AEventName, Arcane, IframePadConnectEvent } from 'arcanepad-web-sdk';
import { sharedState } from 'src/stores/SharedState';
import { updateSharedState } from 'src/utils';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  init()
  Arcane.msg.on('ExitApp', () => {
    exitApp()
  })
})

function exitApp() {
  router.push({ name: 'AppsView' })
  sharedState.value.inApp = false
  updateSharedState()
}

async function init() {
  // let initialState = await Arcane.arcaneClientInitialized()
  // pads.value = initialState.pads

  Arcane.msg.on(AEventName.IframePadConnect, (e: IframePadConnectEvent) => {
    updateSharedState()
    // const padExists = pads.value.some(p => p.iframeId === e.iframeId)
    // if (padExists) return

    // const padToAdd = new ArcanePad({ deviceId: e.deviceId, internalId: e.internalId, iframeId: e.iframeId, isConnected: true, user: e.user })
    // pads.value.push(padToAdd)
  })

  // Arcane.msg.on(AEventName.IframePadDisconnect, (e: IframePadDisconnectEvent) => {
  //   const padToRemove = pads.value.find(p => p.iframeId === e.iframeId)
  //   if (!padToRemove) return

  //   pads.value.splice(pads.value.indexOf(padToRemove), 1)
  // })

  // Arcane.msg.on(AEventName.PauseApp, (e) => isAppPaused.value = true)
  // Arcane.msg.on(AEventName.ResumeApp, (e) => isAppPaused.value = false)
}
</script>

<style scoped></style>
