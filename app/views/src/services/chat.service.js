import http from '../http-common';

class ChatService {
  getChatRoomMessages(roomId) {
    return http.get(`/chat/all?roomId=${roomId}`).then((response)=>{
        return response.data
    }).catch((err)=>{
        console.log(err);
    });
  }
}
export default new ChatService();