import http from '../http-common';

class ChatService {
  getChatRoomMessages() {
    return http.get("/chat/all").then((response)=>{
        return response.data
    }).catch((err)=>{
        console.log(err);
    });
  }
}
export default new ChatService();