import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { JoinDto } from 'src/common/dto/join.dto'
import { I_Message } from 'src/common/interfaces/message.interface'
import { I_User } from 'src/common/interfaces/user.interface'

@Injectable()
export class ChatService {
  private readonly chatMessages: I_Message[] = []

  public addMessage(message: I_Message) {
    this.chatMessages.push(message)

    return message
  }

  public getMessages(): I_Message[] {
    return this.chatMessages
  }

  public joinChat(dto: JoinDto, file) {
    if (file) {
      const domain = process.env.SERVER_DOMAIN || ''

      return {
        username: dto.username,
        avatar: `${domain}/${file.path}`,
      }
    }
  }
}
