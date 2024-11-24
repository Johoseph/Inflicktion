<style scoped>
.card {
  /* 3.5 x 2.5 card ratio */
  height: 300px;
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
</style>

<script setup>
import { defineProps, ref } from "vue";
import { CARD_OVERLAP, CARD_WIDTH } from "../helpers/card";

const { handleClick } = defineProps({
  isClickable: Boolean,
  card: String, // stringified svg
  handleClick: Function,
});

// Clicked and pending closure
const isActive = ref(false);

const handleCardClick = () => {
  handleClick();
  isActive.value = true;
}
</script>


<template>
  <div class="card" :style="{
    width: `${CARD_WIDTH}px`,
    marginRight: `-${CARD_OVERLAP}px`,
    cursor: isClickable ? `pointer` : `default`,
    ...(isActive ? { bottom: `800px !important` } : {})
  }" v-html="card" @click="handleCardClick">
  </div>
</template>
