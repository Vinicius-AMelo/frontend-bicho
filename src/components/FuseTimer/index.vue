<template>
  <div class="fuse-timer-container">
    <div class="fuse-wrapper">
      <!-- Spark/Fire at the end of the fuse -->
      <div class="spark">
        <div class="fire">🔥</div>
      </div>
      
      <!-- Fuse line that decreases with time -->
      <div class="fuse-line" :style="{ width: `${fusePercentage}%` }"></div>
      
      <!-- Timer text -->
      <div class="timer-text">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  // Total time in seconds
  duration: {
    type: Number,
    default: 30
  },
  // Whether the timer is active
  active: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['timeUp']);

const remainingTime = ref(props.duration);
const timerInterval = ref<number | null>(null);

// Calculate percentage of fuse remaining
const fusePercentage = computed(() => {
  return (remainingTime.value / props.duration) * 100;
});

// Format time as MM:SS
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 30;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Start the timer
const startTimer = () => {
  if (timerInterval.value) return;
  
  timerInterval.value = window.setInterval(() => {
    if (remainingTime.value <= 0) {
      stopTimer();
      emit('timeUp');
    } else {
      remainingTime.value--;
    }
  }, 1000);
};

// Stop the timer
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

// Reset the timer
const resetTimer = () => {
  stopTimer();
  remainingTime.value = props.duration;
};

// Expose methods to parent component
defineExpose({
  startTimer,
  stopTimer,
  resetTimer
});

// Start timer when component is mounted if active
onMounted(() => {
  if (props.active) {
    startTimer();
  }
});

// Clean up on unmount
onUnmounted(() => {
  stopTimer();
});

// Watch for changes in active prop
watch(() => props.active, (newValue) => {
  if (newValue) {
    startTimer();
  } else {
    stopTimer();
  }
});
</script>

<style scoped>
.fuse-timer-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
}

.fuse-wrapper {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  overflow: hidden;
  padding: 0 5px;
}

.fuse-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(to right, #ff4500, #ff8c00);
  border-radius: 15px;
  transition: width 1s linear;
  z-index: 1;
}

.spark {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fire {
  font-size: 20px;
  animation: flicker 0.5s infinite alternate;
}

.timer-text {
  position: relative;
  z-index: 3;
  color: white;
  font-weight: bold;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

@keyframes flicker {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}
</style>
