import http from '../http-common';

class ChatService {
  getChatRoomMessages(roomId) {
    return http.get(`/chat/all?roomId=${roomId}`).then((response)=>{
        return response.data
    })
    .catch((err) => {
      console.error("[Y]", err.response.data.message);
      return Promise.reject(err);
    })
  }
}
export default new ChatService();