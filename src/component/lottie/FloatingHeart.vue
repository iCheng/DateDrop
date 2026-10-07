<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import lottie from 'lottie-web'
import animationData from '../../assets/Heart.json'

const container = ref<HTMLElement | null>(null)

let animation: ReturnType<typeof lottie.loadAnimation> | null = null

onMounted(() => {
  if (!container.value) return

  animation = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData,
  })
})

onBeforeUnmount(() => {
  animation?.destroy()
})
</script>

<template>
  <div ref="container" class="heart-animation" />
</template>

<style scoped>
.heart-animation {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
}
</style>