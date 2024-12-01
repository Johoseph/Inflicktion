<style scoped>
.card {
  border-radius: 10px;
  box-shadow: -8px 1px 25px -1px rgba(0, 0, 0, 0.75);

  position: relative;
  bottom: 0px;
  transition: bottom ease-out 300ms, margin-right ease-out 300ms;
}

.card:hover {
  bottom: 100px;
}

.card-clickable {
  cursor: pointer;
}

.card-animating {
  bottom: 800px !important;
}
</style>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { getCardDimensions } from "../helpers/card";
import CARD_BACK from "../assets/card-back.png";

const { card, onClick, clickedCard, newCardClickAllowed } = defineProps({
  card: Object,
  onClick: Function,
  clickedCard: Object,
  newCardClickAllowed: Boolean,
  areCardsCompressed: Boolean,
});

// Clicked and pending closure
const isAnimating = ref(false);
const cardClass = ref(["card"]);

const isClicked = computed(() => clickedCard?.dayClicked === card.dayClicked);
const isClickable = computed(() => {
  return !clickedCard // no card is currently clicked
    && (
      card.isFlipped || // card has been clicked before
      newCardClickAllowed // or new cards can be clicked
    );
});

const src = computed(() => card.isFlipped ? new URL(`../assets/${card.dayClicked}/regular.png`, import.meta.url) : CARD_BACK);

watchEffect(() => {
  cardClass.value = ["card"];

  if (isAnimating.value || isClicked.value)
    cardClass.value.push("card-animating");

  if (isClickable.value)
    cardClass.value.push("card-clickable");
});

const handleCardClick = () => {
  if (!isClickable.value) return;
  onClick();
  isAnimating.value = true;
}
</script>


<template>
  <div :class="cardClass" :style="{
    ...getCardDimensions(300, areCardsCompressed ? 150 : 100),
  }" @click="handleCardClick">
    <img :src="src"></img>
  </div>
</template>
