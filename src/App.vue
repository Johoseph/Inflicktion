<style scoped>
.overlay {
  background: radial-gradient(circle, transparent 0%, rgb(0, 0, 0) 100%);
  width: 100vw;
  height: 100vh;
  position: absolute;
  pointer-events: none;
}
</style>

<script setup>
import { ref } from "vue"
import CardWrapper from "./components/CardWrapper.vue";

const hasCardBeenClicked = ref(false);
const hasCardClickSettled = ref(false);

</script>

<template>
  <CardWrapper :hasCardBeenClicked />
  <div class="overlay"></div>
</template>
