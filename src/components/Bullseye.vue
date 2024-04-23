<template>
  <svg id="bullseyeCont" viewBox="0 0 100 100">
    <g>
      <circle id="outerCircle" cx="50" cy="50" r="40" fill="red" @click="animateScore()" />
      <circle cx="50" cy="50" r="30" fill="white" />
      <circle cx="50" cy="50" r="20" fill="red" />
      <circle cx="50" cy="50" r="10" fill="white" />
      <text x="50" y="50" class="center-text" style="user-select: none; pointer-events: none;">{{ text }}</text>
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


defineProps<{ text: string }>()
function animateScore() {
  // Assuming there's an SVG element with the ID 'bullseyeCont' in the DOM
  const svg = document.getElementById('bullseyeCont');

  if (!svg) {
    console.error('SVG container with ID "bullseyeCont" not found.');
    return;
  }

  // Create the text element
  const svgNS = "http://www.w3.org/2000/svg";
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "50");
  text.style.userSelect = 'none'
  text.style.pointerEvents = 'none'
  text.setAttribute("y", "50");
  text.setAttribute("fill", "black");
  text.setAttribute("font-size", "20");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.textContent = "+1";

  // Append text to SVG
  svg.appendChild(text);

  // Animation variables
  let yPos = 50;
  let opacity = 1;

  // Animation interval
  const interval = setInterval(() => {
    yPos -= 0.5; // Move the text up more gradually
    opacity -= 0.02; // Reduce the opacity more gradually
    text.setAttribute("y", yPos.toString());
    text.style.opacity = opacity.toString();

    if (opacity <= 0) {
      clearInterval(interval); // Stop the animation
      text.remove(); // Remove the text from the SVG after animation
    }
  }, 20); // Animation step occurs every 20 milliseconds
}


</script>

<style scoped>
svg {
  display: block;
  margin: auto;
  /* background-color: #f0f0f0; */
  /* width: 50%; */
  /* Responsive SVG width */
  /* height: auto; */
  /* Maintain aspect ratio */
}

.center-text {
  font-size: 20px;
  stroke: black;
  fill: black;
  dominant-baseline: middle;
  text-anchor: middle;
}


#outerCircle {
  pointer-events: inherit !important;
}

#outerCircle:hover {
  stroke: yellow;
}

circle {
  pointer-events: none;
}
</style>
