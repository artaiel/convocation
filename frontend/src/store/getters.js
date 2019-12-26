export default {
  isEventOwner (state) {
    return state.eventData.ownerId === state.eventData.userId
  }
}