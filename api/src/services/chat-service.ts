import 'colors';
import ChatRepository from "../repository/chat-repository";
const chatRepo = new ChatRepository();

class ChatService {
    async createOrAccessChat(loggedInUserId:number|undefined,userId:number) {
        try {
            const chat = await chatRepo.createOrAccessChat(loggedInUserId,userId);
            return chat;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async fetchChats(userId:number|undefined){
        try {
            const results = await chatRepo.fetchChats(userId);
            return results;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default ChatService;