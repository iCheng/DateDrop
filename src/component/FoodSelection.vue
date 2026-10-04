<script setup lang="ts">
import { ref } from "vue";
import { getInvitationData, setInvitationData } from "../store/invitation";

const emit = defineEmits<{
  confirmed: [];
}>();

const foodOptions = [
  {
    id: "beautiful-food",
    label: "漂亮饭",
    imgIcon: '✨'
  },
  {
    id: "japanese-food",
    label: "日料",
    imgIcon: "🍣",
  },
  {
    id: "korean-food",
    label: "韩式烤肉",
    imgIcon: "🥩",
  },
  {
    id: "cantonese-food",
    label: "粤菜",
    imgIcon: "🥢",
  },
  {
    id: "hotpot",
    label: "火锅",
    imgIcon: "🍲",
  },
  {
    id: "western-food",
    label: "西餐",
    imgIcon: "🍽️",
  },
  {
    id: "thai-food",
    label: "泰国菜",
    imgIcon: "🍛",
  },
  {
    id: "anything",
    label: "都可以～",
    imgIcon: "🍰",
  },
  {
    id: "other",
    label: "其他的～",
    imgIcon: "🧋",
  },
];

const selectedFoods = ref(getInvitationData().selectedFoods);

function toggleFood(food: string) {
  selectedFoods.value = selectedFoods.value.includes(food)
    ? selectedFoods.value.filter((item) => item !== food)
    : [...selectedFoods.value, food];
}

function confirmFoods() {
  setInvitationData({ selectedFoods: selectedFoods.value });
  emit("confirmed");
}
</script>

<template>
  <main class="page-shell food-page">
    <section class="food-card" aria-labelledby="food-title">
      <p class="page-kicker">DATE FOOD ♡</p>
      <h1 id="food-title">我们吃什么</h1>
      <p class="food-hint">可以多选～</p>

      <div class="food-grid" role="group" aria-label="选择想吃的">
        <button
          v-for="fooditem in foodOptions"
          :key="fooditem.label"
          class="food-option"
          :class="{ selected: selectedFoods.includes(fooditem.label) }"
          type="button"
          :aria-pressed="selectedFoods.includes(fooditem.label)"
          @click="toggleFood(fooditem.label)"
        >
          <!-- 暂不需要placeholder了 -->
          <!-- <span class="food-image-placeholder" aria-hidden="true"></span> -->
          <div>{{ fooditem.imgIcon }}</div>
          <span class="food-label">
            <span class="option-box" aria-hidden="true">{{
              selectedFoods.includes(fooditem.label) ? "✓" : ""
            }}</span>
            {{ fooditem.label }}
          </span>
        </button>
      </div>

      <button
        class="comic-button confirm-button"
        type="button"
        :disabled="!selectedFoods.length"
        @click="confirmFoods"
      >
        就吃这个
      </button>
    </section>
  </main>
</template>

<style scoped>
.food-page {
  display: grid;
  align-items: center;
}

.food-card {
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
    letter-spacing: 0.12em;
  }
  h1 {
    margin: 8px auto 0;
    font-size: clamp(28px, 8.5vw, 34px);
    font-weight: 900;
    letter-spacing: -0.07em;
    line-height: 1.22;
  }
  .food-hint {
    margin: 12px 0 25px;
    color: #868086;
    font-size: 14px;
    font-weight: 700;
  }

  .food-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px 9px;
    text-align: center;
  }
  .food-option {
    display: flex;
    min-height: 60px;
    padding: 10px 6px;
    flex-direction: column;
    align-items: center;
    border: 2px solid #111;
    border-radius: 20px;
    background: #fff;
    color: #111;
    cursor: pointer;
    font-size: 13px;
    font-weight: 900;
    line-height: 1.25;
    transition:
      transform 0.15s ease,
      background 0.15s ease,
      box-shadow 0.15s ease;
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
      .food-image-placeholder {
        background: #fff7fb;
      }
    }
  }
  .food-image-placeholder {
    display: block;
    width: 48px;
    height: 48px;
    margin: 3px auto 10px;
    border-radius: 14px;
    background: #fff1f7;
  }
  .food-label {
    display: flex;
    min-height: 38px;
    align-items: center;
    justify-content: center;
  }
  .option-box {
    display: grid;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    place-items: center;
    border: 2px solid #111;
    border-radius: 6px;
    background: #fff;
    font-size: 14px;
    line-height: 1;
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
  .food-card {
    .food-grid {
      gap: 10px 7px;
    }
    .food-option {
      min-height: 112px;
      padding: 8px 4px;
      font-size: 12px;
    }
    .food-image-placeholder {
      width: 42px;
      height: 42px;
    }
    .option-box {
      flex-basis: 18px;
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
  }
}
</style>
