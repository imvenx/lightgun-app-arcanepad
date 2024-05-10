<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false"
    @release-extra-button="onReleaseExtraButton()" />
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import GunPad from 'src/components/GunPad/GunPad.vue';
import { EscButton, ExtraButton, GunButtons, MouseButtonHoldEvent, MouseButtonPressEvent, MouseButtonReleaseEvent, ReloadButton } from 'src/models/models';

const gunButtons: GunButtons = {
  reloadButton: new ReloadButton({
    action: () => Arcane.msg.emit(new MouseButtonPressEvent('Right'), []),
    text: 'Right Click',
  }),
  escButton: new EscButton(),
  extraButton: new ExtraButton({
    action: () => Arcane.msg.emit(new MouseButtonHoldEvent('Middle'), []),
    text: 'Middle Click'
  })
}

function onReleaseExtraButton() {
  Arcane.msg.emit(new MouseButtonReleaseEvent('Middle'), [])
}

</script>
