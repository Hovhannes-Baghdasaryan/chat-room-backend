import { ApiProperty } from '@nestjs/swagger'

class MessageDto {
  @ApiProperty()
  message: string

  @ApiProperty()
  username: string
}

export class MessageOutputDto {
  @ApiProperty({ type: MessageDto, isArray: true })
  declare data: MessageDto
}
