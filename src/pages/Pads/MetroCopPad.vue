<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { Key, KeyboardPressKeyEvent, KeyboardReleaseKeyEvent } from 'src/models/KeyboardEvents';
import { EscButton, GunButtons } from 'src/models/models';

const gunButtons: GunButtons = {
  escButton: new EscButton({
    onTouchStart: () => Arcane.msg.emit(new KeyboardPressKeyEvent(Key.Space), []),
    onTouchEnd: () => Arcane.msg.emit(new KeyboardReleaseKeyEvent(Key.Space), []),
    text: 'Pause'
  })
}

</script>
