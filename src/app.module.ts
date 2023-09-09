import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ChatModule } from './modules/chat/chat.module'
import { ConfigModule } from '@nestjs/config'
import appConfig from './common/config/app.config'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './avatar',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
