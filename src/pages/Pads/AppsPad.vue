<template>
  <div style="display: grid; width: 100%; height: 100vh; padding: 1em;">
    <div style="width: 100%; height: 100%; padding: 1em;">
      <AppButton v-for="app in apps" @click="selectedApp = app" :app="app" :isSelected="selectedApp.name === app.name"
        :key="app.name" />
      <!-- <AppButton @click="selectedApp = 'HouseOfTheBread'" appRoute="HouseOfTheBread"
        :appName="appName['HouseOfTheBread']" :isSelected="selectedApp === 'HouseOfTheBread'" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import AppButton from 'src/components/AppButton.vue';
import { AttackedEvent } from 'src/models';
import { MouseButtonPressEvent, SelectAppEvent } from 'src/models/models';
import { apps } from 'src/stores/AppsStore';
import { padState } from 'src/stores/PadState';
import { sharedState } from 'src/stores/SharedState';
import { onMounted, onUpdated, ref } from 'vue';

const selectedApp = ref(sharedState.value.selectedApp)

onMounted(() => {
  Arcane.pad?.setScreenOrientationPortrait()
})

</script>
