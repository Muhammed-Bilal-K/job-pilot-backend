import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import MessageRepository from "../repositories/message.respository";
import ConversationModel from "../frameworks/models/conversation.modal";

interface User {
  userId: string;
  socketId: string;
}

class SocketIORepository {
  private io: Server;
  private users: User[] = [];
  private httpServer: HttpServer;
  private messageRepository: MessageRepository;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:5173",
      },
    });
    this.users;
    this.messageRepository = new MessageRepository();
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    const emailToSocketIdMap = new Map();
    const socketidToEmailMap = new Map();

    this.io.on("connection", (socket: Socket) => {
      console.log("A user connected", socket.id);

      socket.on("room:join", (data: any) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        this.io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        this.io.to(socket.id).emit("room:join", data);
      });

      socket.on("user:call", ({ to, offer }) => {
        this.io.to(to).emit("incomming:call", { from: socket.id, offer });
      });

      socket.on("call:accepted", ({ to, ans }) => {
        this.io.to(to).emit("call:accepted", { from: socket.id, ans });
      });

      socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        this.io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      });

      socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        this.io.to(to).emit("peer:nego:final", { from: socket.id, ans });
      });

      socket.on("addUser", (Id: string) => {
        this.addUser(Id, socket.id);
        console.log(this.users);
        this.io.emit("getUsers", this.users);
      });

      socket.on(
        "sendMessage",
        async ({
          senderId,
          receiverId,
          text,
        }: {
          senderId: string;
          receiverId: string;
          text: string;
        }) => {
          console.log(senderId);
          console.log(receiverId);
          console.log(text);
          
          const user = this.getUser(receiverId);
          if (user) {
            console.log(user, "from sendmessage");
            this.io.to(user.socketId).emit("getMessage", {
              senderId,
              text,
            });
            try {
              await ConversationModel.findOneAndUpdate(
                {
                  members: { $all: [senderId, receiverId] }
                },
                { latestMessage: text },
                { new: true }
              );
            
            } catch (error) {
              console.log(error);
            }
          } else {
            await ConversationModel.findOneAndUpdate(
              {
                members: { $all: [senderId, receiverId] }
              },
              { latestMessage: text },
              { new: true }
            );
            console.log("no user");
          }
        }
      );

      socket.on("disconnect", () => {
        console.log("A user disconnected");
        this.removeUser(socket.id);
        this.io.emit("getUsers", this.users);
      });
    });
  }

  private addUser(userId: string, socketId: string): void {
    const existingUserIndex = this.users.findIndex(user => user.userId === userId)
    if (existingUserIndex !== -1) {
      const existingUser = this.users[existingUserIndex]
      existingUser.socketId = socketId
    } else {
      this.users.push({userId, socketId});
    }

  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): User | undefined {
    return this.users.find((user) => user.userId === userId);
  }
}

export default SocketIORepository;
