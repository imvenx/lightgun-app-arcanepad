<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { PressKeyEvent } from 'src/models/PanzerKaiserTypes';
import { EscButton, ExtraButton, GunButton, GunButtons, ReloadButton } from 'src/models/models';

const gunButtons: GunButtons = {
  escButton: new EscButton({
    action: () => {
      Arcane.msg.emit(new PressKeyEvent('Space'), [])
    },
    text: 'Pause'
  })
}

</script>
