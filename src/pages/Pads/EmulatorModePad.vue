<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import GunPad from 'src/components/GunPad/GunPad.vue';
import { EscButton, ExtraButton, GunButtons, ReloadButton } from 'src/models/models';

const extraButton = new ExtraButton()
extraButton.text = 'Middle Click'

const reloadButton = new ReloadButton()
reloadButton.text = 'Right Click'

const gunButtons: GunButtons = {
  reloadButton: reloadButton,
  escButton: new EscButton(),
  extraButton: extraButton,
}

</script>
