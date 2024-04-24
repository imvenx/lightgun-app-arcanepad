<template>
  <div @click="selectApp(app)"
    style="user-select: none; height: 5em; position: relative; width: 100%; transition: .5 all; box-sizing: border-box; color: black; border-radius: 20px; border: 1px solid white; background-color: transparent; color: white; margin: 5% 0; padding: 1em; display: grid; grid-template-columns: 76% 20%; gap: 2%; align-items: center;"
    :style="isSelected ? 'color: white; background-color: rgb(200,70,70); border:none' : ''" class="text-h6">

    <div style="position: absolute; box-shadow: inset 0 0 10px black; height: 100%;width: 100%; border-radius: 20px;">
    </div>

    <div style="font-weight: 800;">
      {{ app.title }}
    </div>
    <div style="text-align: center; font-weight: 800;">
      <div v-if="isSelected" style="display: grid;">
        <div>
          START
        </div>
        <q-icon name="play_arrow" size="md" style="margin: auto; " />
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import { EnterAppEvent, SelectAppEvent } from 'src/models/models';
import reloadSound1 from '/assets/sounds/shotgun/shotgun_reload_1.wav'
import { playSound } from 'src/utils';
import { LightgunApp } from 'src/stores/AppsStore';


const props = defineProps<{ app: LightgunApp, isSelected: boolean }>()

function selectApp(app: LightgunApp) {
  Arcane.msg.emitToViews(new SelectAppEvent(app))
  playSound(reloadSound1)
}
</script>
