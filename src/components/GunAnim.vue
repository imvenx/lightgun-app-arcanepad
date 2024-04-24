<template>
  <div id="gunImage">
  </div>

  <div style="position: absolute; background-color: beige; width: 100%; height: 100vh; z-index: -2;">

  </div>

  <div id="bullet"
    style="position: absolute; opacity: 0; border-radius: 50px; right: 0; top: 35%; width: 8%; height: 10%; background-color: orangered;">
  </div>

  <!-- <div>
    <div style="height: 100vh; top: -26%;  user-select: none; background-size: 100%; position: absolute; width: 100%; z-index: -1;
  background-image: url('/assets/images/gun-top.png'); background-repeat: no-repeat;">
    </div>
    <div style="height: 100vh; top: 45%; user-select: none; background-size: 100%; position: absolute; width: 100%; z-index: -1;
  background-image: url('/assets/images/gun-bottom.png'); background-repeat: no-repeat;">
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';


onMounted(() => {
  const gunEl = document.getElementById('gunImage') as HTMLElement
  const bullet = document.getElementById('bullet') as HTMLElement
  window.addEventListener('GunShoot', () => {

    gunEl.animate({ transform: 'translate(-5%)', filter: 'brightness(1.5) blur(10px)' }, 100)
    bullet.animate([{ opacity: '1', filter: 'brightness(1.5) blur(10px)' }, { backgroundColor: 'gray', top: '0', right: '2%', opacity: '1' }], 100)
  })

  window.addEventListener('GunReload', () => {
    gunEl.animate([{ transform: 'translate(-3%)', filter: 'blur(2px)' }, { transform: 'translate(3%)', filter: 'blur(2px)' }], 300)
  })
})

</script>

<style scoped>
#gunImage {
  height: 100vh;
  user-select: none;
  position: absolute;
  width: 100%;
  z-index: -1;
  filter: brightness(1);
  background-image: url('/assets/images/gun.webp');
  background-position: 60% 25%;
  background-size: 130%;
  background-repeat: no-repeat;
}

.gunShootAnim {
  animation: gunShootAnim .1s ease-out;
}

@keyframes gunShootAnim {
  50% {
    transform: translate(-3%);
  }
}

@keyframes bulletFadeAnim {}
</style>
