<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { PressKeyEvent } from 'src/models/PanzerKaiserTypes';
import { EscButton, ExtraButton, GunButtons, MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent, ReloadButton } from 'src/models/models';

const gunButtons: GunButtons = {
  reloadButton: new ReloadButton({
    action: () => {
      Arcane.msg.emit(new PressKeyEvent('Space'), [])
    }
  }),
  escButton: new EscButton(),
  extraButton: new ExtraButton({
    action: () => {
      Arcane.msg.emit(new MouseButtonHoldEvent('Right'), [])
      setTimeout(() => {
        Arcane.msg.emit(new MouseButtonReleaseEvent('Right'), [])
      }, 50);
    },
    text: 'Special Attack'
  })
}

</script>
