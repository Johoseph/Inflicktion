<style scoped>
.letters-wrapper {
  display: flex;
  gap: 5px;
}

.letter {
  position: relative;
  height: 7em;

  animation: 5s noise ease-in-out infinite alternate;

}

/* TODO: Figure out how to dynamically create this for each letter */
@keyframes noise {
  0% {
    transform: translate(0px, 5px);
  }

  50% {
    transform: translate(8px, 2px);
  }

  100% {
    transform: translate(-5px, 6px);
  }
}
</style>

<script setup>
import { onMounted } from "vue";
import { LETTERS } from "./letters.config";

const MAX_PIXEL_VARIATION = 8;

const generateNoise = () => {
  console.log("generating noise")
  return '5s noise ease-in-out infinite alternate;'
}

const randomNoisePx = () => {
  const number = Math.round(Math.random() * MAX_PIXEL_VARIATION);

  // 50/50 negative
  const negative = Math.random() > 0.5 ? "-" : "";

  return `${negative}${number}px`;
}

const noiseKeyframes = LETTERS.map((_, i) => `
  @keyframes noise-${i} {
    0% {
      transform: translate(${randomNoisePx()}, ${randomNoisePx()});
    }

    50% {
      transform: translate(${randomNoisePx()}, ${randomNoisePx()});
    }

    100% {
      transform: translate(${randomNoisePx()}, ${randomNoisePx()});
    }
  }
`);

// On mount, we attach the keyframes we generate to the DOM
onMounted(() => {
  const keyframeStyle = document.createElement("style");
  keyframeStyle.innerHTML = noiseKeyframes.join("\n");

  document.body.prepend(keyframeStyle);
})
</script>

<template>
  <div class="letters-wrapper">
    <div class="letter" v-for="(letterSvg, letterIndex) in LETTERS" v-html="letterSvg" :style="{
      animation: `5s ease-in-out infinite alternate noise-${letterIndex}`
    }"></div>
  </div>
</template>