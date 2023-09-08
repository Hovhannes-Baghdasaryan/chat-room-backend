import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.getaway'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
