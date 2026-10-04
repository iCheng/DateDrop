export interface InvitationData {
  selectedTimes: string[]
  selectedMeetings: string[]
  selectedFoods: string[]
}

/** 当前邀请流程的数据对象。 */
export const invitationData: InvitationData = {
  selectedTimes: [],
  selectedMeetings: [],
  selectedFoods: [],
}

/** 读取邀请数据的副本，避免外部直接修改存储对象。 */
export function getInvitationData(): InvitationData {
  return {
    ...invitationData,
    selectedTimes: [...invitationData.selectedTimes],
    selectedMeetings: [...invitationData.selectedMeetings],
    selectedFoods: [...invitationData.selectedFoods],
  }
}

/** 更新邀请数据。 */
export function setInvitationData(data: Partial<InvitationData>): void {
  if (data.selectedTimes) invitationData.selectedTimes = [...data.selectedTimes]
  if (data.selectedMeetings) invitationData.selectedMeetings = [...data.selectedMeetings]
  if (data.selectedFoods) invitationData.selectedFoods = [...data.selectedFoods]
}
