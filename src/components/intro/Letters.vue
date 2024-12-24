<style scoped>
.letters-wrapper {
  display: flex;
  gap: 10px;
}

.letter {
  position: relative;
  height: 7em;

  @media screen and (max-width: 500px) {
    height: 2em;
  }
}
</style>

<script setup>
import { onMounted } from "vue";
import { LETTERS } from "./letters.config";

const MAX_PIXEL_VARIATION = 8;

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