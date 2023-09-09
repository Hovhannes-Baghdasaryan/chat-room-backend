import { ApiProperty } from '@nestjs/swagger'

export class JoinDto {
  @ApiProperty()
  username: string
}

export class JoinOutputDto extends JoinDto {
  @ApiProperty({ example: 'server static file path' })
  avatar: string
}
