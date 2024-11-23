<style scoped>
.card {
  /* 3.5 x 2.5 card ratio */
  height: 300px;
  width: 214px;
  border-radius: 10px;
  /* TODO: Background content/image instead */
  background-color: lightslategray;
  border: 2px solid;
  /* how much a card overlaps */
  margin-right: -100px;
  box-shadow: -8px 1px 25px -1px rgba(0, 0, 0, 0.75);

  position: relative;
  bottom: 0px;
  transition: bottom ease-out 300ms;
}

.card:hover {
  bottom: 100px;
}
</style>

<script setup>
import { defineProps } from "vue";

defineProps({
  isClickable: Boolean,
  card: String, // stringified svg
});
</script>


<template>
  <div class="card" :style="{
    cursor: isClickable ? `pointer` : `default`
  }" v-html="card">
  </div>
</template>
