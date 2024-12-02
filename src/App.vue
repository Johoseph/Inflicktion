<script setup>
import { reactive, ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";
import CompressToggle from "./components/CompressToggle.vue";

const currentClickedCard = ref();
const hasCardClickSettled = ref(false);
const areCardsCompressed = ref(true);

const getStoredCardConfig = () => JSON.parse(localStorage.getItem("cardConfig") || null);
const setStoredCardConfig = (newConfig) => localStorage.setItem("cardConfig", JSON.stringify(newConfig));

// Init
const existingCardConfig = getStoredCardConfig();
if (!existingCardConfig) setStoredCardConfig([...Array(24)].map(() => ({ dayClicked: null })));

const cardConfig = reactive(getStoredCardConfig());

const setCurrentClickedCard = (cardIndex) => {
  const clickedCard = cardConfig[cardIndex];

  // If this card has a svg already, return
  if (clickedCard.isFlipped) {
    currentClickedCard.value = clickedCard;
    return clickedCard;
  }

  // Otherwise set day for dynamic image req.
  const noCardsFlipped = cardConfig.filter((card) => card.isFlipped).length;

  cardConfig[cardIndex].dayClicked = noCardsFlipped + 1;
  setStoredCardConfig(cardConfig);

  const newClickedCard = cardConfig[cardIndex];

  currentClickedCard.value = newClickedCard;
  return newClickedCard;
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

  const currentCardIndex = cardConfig.findIndex((card) => card.dayClicked === currentClickedCard.value.dayClicked);

  currentClickedCard.value.isFlipped = true;
  cardConfig[currentCardIndex].isFlipped = true;
  setStoredCardConfig(cardConfig);
}
</script>

<template>
  <CardWrapper :cardConfig :currentClickedCard :setCurrentClickedCard :setHasCardClickSettled :areCardsCompressed />
  <LightOverlay />
  <CompressToggle @click="areCardsCompressed = !areCardsCompressed" :areCardsCompressed />
  <CardOverlay :currentClickedCard :hasCardClickSettled :clearCurrentClickedCard :updateCardConfig />
</template>
