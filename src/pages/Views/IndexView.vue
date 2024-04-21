<template>

  <!-- <iframe id="game_drop" frameborder="0" allowfullscreen="true" scrolling="no" style="width: 100%; height: 100vh;"
    allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated"
    allowtransparency="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true"
    src="https://html-classic.itch.zone/html/4300572/index.html"></iframe> -->

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

// async function init() {
//   let initialState = await Arcane.arcaneClientInitialized()
//   pads.value = initialState.pads

//   Arcane.msg.on(AEventName.IframePadConnect, (e: IframePadConnectEvent) => {
//     const padExists = pads.value.some(p => p.iframeId === e.iframeId)
//     if (padExists) return

//     const padToAdd = new ArcanePad({ deviceId: e.deviceId, internalId: e.internalId, iframeId: e.iframeId, isConnected: true, user: e.user })
//     pads.value.push(padToAdd)
//   })

//   Arcane.msg.on(AEventName.IframePadDisconnect, (e: IframePadDisconnectEvent) => {
//     const padToRemove = pads.value.find(p => p.iframeId === e.iframeId)
//     if (!padToRemove) return

//     pads.value.splice(pads.value.indexOf(padToRemove), 1)
//   })

//   // Arcane.msg.on(AEventName.PauseApp, (e) => isAppPaused.value = true)
//   // Arcane.msg.on(AEventName.ResumeApp, (e) => isAppPaused.value = false)
// }
</script>

<style scoped></style>
