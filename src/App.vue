<script setup>
import { reactive, ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";
import defaultCardConfig from "./helpers/card.config.json"

const hasCardBeenClicked = ref(false);
const hasCardClickSettled = ref(false);

const getStoredCardConfig = () => JSON.parse(localStorage.getItem("cardConfig") || null);
const setStoredCardConfig = (newConfig) => localStorage.setItem("cardConfig", JSON.stringify(newConfig));

// Init
const existingCardConfig = getStoredCardConfig();
if (!existingCardConfig) setStoredCardConfig(defaultCardConfig);

const cardConfig = reactive(getStoredCardConfig())

const setHasCardBeenClicked = (hasBeenClicked) => {
  hasCardBeenClicked.value = hasBeenClicked;
}

const setHasCardClickSettled = (hasSettled) => {
  hasCardClickSettled.value = hasSettled;
}
</script>

<template>
  <CardWrapper :cardConfig :hasCardBeenClicked :setHasCardBeenClicked :setHasCardClickSettled />
  <LightOverlay />
  <CardOverlay :hasCardBeenClicked :hasCardClickSettled :setHasCardBeenClicked :setHasCardClickSettled />
</template>
