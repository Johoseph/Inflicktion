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
import { defineProps, ref, watchEffect } from "vue";
import { getCardDimensions } from "../helpers/card";

const { onClick, isClickable, isClicked } = defineProps({
  isClicked: Boolean,
  isClickable: Boolean,
  card: String, // stringified svg
  onClick: Function,
});

// Clicked and pending closure
const isAnimating = ref(false);

const cardClass = ref(["card"]);

watchEffect(() => {
  cardClass.value = ["card"];

  if (isAnimating.value || isClicked)
    cardClass.value.push("card-animating");

  if (isClickable)
    cardClass.value.push("card-clickable");
});

const handleCardClick = () => {
  if (!isClickable) return;
  onClick();
  isAnimating.value = true;
}
</script>


<template>
  <div :class="cardClass" :style="{
    ...getCardDimensions(300, 100),
  }" v-html="card" @click="handleCardClick">
  </div>
</template>
