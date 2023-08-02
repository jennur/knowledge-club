import ChatService from "../services/chat.service"

export const chat = {
  namespaced: true,
  state: { 
    messages: [] 
  },
  actions: {
    async getChatRoomMessages({ commit }, roomId) {
      return ChatService.getChatRoomMessages(roomId)
        .then(messages => {
          commit('clearMessages');
          commit('addMessages', messages)
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    async addMessageToState({ commit }, message) {
      commit("addMessage", message)
    }
  },
  mutations: {
    addMessage(state,message) {
      state.messages.push(message);
    },
    addMessages(state,messages) {
      state.messages = state.messages.concat(messages);
    },
    clearMessages(state) {
      state.messages = [];
    }
  }
}
