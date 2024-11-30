<style scoped>
.toggle-width {
  position: absolute;
  bottom: 30px;
  left: 40px;
  cursor: pointer;
  border-radius: 9999px;
  padding: 10px;
  font-size: 2rem;

  border: none;
  background-color: #21201f;

  transition: background-color 200ms linear;
}

.toggle-width:hover {
  background-color: #252322;
}

.toggle-width>p {
  position: relative;
  margin: 0;
}
</style>

<script setup>
defineProps({
  areCardsCompressed: Boolean
})
</script>

<template>
  <button class="toggle-width">
    <p v-html="areCardsCompressed ? '📖' : '📘'" :style="{
      bottom: areCardsCompressed ? `4px` : `0`,
    }"></p>
  </button>
</template>