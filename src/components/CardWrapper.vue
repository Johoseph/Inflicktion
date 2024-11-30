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

.slide-wrapper-left {
  animation: 300ms wrapper-slide-left ease-out;
}


.slide-wrapper-right {
  animation: 300ms wrapper-slide-right ease-out;
}
</style>

<script setup>
import { computed, onBeforeMount, onUnmounted, ref, useTemplateRef, watchEffect } from "vue"
import Card from "./Card.vue"
import { noOfClickableCards } from "../helpers/date"

const { cardConfig, currentClickedCard, setCurrentClickedCard, setHasCardClickSettled } = defineProps({
  cardConfig: Object,
  currentClickedCard: Object,
  setCurrentClickedCard: Function,
  setHasCardClickSettled: Function,
  areCardsCompressed: Boolean
})

// Refs for CardWrapper styling
const cardWrapperLeftHTML = useTemplateRef('cardWrapperLeftHTML')
const cardWrapperRightHTML = useTemplateRef('cardWrapperRightHTML')
const cardWrapperPositionLeft = ref(0);

// Refs for CardWrapper content
const cardsLeftConfig = ref(cardConfig);
const cardsRightConfig = ref([]);
const wrapperClickedCard = ref(currentClickedCard);
// Number of cards clickable raw by days, subtract how many cards we have already clicked
const newCardClickAllowed = computed(() => (noOfClickableCards - cardConfig.filter((card) => card.day).length) > 0);

let timeout;

/**
 * On click, card animates up then removed from the DOM after
 */
const handleCardClick = (clickedCardIndex) => {
  const card = setCurrentClickedCard(clickedCardIndex);
  wrapperClickedCard.value = card;

  // After animation, we are slicing this from the config
  timeout = setTimeout(() => {
    setHasCardClickSettled(true);

    // After animation, split cards on either side into 2 divs to allow slide animation
    const cardsLeft = cardConfig.slice(0, clickedCardIndex);
    const cardsRight = cardConfig.slice(clickedCardIndex + 1);

    cardsLeftConfig.value = cardsLeft;
    cardsRightConfig.value = cardsRight;
    cardWrapperLeftHTML.value.classList.add("slide-wrapper-left");
  }, 300);
}

const handleMouseMove = (mouseEvent) => {
  const horizontalCenter = document.body.clientWidth / 2;
  const mouseCenterDelta = -(horizontalCenter - mouseEvent.clientX);

  // TODO: '2' here may become a prop depending on 'collapsed' view
  cardWrapperPositionLeft.value = -(mouseCenterDelta / 2);
}

watchEffect(() => {
  if (wrapperClickedCard.value && !currentClickedCard) {
    // Reverse classes to animate backwards
    cardWrapperLeftHTML.value.classList.remove("slide-wrapper-left");
    cardWrapperLeftHTML.value.classList.add("slide-wrapper-right");

    cardWrapperRightHTML.value.classList.remove("slide-wrapper-right");
    cardWrapperRightHTML.value.classList.add("slide-wrapper-left");

    // Pust current clicked card back into config
    cardsLeftConfig.value.push(
      cardConfig.find((card) => card.svg === wrapperClickedCard.value.svg)
    );

    // On delay, reset config to base for next click
    setTimeout(() => {
      cardsLeftConfig.value = cardConfig;
      cardsRightConfig.value = [];
      wrapperClickedCard.value = undefined;

      cardWrapperLeftHTML.value.classList.remove("slide-wrapper-right");
    }, 600)
  }
})

onBeforeMount(() => {
  window.addEventListener("mousemove", handleMouseMove);
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  clearTimeout(timeout);
})
</script>

<template>
  <div class="card-wrapper" ref="cardWrapperLeftHTML" :style="{
    left: `${cardWrapperPositionLeft}px`,
  }">
    <Card v-for="(card, cardIndex) in cardsLeftConfig" :key="card" :card="card"
      :onClick="() => handleCardClick(cardIndex)" :areCardsCompressed :clickedCard="wrapperClickedCard"
      :newCardClickAllowed="newCardClickAllowed" />
  </div>
  <div class="card-wrapper slide-wrapper-right" ref="cardWrapperRightHTML" v-if="cardsRightConfig.length > 0" :style="{
    left: `${cardWrapperPositionLeft}px`,
  }">
    <Card v-for="(card, cardIndex) in cardsRightConfig" :key="card" :card="card"
      :onClick="() => handleCardClick(cardIndex)" :areCardsCompressed :clickedCard="wrapperClickedCard" />
  </div>
</template>