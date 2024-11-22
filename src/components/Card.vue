<template>
  <div class="card" :style="{
    cursor: isClickable ? `pointer` : `not-allowed`
  }"></div>
</template>

<script>
import { defineProps } from "vue";

defineProps({
  isClickable: Boolean
})
</script>

<style scoped>
.card {
  /* 3.5 x 2.5 card ratio */
  height: 300px;
  width: 214px;
  border-radius: 10px;
  /* TODO: Background content/image instead */
  background-color: lightslategray;
}
</style>