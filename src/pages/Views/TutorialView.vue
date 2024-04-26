<template>
  <div id="stepCont" style="height: 100vh; display: grid; width: 100%; text-align: center; user-select: none; ">
    <div style="transition: 1s all; margin: auto; padding: 5%;">
      <h3 v-html="currentStep.text"></h3>
    </div>
    <!-- <video style="margin: 1em auto; border-radius: 10px; box-shadow: 0 0 10px black; height: 60%;" autoplay muted loop>
      <source src="/src/assets/videos/test.mp4" />
    </video> -->
    <Bullseye v-if="showFinishBullseye" text="" style="height: 20em;" />
    <q-icon v-if="showArrowTopLeft" class="arrowTiltUp" name="arrow_upward"
      style="position: absolute; top: 0; left: 0em; transform: rotate(-45deg); font-size: 6rem;" color="cyan" />
    <q-icon v-if="showArrowBottomRight" class="arrowTiltDown" name="arrow_downward"
      style="position: absolute; bottom: 0em; right: 0em; transform: rotate(-45deg); font-size: 6rem;" color="cyan" />
  </div>
</template>

<script setup lang="ts">
import { Arcane } from 'arcanepad-web-sdk';
import { onMounted, ref } from 'vue';
import Bullseye from 'src/components/Bullseye.vue';

const stepCont = ref<HTMLElement>()
const showFinishBullseye = ref(false)
const showArrowTopLeft = ref(false)
const showArrowBottomRight = ref(false)

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
  check: { text: `Check that it follows your aim properly, or try calibrating again` },
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
    showFinishBullseye.value = newStep === steps['check']
    showArrowTopLeft.value = newStep === steps['topLeft']
    showArrowBottomRight.value = newStep === steps['bottomRight']
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

<style scoped>
.arrowTiltUp {
  animation: 1s arrowTiltUp infinite;
}

.arrowTiltDown {
  animation: 1s arrowTiltDown infinite;
}

@keyframes arrowTiltUp {
  50% {
    transform: rotate(-45deg) translate(0px, 35px);
  }
}

@keyframes arrowTiltDown {
  50% {
    transform: rotate(-45deg) translate(0px, -35px);
  }
}
</style>
