import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common/services'
import { I_Message } from 'src/common/interfaces/message'
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
    this.logger.log(`Client Connected to ${socket.id} ${data?.message} ${data?.username}`)

    if (data?.message) {
      const newMessage = this.chatService.addMessage({
        ...data,
        date: new Date(),
        id: randomUUID(),
      })

      this.server.emit('receive_message', newMessage)
    }
  }

  @SubscribeMessage('leave')
  leaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() username: string) {
    this.logger.log(`Client Leaves Socket ${socket.id} ${username}`)

    this.server.emit('leave_room', username)
  }
}
