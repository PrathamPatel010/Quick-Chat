import prismaService from "../config/dbConfig";


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

}

export default ChatRepository;
