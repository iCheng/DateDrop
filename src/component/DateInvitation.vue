<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  guestName: string
}>()

const emit = defineEmits<{
  accepted: []
}>()

const noButtonIsDown = ref(false)
const noButtonTexts = ['不要 / no', '不要阿', '再想想呀', '点不到吧']
const noButtonTextIndex = ref(0)

function toggleNoButton() {
  noButtonIsDown.value = !noButtonIsDown.value
  noButtonTextIndex.value = (noButtonTextIndex.value + 1) % noButtonTexts.length
}
</script>

<template>
  <main class="page-shell">
    <section class="invite-card" aria-labelledby="invite-title">
      <div class="sparkle sparkle-one" aria-hidden="true">✦</div>
      <div class="sparkle sparkle-two" aria-hidden="true">♡</div>

      <div class="illustration-placeholder" role="img" aria-label="约会邀请插画占位符">
        <!-- 收到图片链接后，将此 div 内部替换为：<img src="图片链接" alt="小动物抱着爱心" /> -->
        <span class="placeholder-sticker">♡</span>
      </div>

      <p v-if="guestName" class="greeting">hi {{ guestName }}</p>
      <h1 id="invite-title">有时间和我约会嘛？</h1>
      <div class="emoji-row" aria-label="期待的表情">🥺 <span>🫶</span></div>
      <p class="subtitle">装作不在意，其实很期待</p>

      <div class="button-stage" aria-label="约会邀请选项">
        <button class="comic-button yes-button" type="button" @click="emit('accepted')">愿意 <span>♡</span></button>
        <button class="comic-button no-button" :class="{ 'is-down': noButtonIsDown }" type="button" @pointerdown="toggleNoButton" @click.prevent>
          {{ noButtonTexts[noButtonTextIndex] }}
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.invite-card {
  position: relative;
  width: min(100%, 430px);
  margin: 0 auto;
  text-align: center;

  .illustration-placeholder {
    position: relative;
    display: grid;
    width: min(250px, 78vw);
    aspect-ratio: 1;
    margin: 0 auto;
    overflow: hidden;
    place-content: center;
    border: 3px solid #111;
    border-radius: 30px;
    background: #ffd6e8;
    box-shadow: 7px 7px 0 #111;
    color: #e94b9b;
    transform: rotate(-1.2deg);

    &::before,
    &::after {
      position: absolute;
      content: '';
      border: 3px solid #111;
      border-radius: 50%;
      background: #ffb5d6;
    }

    &::before { width: 29px; height: 29px; top: 25px; left: 34px; }
    &::after { width: 14px; height: 14px; right: 31px; bottom: 32px; }

    .placeholder-sticker { display: block; font: 100px/.75 'Ma Shan Zheng', cursive; color: #fff; -webkit-text-stroke: 3px #111; text-shadow: 4px 4px 0 #e94b9b; }
    p { position: relative; z-index: 1; margin: 21px 0 0; color: #111; font-size: 13px; font-weight: 800; letter-spacing: .06em; line-height: 1.35; }
  }

  .greeting { margin: 39px 0 0; color: #e94b9b; font-size: 26px; font-weight: 900; letter-spacing: .02em; }
  .greeting + h1 { margin-top: 7px; }
  h1 { margin: 39px auto 0; font-size: clamp(28px, 8.5vw, 34px); font-weight: 900; letter-spacing: -.07em; line-height: 1.22; }
  .emoji-row { margin-top: 18px; font-size: 33px; line-height: 1; letter-spacing: .19em; }
  .emoji-row span { display: inline-block; margin-left: 5px; transform: rotate(-7deg); }
  .subtitle { margin: 16px 0 0; color: #969196; font-size: 12px; font-weight: 700; letter-spacing: .025em; }

  .button-stage { position: relative; width: min(100%, 390px); height: 205px; margin: 29px auto 0; }
  .yes-button, .no-button { position: absolute; top: 0; }
  .yes-button { left: 13px; &:active { transform: translate(6px, 6px); } }
  .no-button { right: 6px; min-width: 139px; background: #fff; transition: transform .26s ease-out, box-shadow .12s ease, background .2s ease; &:hover { background: #fff8fb; } &.is-down { transform: translateY(104px); } }

  .sparkle { position: absolute; z-index: -1; color: #ff8bbe; font-family: 'Ma Shan Zheng', cursive; font-size: 29px; -webkit-text-stroke: 1.2px #111; }
  .sparkle-one { top: 88px; left: clamp(2px, 4vw, 20px); transform: rotate(-15deg); }
  .sparkle-two { top: 257px; right: clamp(2px, 4vw, 18px); font-size: 31px; transform: rotate(15deg); }
}

@media (max-width: 360px) {
  .invite-card {
    .button-stage { height: 195px; }
    .no-button { min-width: 125px; }
  }
}
</style>
