import prismaService from "../config/dbConfig";
import {CreateGroupChatDto} from "../dto/user-dto";


class ChatRepository {
    async createOrAccessChat(loggedInUserId:number|undefined,userId:number){
        try {
            const existingChat = await prismaService.chat.findFirst({
                where:{
                    AND:[
                        {users:{some:{id:loggedInUserId}}},
                        {users: {some:{id:userId}}},
                        {isGroupChat:false}
                    ]
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true
                        }
                    },
                }
            });

            if (existingChat){
                return existingChat;
            }

            const newChat = await prismaService.chat.create({
                data:{
                    chatName:'sender',
                    isGroupChat:false,
                    users:{
                        connect:[
                            {id:loggedInUserId},{id:userId},
                        ]
                    },
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true
                        }
                    },
                }
            });
            return newChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }


    async fetchChats(userId:number|undefined){
        try {
            const chats = await prismaService.chat.findMany({
                where: {
                    users: {
                        some: {
                            id: userId
                        }
                    }
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            pic: true
                        }
                    },
                    latestMessage: {
                        include: {
                            sender:true,
                        }
                    }
                },
                orderBy:{
                    updatedAt:'desc'
                }
            });
            return chats;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    async createGroupChat(data:CreateGroupChatDto,loggedInUserId:number|undefined){
        try {
            const groupChat = await prismaService.chat.create({
                data:{
                    chatName:data.chatName,
                    isGroupChat:true,
                    users:{
                        connect: data.users.map(userId=>({id:userId}))
                    },
                    groupAdminId:loggedInUserId
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true
                        }
                    }
                }
            });
            return groupChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    async addToGroup(chatId:number,userId:number){
        try {
            const updatedChat = await prismaService.chat.update({
                where:{id:chatId},
                data:{
                    users:{
                        connect:{id:userId}
                    }
                },
                include:{
                    users: {
                        select:{
                            username:true,id:true,email:true,pic:true
                        }
                    }
                }
            });
            return updatedChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    async removeFromGroup(chatId:number,userId:number){
        try {
            const updatedChat = await prismaService.chat.update({
                where:{id:chatId},
                data:{
                    users:{
                        disconnect:{id:userId}
                    }
                },
                include:{
                    users: {
                        select:{
                            username:true,id:true,email:true,pic:true
                        }
                    }
                }
            });
            return updatedChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }


    async renameGroupChat(newChatName:string,chatId:number){
        try {
            const updatedChat = await prismaService.chat.update({
                where:{
                    id:chatId
                },
                data:{
                    chatName:newChatName,
                },
                include:{
                    users:{
                        select:{id:true,email:true,username:true,pic:true}
                    }
                }
            });
            return updatedChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

}

export default ChatRepository;
