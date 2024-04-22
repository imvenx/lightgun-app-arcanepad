<template>
  <div style="display: grid; width: 100%; height: 100vh; padding: 1em;">
    <div style="width: 100%; height: 100%; padding: 1em;">
      <AppButton @click="selectedApp = 'Tutorial'" appRoute="Tutorial" appName="Tutorial"
        :isSelected="selectedApp === 'Tutorial'" />
      <AppButton @click="selectedApp = 'HouseOfTheBread'" appRoute="HouseOfTheBread" appName="The House Of The Bread"
        :isSelected="selectedApp === 'HouseOfTheBread'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import AppButton from 'src/components/AppButton.vue';
import { AttackedEvent } from 'src/models';
import { Apps, MouseButtonPressEvent, SelectAppEvent } from 'src/models/models';
import { padState } from 'src/stores/PadState';
import { sharedState } from 'src/stores/SharedState';
import { onMounted, onUpdated, ref } from 'vue';

const selectedApp = ref(sharedState.value.selectedApp)

onMounted(() => {
  Arcane.pad?.setScreenOrientationPortrait()
})

</script>
