<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  top: 50px;
}
</style>

<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue"

import Card from './components/Card.vue'
import cardConfig from "../card.config.json";

const cardWrapperLeft = ref(0);

const handleMouseMove = (e) => {
  const horizontalCenter = document.body.clientWidth / 2;
  const mouseCenterDelta = -(horizontalCenter - e.clientX);

  // TODO: '2' here may become a prop depending on 'collapsed' view
  // TODO: Make this nicer
  cardWrapperLeft.value = -(mouseCenterDelta / 2);
}

onBeforeMount(() => {
  window.addEventListener("mousemove", handleMouseMove);
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
})
</script>

<template>
  <div class="card-wrapper" :style="{
    left: `${cardWrapperLeft}px`,
  }">
    <Card v-for="card in cardConfig" :card="card" />
  </div>
</template>
