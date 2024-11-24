<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  top: 50px;
}

@keyframes wrapper-slide-right {
  from {
    /* This is half of CARD_DISPLAY_WIDTH */
    transform: translateX(57px);
  }

  to {
    transform: translateX(0px);
  }
}

@keyframes wrapper-slide-left {
  from {
    transform: translateX(-57px);
  }

  to {
    transform: translateX(0px);
  }
}

.card-wrapper-left {
  animation: 300ms wrapper-slide-left ease-out;
}


.card-wrapper-right {
  animation: 300ms wrapper-slide-right ease-out;
}

.overlay {
  background: radial-gradient(circle, transparent 0%, rgb(0, 0, 0) 100%);
  width: 100vw;
  height: 100vh;
  position: absolute;
  pointer-events: none;
}
</style>

<script setup>
import { onBeforeMount, onUnmounted, ref, useTemplateRef } from "vue"

import Card from './components/Card.vue'
import cardConfig from "../card.config.json";

// the first argument must match the ref value in the template
const cardWrapperDiv = useTemplateRef('cardWrapper')
const cardWrapperLeft = ref(0);

const cardsLeftConfig = ref(cardConfig);
const cardsRightConfig = ref([]);

let timeout;

const handleMouseMove = (e) => {
  const horizontalCenter = document.body.clientWidth / 2;
  const mouseCenterDelta = -(horizontalCenter - e.clientX);

  // TODO: '2' here may become a prop depending on 'collapsed' view
  // TODO: Make this nicer
  cardWrapperLeft.value = -(mouseCenterDelta / 2);
}

/**
 * On click, card animates up then removed from the DOM after
 */
const handleCardClickNext = (clickedCardIndex) => {
  // After animation, we are slicing this from the config
  timeout = setTimeout(() => {
    // After animation, split cards on either side into 2 divs to allow slide animation
    const cardsLeft = cardConfig.slice(0, clickedCardIndex);
    const cardsRight = cardConfig.slice(clickedCardIndex + 1);

    cardsLeftConfig.value = cardsLeft;
    cardsRightConfig.value = cardsRight;
    cardWrapperDiv.value.classList.add("card-wrapper-left");
  }, 300);
}

onBeforeMount(() => {
  window.addEventListener("mousemove", handleMouseMove);
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  clearTimeout(timeout);
})
</script>

<template>
  <div class="card-wrapper" ref="cardWrapper" :style="{
    left: `${cardWrapperLeft}px`,
  }">
    <Card v-for="(card, cardIndex) in cardsLeftConfig" :key="card" :card="card"
      :handleClick="() => handleCardClickNext(cardIndex)" />
  </div>
  <div class="card-wrapper card-wrapper-right" v-if="cardsRightConfig.length > 0" :style="{
    left: `${cardWrapperLeft}px`,
  }">
    <Card v-for="(card, cardIndex) in cardsRightConfig" :key="card" :card="card"
      :handleClick="() => handleCardClickNext(cardIndex)" />
  </div>
  <div class="overlay"></div>
</template>
