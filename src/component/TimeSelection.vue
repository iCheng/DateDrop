<script setup lang="ts">
import { ref } from 'vue'
import { getInvitationData, setInvitationData } from '../store/invitation'

const emit = defineEmits<{
  confirmed: []
}>()

const timeOptions = ['今天晚上', '明天', '后天', '这个周末', '下个周末', '你来定～', '明天给你答复']
const selectedTimes = ref(getInvitationData().selectedTimes)

function toggleTime(time: string) {
  selectedTimes.value = selectedTimes.value.includes(time)
    ? selectedTimes.value.filter((item) => item !== time)
    : [...selectedTimes.value, time]
}

function confirmTimes() {
  setInvitationData({ selectedTimes: selectedTimes.value })
  emit('confirmed')
}
</script>

<template>
  <main class="page-shell selection-page">
    <section class="selection-card" aria-labelledby="time-title">
      <p class="page-kicker">DATE TIME ♡</p>
      <h1 id="time-title">什么时间呢</h1>
      <p class="selection-hint">把你方便的时间都告诉我吧～可以多选</p>

      <div class="time-grid" role="group" aria-label="选择约会时间">
        <button
          v-for="time in timeOptions"
          :key="time"
          class="time-option"
          :class="{ selected: selectedTimes.includes(time) }"
          type="button"
          :aria-pressed="selectedTimes.includes(time)"
          @click="toggleTime(time)"
        >
          <span class="option-box" aria-hidden="true">{{ selectedTimes.includes(time) ? '✓' : '' }}</span>
          {{ time }}
        </button>
      </div>

      <button class="comic-button confirm-button" type="button" :disabled="!selectedTimes.length" @click="confirmTimes">
        选好了 <span>→</span>
      </button>
    </section>
  </main>
</template>

<style scoped>
.selection-page { display: grid; align-items: center; }

.selection-card {
  position: relative;
  width: min(100%, 430px);
  padding: 33px 23px 29px;
  margin: 0 auto;
  border: 3px solid #111;
  border-radius: 31px;
  background: #fff;
  box-shadow: 8px 8px 0 #111;
  text-align: center;

  .page-kicker { margin: 0; color: #e94b9b; font-size: 13px; font-weight: 900; letter-spacing: .12em; }
  h1 { margin: 8px auto 0; font-size: clamp(28px, 8.5vw, 34px); font-weight: 900; letter-spacing: -.07em; line-height: 1.22; }
  .selection-hint { margin: 12px 0 25px; color: #868086; font-size: 14px; font-weight: 700; }

  .time-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 10px; text-align: left; }
  .time-option { display: flex; align-items: center; min-height: 54px; padding: 9px 10px; border: 2px solid #111; border-radius: 17px; background: #fff; color: #111; cursor: pointer; font-size: 14px; font-weight: 800; line-height: 1.25; transition: transform .15s ease, background .15s ease, box-shadow .15s ease; &:hover { background: #fff4f9; } &.selected { background: #ffd0e5; box-shadow: 3px 3px 0 #111; transform: translate(-2px, -2px); .option-box { background: #e94b9b; } } }
  .option-box { display: grid; flex: 0 0 20px; width: 20px; height: 20px; margin-right: 8px; place-items: center; border: 2px solid #111; border-radius: 6px; background: #fff; font-size: 14px; line-height: 1; }
  .confirm-button { position: relative; width: 100%; margin-top: 27px; &:active { transform: translate(6px, 6px); } &:disabled { cursor: not-allowed; background: #e8e3e5; box-shadow: 3px 3px 0 #111; color: #817a7e; } }
}

@media (max-width: 360px) {
  .selection-card {
    .time-option { padding-inline: 7px; font-size: 13px; }
    .option-box { flex-basis: 18px; width: 18px; height: 18px; margin-right: 6px; }
  }
}
</style>
