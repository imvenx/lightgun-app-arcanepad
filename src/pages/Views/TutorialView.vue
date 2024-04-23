<template>
  <div style="height: 100vh; display: grid; width: 100%; text-align: center; ">
    <div id="stepCont" style="transition: 1s all; margin: auto; padding: 5%;">
      <h3 v-html="currentStep.text"></h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import { EnterAppEvent } from 'src/models/models';
import { onMounted, onUnmounted, ref } from 'vue';

const stepCont = ref<HTMLElement>()

type TutorialStep = {
  text: string
};

const steps = {
  '': { text: '' },
  welcome: { text: 'Welcome to the Light-gun tutorial' },
  calibrate: { text: 'First press the <b style="color:cyan"> Calibrate </b> button on your gun pad to start calibration mode' },
  topLeft: { text: 'Now aim to the <b style="color:cyan"> top-left </b>  corner of your screen and press the shoot button' },
  bottomRight: { text: 'Great, now aim to the <b style="color:cyan"> bottom-right </b> corner of your screen and press the shoot button' },
  enableWeapon: { text: 'Now press <b style="color:cyan"> Enable Weapon </b> to control the mouse' },
  check: { text: 'Check that it follows your aim properly, or try calibrating again' },
};
const currentStep = ref(steps[''])

onMounted(() => {
  changeStep(steps['welcome'])
  setTimeout(() => { changeStep(steps['calibrate']) }, 3000);

  Arcane.msg.on('CalibrateSequenceTopLeft', () => { changeStep(steps['topLeft']) })
  Arcane.msg.on('CalibrateSequenceBottomRight', () => { changeStep(steps['bottomRight']) })
  Arcane.msg.on('CalibrateSequenceEnded', () => { changeStep(steps['enableWeapon']) })
  Arcane.msg.on('WeaponEnabled', () => { changeStep(steps['check']) })
})

function changeStep(newStep: TutorialStep) {
  const stepCont = document.getElementById('stepCont') as HTMLElement
  stepCont.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1000, fill: 'forwards' });
  setTimeout(() => {
    currentStep.value = newStep
    stepCont.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: 'forwards' });
  }, 1000);

}

// onMounted(() => {
//   Arcane.msg.on('EnterApp', ({ app }: EnterAppEvent) => {
//     console.log('Entering Tutorial App')
//   })
// })

// onUnmounted(() => {
//   Arcane.msg.off('EnterApp')
// })
</script>
