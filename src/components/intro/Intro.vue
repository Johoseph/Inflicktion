<style scoped>
.intro-background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: black;
  opacity: 1;

  transition: 1200ms opacity linear;
}

.intro-background-fade {
  opacity: 0 !important;
}

.intro-overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-image: radial-gradient(circle, #2b2720 5%, rgb(0, 0, 0) 100%);

  animation: 2400ms opacity-in linear;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6em;
}

@keyframes opacity-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Continue from "./Continue.vue";
import Letters from "./Letters.vue";

const INTRO_TIMEOUT_MS = 2400;
const OUTRO_TIMEOUT_MS = 1200;

let timeoutRef;
const isIntroOutroComplete = ref(false);
const showIntro = ref(true);
const backgroundClass = ref("intro-background");

const handleIntroClick = () => {
  if (!isIntroOutroComplete.value) return;

  isIntroOutroComplete.value = false;
  backgroundClass.value += " intro-background-fade";

  timeoutRef = setTimeout(() => {
    showIntro.value = false;
  }, OUTRO_TIMEOUT_MS);
}

onMounted(() => {
  timeoutRef = setTimeout(() => isIntroOutroComplete.value = true, INTRO_TIMEOUT_MS)
});
onUnmounted(() => clearTimeout(timeoutRef));
</script>

<template>
  <div :class="backgroundClass" v-if="showIntro" @click="handleIntroClick">
    <div class="intro-overlay">
      <Letters />
      <Continue :style="{
        visibility: !isIntroOutroComplete ? `hidden` : `unset` // visiblity rather than v-if to retain spacing
      }" />
    </div>
  </div>
</template>