<script setup lang="ts">
import { ref } from 'vue'
import DateConfirmed from './component/DateConfirmed.vue'
import DateInvitation from './component/DateInvitation.vue'
import FoodSelection from './component/FoodSelection.vue'
import MeetingSelection from './component/MeetingSelection.vue'
import TimeSelection from './component/TimeSelection.vue'
import { MEETING_FOOD_ID } from './constants/meeting'
import { getInvitationData } from './store/invitation'
import { decodeName, getURLParams } from './utils/url'

type Step = 'invitation' | 'time-selection' | 'meeting-selection' | 'food-selection' | 'confirmed'

const urlParams = getURLParams()
const guestName = decodeName(urlParams.toMyGirl ?? '')
const currentStep = ref<Step>('invitation')

function confirmMeetings() {
  currentStep.value = getInvitationData().selectedMeetings.includes(MEETING_FOOD_ID) ? 'food-selection' : 'confirmed'
}
</script>

<template>
  <DateInvitation v-if="currentStep === 'invitation'" :guest-name="guestName" @accepted="currentStep = 'time-selection'" />
  <TimeSelection v-else-if="currentStep === 'time-selection'" @confirmed="currentStep = 'meeting-selection'" />
  <MeetingSelection v-else-if="currentStep === 'meeting-selection'" @confirmed="confirmMeetings" />
  <FoodSelection v-else-if="currentStep === 'food-selection'" @confirmed="currentStep = 'confirmed'" />
  <DateConfirmed v-else :guest-name="guestName" />
</template>
