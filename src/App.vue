<script setup>
import { reactive, ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";
import defaultCardConfig from "./helpers/card.config.json"

const currentClickedCard = ref();
const hasCardClickSettled = ref(false);

const getStoredCardConfig = () => JSON.parse(localStorage.getItem("cardConfig") || null);
const setStoredCardConfig = (newConfig) => localStorage.setItem("cardConfig", JSON.stringify(newConfig));

// Init
const existingCardConfig = getStoredCardConfig();
if (!existingCardConfig) setStoredCardConfig(defaultCardConfig);

const cardConfig = reactive(getStoredCardConfig())

const setCurrentClickedCard = (clickedCard) => {
  currentClickedCard.value = clickedCard;
}

const setHasCardClickSettled = (hasSettled) => {
  hasCardClickSettled.value = hasSettled;
}
</script>

<template>
  <CardWrapper :cardConfig :currentClickedCard :setCurrentClickedCard :setHasCardClickSettled />
  <LightOverlay />
  <CardOverlay :currentClickedCard :hasCardClickSettled :setCurrentClickedCard :setHasCardClickSettled />
</template>
