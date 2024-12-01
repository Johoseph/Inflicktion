<style scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  transition: background-color linear 500ms;

  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-clicked {
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-static {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
}

.card {
  border-radius: 10px;
  box-shadow: -8px 1px 25px -1px rgba(0, 0, 0, 0.75);

  position: relative;
  transition: bottom ease-out 600ms;
  bottom: 800px;
}

.card-loaded {
  bottom: 0px;
}

.card-rotate-out {
  animation: 1s rotate-card-out ease-in;
}

.card-rotate-in {
  animation: 1s rotate-card-in ease-out;
}

@keyframes rotate-card-out {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(90deg);
  }
}

@keyframes rotate-card-in {
  from {
    transform: rotateY(-90deg);
  }

  to {
    transform: rotateY(0deg);
  }
}
</style>

<script setup>
import { computed, onUnmounted, ref, useTemplateRef, watchEffect } from 'vue';
import { getCardDimensions } from '../helpers/card';
import CARD_BACK from "../assets/card-back.large.png";

const classTimeoutDelayMs = 500;
const classTimeoutMs = 2000;
const slideTimeoutMs = 600;

const isAnimating = ref(false);
const isLoaded = ref(false);
const cardHTML = useTemplateRef("cardHTML");

const { currentClickedCard, hasCardClickSettled, clearCurrentClickedCard, updateCardConfig } = defineProps({
  currentClickedCard: Object,
  hasCardClickSettled: Boolean,
  clearCurrentClickedCard: Function,
  updateCardConfig: Function,
})

let animateTimeout;
let classTimeout;

// Store a local ref of the clicked card for animation purposes
let localClickedCard = computed((prev) => currentClickedCard ? currentClickedCard : prev);

const handleCardSkew = (mouseEvent) => {
  const verticalCenter = document.body.clientHeight / 2;
  const horizontalCenter = document.body.clientWidth / 2;

  const verticalFromCenter = mouseEvent.clientY > verticalCenter
    ? mouseEvent.clientY - verticalCenter
    : -(verticalCenter - mouseEvent.clientY);
  const horizontalFromCenter = mouseEvent.clientX > horizontalCenter
    ? mouseEvent.clientX - horizontalCenter
    : -(horizontalCenter - mouseEvent.clientX);

  const rotateX = (verticalFromCenter / 15).toFixed(2);
  const rotateY = (horizontalFromCenter / 20).toFixed(2);

  cardHTML.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

const handleClose = () => {
  if (isAnimating.value) return;

  isLoaded.value = false;
  cardHTML.value.classList.remove("card-loaded");
  window.removeEventListener("mousemove", handleCardSkew);
  cardHTML.value.style.transform = "";

  clearCurrentClickedCard();
}

watchEffect(() => {
  const cardWillFlip = !currentClickedCard?.day;
  const animationTimeoutMs = slideTimeoutMs + (cardWillFlip ? classTimeoutMs + classTimeoutDelayMs : 0);

  if (hasCardClickSettled) {
    isAnimating.value = true;
    isLoaded.value = true;

    cardHTML.value.classList.add("card-loaded");

    if (cardWillFlip) {
      classTimeout = setTimeout(() => {
        cardHTML.value.classList.add("card-rotate-out");

        // flip to front of card half-way through the timeout
        classTimeout = setTimeout(() => {
          cardHTML.value.classList.remove("card-rotate-out");
          cardHTML.value.classList.add("card-rotate-in");
          updateCardConfig();
        }, classTimeoutMs / 2)
      }, classTimeoutDelayMs)
    }

    animateTimeout = setTimeout(() => {
      isAnimating.value = false;
      cardHTML.value.classList.remove("card-rotate-in");
      window.addEventListener("mousemove", handleCardSkew);
    }, animationTimeoutMs);
  }
})

onUnmounted(() => {
  clearTimeout(animateTimeout);
  clearTimeout(classTimeout);
  window.removeEventListener("mousemove", handleCardSkew);
});
</script>

<template>
  <div class="overlay" :class="currentClickedCard ? `overlay-clicked` : `overlay-static`" @click="handleClose">
    <div ref="cardHTML" class="card" :style="{
      ...getCardDimensions(450)
    }">
      <img :src="!localClickedCard?.day ? CARD_BACK : localClickedCard.svg"></img>
    </div>
  </div>
</template>