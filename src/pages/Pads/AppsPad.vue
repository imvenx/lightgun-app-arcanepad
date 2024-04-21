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

  <div style="display: grid; width: 100%; height: 100vh; padding: 1em;">
    <div style="width: 100%; height: 100%; padding: 1em;">
      <AppButton appRoute="Tutorial" appName="Tutorial" :isSelected="sharedState.currentRoute === 'Tutorial'" />
      <AppButton appRoute="HouseOfTheBread" appName="The House Of The Bread"
        :isSelected="sharedState.currentRoute === 'HouseOfTheBread'" />
      <!-- <q-btn color="blue" size="xl" @click="selectApp('Tutorial')"> Tutorial </q-btn>
      <q-btn color="blue" size="xl" @click="selectApp('HouseOfTheBread')"> House Of The Bread </q-btn> -->
      <!-- <q-btn color="blue" size="xl"> House Of The Dead </q-btn> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import AppButton from 'src/components/AppButton.vue';
import { AttackedEvent } from 'src/models';
import { Apps, MouseButtonPressEvent, SelectAppEvent } from 'src/models/models';
import { sharedState } from 'src/stores/SharedState';
import { onMounted } from 'vue';

onMounted(() => {
  // Arcane.msg.on('Attacked', ({ damage }: AttackedEvent) => { alert('taken damage: ' + damage) })
  // setInterval(() => {
  //   Arcane.msg.emit(new MouseButtonPressEvent('Left'), [])
  // }, 1000)
})



</script>
