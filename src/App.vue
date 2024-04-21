<template>
  <router-view v-if="isInitialized" />
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import { ArcaneInitParams } from 'arcanepad-web-sdk/src/models/Models';
import { onMounted, ref, watch } from 'vue';
import { SharedState } from './stores/SharedState';
import { useRouter } from 'vue-router';

const router = useRouter()
const isInitialized = ref(false)

onMounted(async () => {
  Arcane.init(new ArcaneInitParams({ padOrientation: 'Portrait', hideMouse: false }))

  await Arcane.arcaneClientInitialized()
  isInitialized.value = true
})

</script>
