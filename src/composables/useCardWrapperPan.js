import Hammer from "hammerjs";
import { computed, onUnmounted } from "vue";

/**
 * Instantiates hammer listeners - call in onMounted
 */
export function useCardWrapperPan(targetDiv) {
  let currentX = 0,
    startX = 0,
    velocity = 0,
    isAnimating = false;

  const absoluteLeftMax = computed(
    () => targetDiv.getBoundingClientRect().width / 2
  );

  // Block scrolls past absolute limit
  const handleNextX = (fromX, toX) => {
    return fromX > 0
      ? Math.min(absoluteLeftMax.value, toX)
      : Math.max(-absoluteLeftMax.value, toX);
  };

  const handlePan = () => {
    if (isAnimating) return;
    isAnimating = true;

    const friction = 0.95; // slow pan down over each step
    const stopThreshold = 0.1;

    const step = () => {
      if (Math.abs(velocity) > stopThreshold) {
        const nextX = currentX + velocity * 10;

        currentX = handleNextX(currentX, nextX);
        velocity *= friction;

        targetDiv.style.left = `${currentX}px`;

        requestAnimationFrame(step);
      } else {
        isAnimating = false;
      }
    };

    step();
  };

  // Touch Behavior using Hammer.js
  const hammer = new Hammer(targetDiv);
  hammer.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });

  hammer.on("panstart", (e) => {
    startX = currentX;
    isAnimating = false;
  });

  hammer.on("panmove", (e) => {
    const nextX = startX + e.deltaX;
    currentX = handleNextX(startX, nextX);
    targetDiv.style.left = `${currentX}px`;
  });

  hammer.on("panend", (e) => {
    velocity = e.velocityX;
    handlePan();
  });

  onUnmounted(() => {
    hammer?.destroy();
  });
}
