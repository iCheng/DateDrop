<script setup lang="ts">
import { ref } from 'vue'
import { meetingOptions } from '../constants/meeting'
import { getInvitationData, setInvitationData } from '../store/invitation'

const emit = defineEmits<{
  confirmed: []
}>()

const selectedMeetings = ref(getInvitationData().selectedMeetings)

function toggleMeeting(meetingId: string) {
  selectedMeetings.value = selectedMeetings.value.includes(meetingId)
    ? selectedMeetings.value.filter((item) => item !== meetingId)
    : [...selectedMeetings.value, meetingId]
}

function confirmMeetings() {
  setInvitationData({ selectedMeetings: selectedMeetings.value })
  emit('confirmed')
}
</script>

<template>
  <main class="page-shell meeting-page">
    <section class="meeting-card" aria-labelledby="meeting-title">
      <p class="page-kicker">DATE PLAN ♡</p>
      <h1 id="meeting-title">想怎么见面</h1>
      <p class="meeting-hint">可以多选，和你一起都很开心～</p>

      <div class="meeting-grid" role="group" aria-label="选择约会方式">
        <button
          v-for="meeting in meetingOptions"
          :key="meeting.id"
          class="meeting-option"
          :class="{ selected: selectedMeetings.includes(meeting.id) }"
          type="button"
          :aria-pressed="selectedMeetings.includes(meeting.id)"
          @click="toggleMeeting(meeting.id)"
        >
          <!-- 顶部：左侧图标 + 右侧选择框 -->
          <div class="option-header">
            <span class="option-icon" aria-hidden="true">{{ meeting.icon || '' }}</span>

            <span class="option-box" aria-hidden="true">
              {{ selectedMeetings.includes(meeting.id) ? '✓' : '' }}
            </span>
          </div>

          <!-- 底部文案 -->
          <span class="option-label">
            {{ meeting.label }}
          </span>
        </button>
      </div>

      <button
        class="comic-button confirm-button"
        type="button"
        :disabled="!selectedMeetings.length"
        @click="confirmMeetings"
      >
        就这样见面吧
      </button>
    </section>
  </main>
</template>

<style scoped>
.meeting-page { display: grid; align-items: center; }

.meeting-card {
  position: relative;
  width: min(100%, 430px);
  padding: 33px 23px 29px;
  margin: 0 auto;
  border: 3px solid #111;
  border-radius: 31px;
  background: #fff;
  box-shadow: 8px 8px 0 #111;
  text-align: center;

  .page-kicker {
    margin: 0;
    color: #e94b9b;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: .12em;
  }

  h1 {
    margin: 8px auto 0;
    font-size: clamp(28px, 8.5vw, 34px);
    font-weight: 900;
    letter-spacing: -.07em;
    line-height: 1.22;
  }

  .meeting-hint {
    margin: 12px 0 25px;
    color: #868086;
    font-size: 14px;
    font-weight: 700;
  }

  /* 只调整这里 */
  .meeting-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 10px;
    text-align: left;
  }

  /* 单个约会选项 */
  .meeting-option {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 72px;

    padding: 9px 10px;

    border: 2px solid #111;
    border-radius: 16px;

    background: #fff;
    color: #111;

    cursor: pointer;

    font-size: 14px;
    font-weight: 800;
    line-height: 1.25;

    box-shadow: none;

    transition:
      transform .15s ease,
      background .15s ease,
      box-shadow .15s ease;

    &:hover {
      background: #fff4f9;
    }

    &.selected {
      background: #ffd0e5;
      box-shadow: 3px 3px 0 #111;
      transform: translate(-2px, -2px);

      .option-box {
        background: #e94b9b;
      }
    }

    &:active {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0 #111;
    }
  }

  /* 顶部一行 */
  .option-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 24px;
  }

  /* 左上角图标 */
  .option-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 26px;
    height: 24px;

    font-size: 23px;
    line-height: 1;
  }

  /* 右上角选择框 */
  .option-box {
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 0 0 20px;

    width: 20px;
    height: 20px;

    border: 2px solid #111;
    border-radius: 6px;

    background: #fff;

    font-size: 13px;
    line-height: 1;
  }

  /* 底部文案 */
  .option-label {
    display: block;

    width: 100%;

    color: #111;

    font-size: 14px;
    font-weight: 800;
    line-height: 1.2;

    text-align: left;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .confirm-button {
    position: relative;
    width: 100%;
    margin-top: 27px;

    &:active {
      transform: translate(6px, 6px);
    }

    &:disabled {
      cursor: not-allowed;
      background: #e8e3e5;
      box-shadow: 3px 3px 0 #111;
      color: #817a7e;
    }
  }
}

@media (max-width: 360px) {
  .meeting-card {
    .meeting-option {
      height: 70px;
      padding-inline: 7px;
      font-size: 13px;
    }

    .option-icon {
      font-size: 21px;
    }

    .option-box {
      flex-basis: 18px;
      width: 18px;
      height: 18px;
      margin-right: 0;
    }

    .option-label {
      font-size: 13px;
    }
  }
}
</style>