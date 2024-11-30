<script setup>
import { computed, reactive, ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";
import CardOverlay from "./components/CardOverlay.vue";
import LightOverlay from "./components/LightOverlay.vue";
import cards from "./helpers/card.config.json"
import { day } from "./helpers/date";
import CompressToggle from "./components/CompressToggle.vue";

const currentClickedCard = ref();
const hasCardClickSettled = ref(false);
const areCardsCompressed = ref(true);

const getStoredCardConfig = () => JSON.parse(localStorage.getItem("cardConfig") || null);
const setStoredCardConfig = (newConfig) => localStorage.setItem("cardConfig", JSON.stringify(newConfig));

// Init
const existingCardConfig = getStoredCardConfig();
if (!existingCardConfig) setStoredCardConfig([...Array(24)].map(() => ({ svg: null })));

const cardConfig = reactive(getStoredCardConfig());
const svgCardCount = computed(() => cardConfig.filter((card) => card.svg).length);

const setCurrentClickedCard = (cardIndex) => {
  const clickedCard = cardConfig[cardIndex];

  // If this card has a svg already, return
  if (clickedCard.svg) {
    currentClickedCard.value = clickedCard;
    return clickedCard;
  }

  // Otherwise pull next available svg, set to card and return
  const nextSvg = cards[svgCardCount.value];

  cardConfig[cardIndex].svg = nextSvg;
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

  const currentCardIndex = cardConfig.findIndex((card) => card.svg === currentClickedCard.value.svg);

  currentClickedCard.value.day = day;
  cardConfig[currentCardIndex].day = day;
  setStoredCardConfig(cardConfig);
}
</script>

<template>
  <CardWrapper :cardConfig :currentClickedCard :setCurrentClickedCard :setHasCardClickSettled :areCardsCompressed />
  <LightOverlay />
  <CompressToggle @click="areCardsCompressed = !areCardsCompressed" :areCardsCompressed />
  <CardOverlay :currentClickedCard :hasCardClickSettled :clearCurrentClickedCard :updateCardConfig />
</template>
