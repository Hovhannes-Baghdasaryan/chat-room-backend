import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class JoinDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string
}

export class JoinOutputDto extends JoinDto {
  @ApiProperty({ example: 'server static file path' })
  avatar: string
}
