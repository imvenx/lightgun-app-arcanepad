<template>
  <!-- <h1>Gamepad</h1>
  <h5> User Name:
    {{ Arcane.pad?.user?.name }}
  </h5>
  <q-btn @click="Arcane.msg.emitToViews(new ArcaneBaseEvent('Jump'))" size="xl" outline>Jump</q-btn>
  <div>
    <q-btn @click="Arcane.pad?.calibratePointer(true)" size="xl" outline>Calibrate Pointer Top Left</q-btn>
    <q-btn @click="Arcane.pad?.calibratePointer(false)" size="xl" outline>Calibrate Pointer Bottom Right</q-btn>
    <q-btn @click="Arcane.pad?.calibrateQuaternion()" size="xl" outline>Calibrate Quaternion</q-btn>
  </div> -->
  <router-view />
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import { UpdateSharedStateEvent } from 'src/models/models';
import { sharedState } from 'src/stores/SharedState';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  Arcane.msg.on('UpdateSharedState', ({ newSharedState }: UpdateSharedStateEvent) => {

    router.push({ name: newSharedState.selectedApp + 'Pad' })

    sharedState.value = newSharedState
  })
})

</script>
