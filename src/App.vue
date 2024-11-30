<script setup>
import { reactive, ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";
import defaultCardConfig from "./helpers/card.config.json"
import { day } from "./helpers/date";

const currentClickedCard = ref();
const hasCardClickSettled = ref(false);

const getStoredCardConfig = () => JSON.parse(localStorage.getItem("cardConfig") || null);
const setStoredCardConfig = (newConfig) => localStorage.setItem("cardConfig", JSON.stringify(newConfig));

// Init
const existingCardConfig = getStoredCardConfig();
if (!existingCardConfig) setStoredCardConfig(defaultCardConfig);

const cardConfig = reactive(getStoredCardConfig());

const setCurrentClickedCard = (clickedCard) => {
  currentClickedCard.value = clickedCard;
}

const clearCurrentClickedCard = () => {
  currentClickedCard.value = undefined;
  hasCardClickSettled.value = false;
}

const setHasCardClickSettled = (hasSettled) => {
  hasCardClickSettled.value = hasSettled;
}

const updateCardConfig = () => {
  if (!currentClickedCard.value) return;

  const currentCardIndex = cardConfig.findIndex((card) => card.svg === currentClickedCard.value.svg);

  currentClickedCard.value.day = day;
  cardConfig[currentCardIndex].day = day;
  setStoredCardConfig(cardConfig);
}
</script>

<template>
  <CardWrapper :cardConfig :currentClickedCard :setCurrentClickedCard :setHasCardClickSettled />
  <LightOverlay />
  <CardOverlay :currentClickedCard :hasCardClickSettled :clearCurrentClickedCard :updateCardConfig />
</template>
