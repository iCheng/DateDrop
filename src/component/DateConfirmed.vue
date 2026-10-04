<script setup lang="ts">
import { ref } from "vue";
import { getInvitationData } from "../store/invitation";
import { meetingOptions } from "../constants/meeting";
import { createElementImage, downloadImage } from "../utils/saveImage";

defineProps<{
  guestName: string;
}>();

const { selectedTimes, selectedMeetings, selectedFoods } = getInvitationData();
const meetingLabels = meetingOptions.reduce<Record<string, string>>(
  (labels, option) => {
    labels[option.id] = option.label;
    return labels;
  },
  {},
);
const finalCardRef = ref<HTMLElement | null>(null);
const previewImage = ref("");
const isSaving = ref(false);

async function saveDateImage() {
  if (!finalCardRef.value || isSaving.value) return;

  isSaving.value = true;

  try {
    const dataUrl = await createElementImage(finalCardRef.value, {
      fileName: "约会成立.png",
    });
    previewImage.value = dataUrl;
    downloadImage(dataUrl, "约会成立.png");
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <main class="page-shell final-page">
    <section
      ref="finalCardRef"
      class="final-card"
      aria-labelledby="final-title"
    >
      <div class="final-heart" aria-hidden="true">♥</div>
      <p class="page-kicker">IT'S A DATE!</p>
      <h1 id="final-title">太好啦，约会成立！</h1>
      <p v-if="guestName" class="final-name">期待和 {{ guestName }} 见面 ♡</p>
      <p v-else class="final-name">期待和你见面 ♡</p>

      <div class="chosen-times">
        <p>你选择的时间：</p>
        <ul>
          <li v-for="time in selectedTimes" :key="time">{{ time }}</li>
        </ul>
      </div>
      <div class="chosen-meetings">
        <p>想这样见面：</p>
        <ul>
          <li v-for="meeting in selectedMeetings" :key="meeting">
            {{ meetingLabels[meeting] ?? meeting }}
          </li>
        </ul>
      </div>
      <div v-if="selectedFoods.length" class="chosen-foods">
        <p>想吃这些：</p>
        <ul>
          <li v-for="food in selectedFoods" :key="food">{{ food }}</li>
        </ul>
      </div>
      <p class="final-note">我会认真安排好我们的小约会！</p>
    </section>

    <section class="save-panel" aria-label="保存约会图片">
      <p>保存图片发给我，我就开始安排啦 ♡</p>
      <button
        class="comic-button save-button"
        type="button"
        :disabled="isSaving"
        @click="saveDateImage"
      >
        {{ isSaving ? "生成中..." : "保存图片" }}
      </button>
    </section>

    <div
      v-if="previewImage"
      class="image-preview"
      role="dialog"
      aria-modal="true"
      aria-label="保存图片预览"
    >
      <div class="preview-card">
        <button
          class="preview-close"
          type="button"
          aria-label="关闭预览"
          @click="previewImage = ''"
        >
          ×
        </button>
        <p>长按图片保存到相册，然后发给我 ♡</p>
        <img :src="previewImage" alt="约会成立图片预览" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.final-page {
  display: grid;
  align-items: center;
  gap: 18px;
}

.final-card {
  position: relative;
  width: min(100%, 430px);
  padding: 33px 23px 15px;
  margin: 0 auto;
  overflow: hidden;
  border: 3px solid #111;
  border-radius: 31px;
  background: #fff;
  box-shadow: 8px 8px 0 #111;
  text-align: center;

  .final-heart {
    position: absolute;
    top: -31px;
    left: calc(50% - 31px);
    display: grid;
    width: 62px;
    height: 62px;
    place-items: center;
    border: 3px solid #111;
    border-radius: 50%;
    background: #e94b9b;
    color: #fff;
    font-size: 29px;
    -webkit-text-stroke: 1px #111;
    transform: rotate(-8deg);
  }
  .page-kicker {
    margin: 13px 0 0;
    color: #e94b9b;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.12em;
  }
  h1 {
    margin: 8px auto 0;
    font-size: clamp(28px, 8.5vw, 34px);
    font-weight: 900;
    letter-spacing: -0.07em;
    line-height: 1.22;
  }
  .final-name {
    margin: 13px 0 15px;
    color: #777;
    font-size: 15px;
    font-weight: 700;
  }
  .chosen-times,
  .chosen-meetings,
  .chosen-foods {
    padding: 10px;
    border: 2px solid #111;
    border-radius: 19px;
    background: #fff1f7;
    text-align: left;
    p {
      margin: 0 0 9px;
      font-size: 14px;
      font-weight: 900;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        padding: 5px 9px;
        border: 2px solid #111;
        border-radius: 999px;
        background: #fff;
        font-size: 13px;
        font-weight: 800;
      }
    }
  }
  .chosen-meetings,
  .chosen-foods {
    margin-top: 12px;
  }
  .final-note {
    margin: 23px 0 0;
    color: #e94b9b;
    font-size: 15px;
    font-weight: 900;
  }
}

.save-panel {
  width: min(100%, 430px);
  margin: 0 auto;
  text-align: center;

  p {
    margin: 0 0 13px;
    color: #777;
    font-size: 14px;
    font-weight: 800;
  }
  .save-button {
    width: 100%;
    &:active {
      transform: translate(6px, 6px);
    }
    &:disabled {
      cursor: wait;
      background: #e8e3e5;
      box-shadow: 3px 3px 0 #111;
      color: #817a7e;
    }
  }
}

.image-preview {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  padding: 22px;
  place-items: center;
  background: rgb(0 0 0 / 72%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  .preview-card {
    position: relative;
    width: min(100%, 390px);
    padding: 15px;
    border-radius: 22px;
    background: #fff;
    box-shadow: 0 18px 44px rgb(0 0 0 / 32%);
    text-align: center;

    p {
      margin: 0 34px 14px;
      color: #e94b9b;
      font-size: 16px;
      font-weight: 900;
    }
    img {
      display: block;
      width: 100%;
      border-radius: 16px;
    }
  }

  .preview-close {
    position: absolute;
    top: 10px;
    right: 10px;
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 2px solid #111;
    border-radius: 50%;
    background: #fff;
    box-shadow: 3px 3px 0 #111;
    color: #111;
    cursor: pointer;
    font-size: 22px;
    font-weight: 900;
    line-height: 1;
  }
}
</style>
