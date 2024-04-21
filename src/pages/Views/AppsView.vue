<template>
  <h1>
    Apps View
  </h1>
  {{ sharedState }}
</template>

<script setup lang="ts">
import { sharedState } from 'src/stores/SharedState';
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent, IframePadDisconnectEvent } from 'arcanepad-web-sdk';
import Player from 'src/components/Player.vue';
import { Apps, MouseButtonHoldEvent, MouseButtonPressEvent, SelectAppEvent, UpdateSharedStateEvent } from 'src/models/models';
import { Ref, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import reloadSound1 from 'assets/sounds/shotgun_reload_1.wav'
import reloadSound2 from 'assets/sounds/shotgun_reload_2.wav'
import { playSound } from 'src/utils';

const router = useRouter()
const pads: Ref<ArcanePad[]> = ref([])
const isAppPaused = ref(false)

const updateSharedState = () => Arcane.msg.emitToPads(new UpdateSharedStateEvent(sharedState.value))

onMounted(() => {
  // init()
  // Arcane.msg.emit(new MouseButtonPressEvent('Left'), [])

  Arcane.msg.on('SelectApp', ({ app }: SelectAppEvent) => {
    setTimeout(() => playSound(reloadSound2), 200);

    if (app === sharedState.value.currentRoute) {
      enterApp(app)
    } else {
      selectApp(app)
    }

  })
})

function selectApp(app: Apps) {

  // router.push({ name: app + 'View' })

  sharedState.value.currentRoute = app
  updateSharedState()

  // if (sharedState.value.currentRoute != app) {
  //   router.push({ name: app })
  // }
}

function enterApp(app: Apps) {
  window.dispatchEvent(new CustomEvent('EnterApp', {}))
}

</script>
