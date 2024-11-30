<style scoped>
.card {
  border-radius: 10px;
  /* TODO: Background content/image instead */
  background-color: rgb(237, 167, 98);
  border: 2px solid;
  box-shadow: -8px 1px 25px -1px rgba(0, 0, 0, 0.75);

  position: relative;
  bottom: 0px;
  transition: bottom ease-out 300ms;
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
import { CARD_BACK, getCardDimensions } from "../helpers/card";

const { card, onClick, clickedCard, newCardClickAllowed } = defineProps({
  card: Object,
  onClick: Function,
  clickedCard: Object,
  newCardClickAllowed: Boolean,
});

// Clicked and pending closure
const isAnimating = ref(false);
const cardClass = ref(["card"]);

const isClicked = computed(() => clickedCard?.svg === card.svg);
const isClickable = computed(() => {
  return !clickedCard // no card is currently clicked
    && (
      card.day || // card has been clicked before
      newCardClickAllowed // or new cards can be clicked
    );
});

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
    ...getCardDimensions(300, 100),
  }" v-html="card.day ? card.svg : CARD_BACK" @click="handleCardClick">
  </div>
</template>
