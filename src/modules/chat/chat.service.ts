import { Injectable } from '@nestjs/common'
import { I_Message } from 'src/common/interfaces/message'

@Injectable()
export class ChatService {
  private readonly chatMessages: I_Message[] = []

  public addMessage(message: I_Message) {
    this.chatMessages.concat(message)

    return message
  }

  public getMessages(): I_Message[] {
    return this.chatMessages
  }
}
