<template>

  <div @click="selectApp(appRoute)"
    style="user-select: none; height: 5em; width: 100%; transition: .5 all; box-sizing: border-box; color: black; border-radius: 20px; background-color: gray; margin: 5% 0; padding: 1em; display: grid; grid-template-columns: 76% 20%; gap: 2%; align-items: center;"
    :style="isSelected ? 'color: white; background-color: rgb(0,100,200); box-shadow: 0 0 10px white' : ''"
    class="text-h6">
    <div style="font-weight: 800;">
      {{ appName }}
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

  <!-- <div style="display: grid; margin: 5% 0; height: 5em; grid-template-columns: 80% 20;" @click="selectApp(appRoute)">
    <div style="text-align: center; display: grid; align-items: center;">
      {{ appName }}
    </div>
    <div style="text-align: center; display: grid; align-items: center;">
      <q-icon v-if="isSelected" name="play_arrow" size="lg"></q-icon>
    </div>
  </div> -->
  <!-- <q-btn :color="isSelected ? 'blue' : 'black'" size="xl" @click="selectApp(appRoute)">
    <q-icon v-if="isSelected" color="black" name="play_arrow"
      style=" position: absolute; opacity: .3; height: 100%; width: 100%; font-size: 5em;" size="xl"></q-icon>
    <div>
      {{ appName }}
    </div>
  </q-btn> -->
  <!-- <div style="background-color: darkcyan; display: grid; text-align: center;">
    <div style=" display: grid; place-items: center;">
      {{ appName }}
    </div>
    <div style="">
      <q-btn v-if="isSelected" style="width: 100%; height: 100%;" color="blue">Start</q-btn>
    </div>
  </div> -->
</template>
<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import { Apps, EnterAppEvent, SelectAppEvent } from 'src/models/models';
import reloadSound1 from 'assets/sounds/shotgun_reload_1.wav'
import { playSound } from 'src/utils';


const props = defineProps<{ appRoute: Apps, appName: string, isSelected: boolean }>()

function selectApp(app: Apps) {
  playSound(reloadSound1)
  // if (props.isSelected) Arcane.msg.emitToViews(new EnterAppEvent(app))
  // else
  Arcane.msg.emitToViews(new SelectAppEvent(app))
}
</script>
