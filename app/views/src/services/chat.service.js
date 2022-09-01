import http from '../http-common';

class ChatService {
  getChatRoomMessages(roomid) {
    return http.get(`/chat/all?roomid=${roomid}`).then((response)=>{
        return response.data
    }).catch((err)=>{
        console.log(err);
    });
  }
}
export default new ChatService();