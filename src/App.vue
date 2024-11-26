<script setup>
import { ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";

const hasCardBeenClicked = ref(false);
const hasCardClickSettled = ref(false);

const setHasCardBeenClicked = (hasBeenClicked) => {
  hasCardBeenClicked.value = hasBeenClicked;
}

const setHasCardClickSettled = (hasSettled) => {
  hasCardClickSettled.value = hasSettled;
}
</script>

<template>
  <CardWrapper :hasCardBeenClicked :setHasCardBeenClicked :setHasCardClickSettled />
  <LightOverlay />
  <CardOverlay :hasCardBeenClicked :hasCardClickSettled :setHasCardBeenClicked :setHasCardClickSettled />
</template>
