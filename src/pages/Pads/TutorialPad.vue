<template>
  <GunPad :soundEnabled="true" :vibrationEnabled="true" :weapon-enabled="false" :gun-buttons="gunButtons" />
</template>

<script setup lang="ts">
import GunPad from 'src/components/GunPad/GunPad.vue';
import { GunButtons } from 'src/models/models';

const gunButtons: GunButtons = {}

</script>
