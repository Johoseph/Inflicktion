<script setup>
import Card from './components/Card.vue'
import cardConfig from "../card.config.json";
</script>

<template>
  <div class="card-wrapper">
    <Card v-for="card in cardConfig" :card="card" />
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}
</style>
