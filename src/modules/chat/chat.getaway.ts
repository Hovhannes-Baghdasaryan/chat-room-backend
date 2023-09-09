import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common/services'
import { I_Message } from 'src/common/interfaces/message.interface'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { randomUUID } from 'crypto'

@WebSocketGateway(8000, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
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
  handleConnection(@ConnectedSocket() socket: Socket, @MessageBody() data: I_Message) {
    this.logger.log(`Client Send from ${socket.id} with message ${data?.message} ${data?.username}`)

    if (data?.message) {
      const newMessage = this.chatService.addMessage({
        id: randomUUID(),
        date: new Date(),
        message: data.message,
        username: data.username,
        userAvatar: data.userAvatar,
      })

      this.server.emit('receive_message', newMessage)
    }
  }

  @SubscribeMessage('leave')
  leaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() username: string) {
    this.logger.log(`Client Leaves Socket ${socket.id} ${username}`)

    this.server.emit('leave_room', username)
  }

  @SubscribeMessage('typing')
  handleTyping(@ConnectedSocket() socket: Socket, @MessageBody() username: string) {
    this.logger.log(`Client  ${username} Is Typing on Socket ${socket.id}`)

    this.server.emit('receive_typing', username)
  }
}
