import http from '../http-common';

class ChatService {
  getChatRoomMessages(roomId) {
    return http.get(`/chat/all?roomId=${roomId}`)
      .then(response => {
        return response.data.map(msg => {
          try {
            msg.fromUser = JSON.parse(msg.fromUser)
          }
          catch(err) {
            console.error("[Y]",err.message);
          }
          return msg;
        })
      })
      .catch((err) => {
        console.error("[Y]", err.message);
        return Promise.reject(err);
      })
  }
}
export default new ChatService();