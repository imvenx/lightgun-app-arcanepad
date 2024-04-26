<template>
  <GunPad :gun-buttons="gunButtons" :soundEnabled="false" :vibrationEnabled="true" :weapon-enabled="false" />
</template>

<script lang="ts" setup>
import GunPad from 'src/components/GunPad/GunPad.vue';
import { EscButton, ExtraButton, GunButton, GunButtons, ReloadButton } from 'src/models/models';

const gunButtons: GunButtons = {
  reloadButton: new ReloadButton(),
  escButton: new EscButton(),
  extraButton: new ExtraButton()
}

</script>
