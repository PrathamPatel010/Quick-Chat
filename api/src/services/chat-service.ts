import 'colors';
import ChatRepository from "../repository/chat-repository";
import {CreateGroupChatDto, RenameGroupChatDto} from "../dto/user-dto";
import {AddOrRemoveGroupFromDto} from "../dto/chat-dto";
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

    async createGroupChat(groupChatData:CreateGroupChatDto,loggedInUser:number|undefined){
        try {
            if (groupChatData.users.length<3){
                throw new Error("Group chat must have atleast 3 users");
            }
            const response = await chatRepo.createGroupChat(groupChatData,loggedInUser);
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async addToGroup(data:AddOrRemoveGroupFromDto){
        try {
            const response = await chatRepo.addToGroup(data.chatId,data.userId);
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async removeFromGroup(data:AddOrRemoveGroupFromDto){
        try {
            const response = await chatRepo.removeFromGroup(data.chatId,data.userId);
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async renameGroupChat(data:RenameGroupChatDto){
        try {
            const response = await chatRepo.renameGroupChat(data.newChatName,data.chatId);
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }


}

export default ChatService;