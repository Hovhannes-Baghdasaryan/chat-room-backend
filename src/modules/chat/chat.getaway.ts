import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common/services'
import { I_Message } from 'src/common/interfaces/message'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'

@WebSocketGateway(8000, { cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server
  private logger: Logger = new Logger('ChatGateway')

  afterInit() {
    this.logger.log('init')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected from ${client.id}`)
  }

  @SubscribeMessage('message')
  handleConnection(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: I_Message
  ) {
    this.logger.log(
      `Client Connected to ${socket.id} ${data?.message} ${data?.username}`
    )

    if (data?.message) {
      const newMessage = this.chatService.addMessage({
        ...data,
        date: new Date(),
      })

      this.server.emit('receive_message', newMessage)
    }
  }
}
