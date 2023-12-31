import * as multer from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators'
import { editFileName, fileFilter, fileSize } from 'src/common/utils/filter'
import { MessageOutputDto } from 'src/common/dto/message.dto'
import { ChatService } from './chat.service'

import { JoinDto, JoinOutputDto } from 'src/common/dto/join.dto'
import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common'

@ApiTags('Chat')
@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @ApiOkResponse({ type: MessageOutputDto })
  getAllMessages() {
    return this.chatService.getMessages()
  }

  @Post('join')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize },
      storage: multer.diskStorage({
        destination: './avatar',
        filename: editFileName,
      }),
      fileFilter: fileFilter,
    })
  )
  @ApiOkResponse({ type: JoinOutputDto })
  joinChat(
    @Body() joinDto: JoinDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    file
  ) {
    return this.chatService.joinChat(joinDto, file)
  }
}
