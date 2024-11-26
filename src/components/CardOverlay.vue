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
  /* TODO: Background content/image instead */
  background-color: rgb(237, 167, 98);
  border: 2px solid;
  box-shadow: -8px 1px 25px -1px rgba(0, 0, 0, 0.75);

  position: relative;
  transition: bottom ease-out 600ms;
  bottom: 800px;
}

.card-loaded {
  bottom: 0px;
}
</style>

<script setup>
import { onUnmounted, ref, watchEffect } from 'vue';
import { getCardDimensions } from '../helpers/card';

const isAnimating = ref(false);
const isLoaded = ref(false);

const { hasCardClickSettled, setHasCardBeenClicked, setHasCardClickSettled } = defineProps({
  hasCardBeenClicked: Boolean,
  hasCardClickSettled: Boolean,
  setHasCardBeenClicked: Function,
  setHasCardClickSettled: Function
})

let timeout;

watchEffect(() => {
  if (hasCardClickSettled) {
    isAnimating.value = true;
    isLoaded.value = true;

    timeout = setTimeout(() => isAnimating.value = false, 1000) // TODO: This timeout will be calced based on whether a flip is req'd
  }
})

const handleClose = () => {
  if (isAnimating.value) return;

  isLoaded.value = false;
  setHasCardBeenClicked(false);
  setHasCardClickSettled(false);
}

onUnmounted(() => clearTimeout(timeout));
</script>

<template>
  <div class="overlay" :class="hasCardBeenClicked ? `overlay-clicked` : `overlay-static`" @click="handleClose">
    <div class="card card-front" :class="isLoaded ? `card-loaded` : ``" :style="{
      ...getCardDimensions(450)
    }">
    </div>
    <!-- <div class="card card-back" :style="{
      ...getCardDimensions(450)
    }" v-if="true"></div> TODO: Back will be conditional once selected -->
  </div>
</template>