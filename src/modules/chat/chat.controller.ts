import { ChatService } from './chat.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common/decorators'
import { MessageOutputDto } from 'src/common/dto/message.dto'

@ApiTags('Chat')
@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @ApiOkResponse({ type: MessageOutputDto })
  getAllMessages() {
    return this.chatService.getMessages()
  }
}
