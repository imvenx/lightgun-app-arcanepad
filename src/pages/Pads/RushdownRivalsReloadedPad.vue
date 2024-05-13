<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { Key, KeyboardPressKeyEvent, KeyboardReleaseKeyEvent } from 'src/models/KeyboardEvents';
import { EscButton, ExtraButton, GunButtons, MouseButtonHoldEvent, MouseButtonReleaseEvent, ReloadButton } from 'src/models/models';

const gunButtons: GunButtons = {
  reloadButton: new ReloadButton({
    onTouchStart: () => Arcane.msg.emit(new KeyboardPressKeyEvent(Key.Space), []),
    onTouchEnd: () => Arcane.msg.emit(new KeyboardReleaseKeyEvent(Key.Space), [])
  }),
  escButton: new EscButton(),
  extraButton: new ExtraButton({
    onTouchStart: () => Arcane.msg.emit(new MouseButtonHoldEvent('Right'), []),
    onTouchEnd: () => Arcane.msg.emit(new MouseButtonReleaseEvent('Right'), []),
    text: 'Special Attack'
  })
}

</script>
