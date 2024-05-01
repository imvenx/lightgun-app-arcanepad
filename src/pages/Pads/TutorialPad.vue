<template>
  <!-- @calibrate-sequence-top-left="onCalibrateSequenceTopLeft()"
    @calibrate-sequence-bottom-right="onCalibrateSequenceBottomRight()"
    @calibrate-sequence-end="onCalibrateSequenceEnd()" -->
  <GunPad :soundEnabled="true" :vibrationEnabled="true" :weapon-enabled="false" :gun-buttons="gunButtons" />
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { EscButton, GunButton, GunButtons, MouseButtonPressEvent } from 'src/models/models';

const gunButtons: GunButtons = {
  // escButton: new EscButton()
}

// function onCalibrateSequenceTopLeft() {

// }

// function onCalibrateSequenceBottomRight() {

// }

// function onCalibrateSequenceEnd() {

// }

</script>

<style scoped></style>
