import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { setupAppConfig } from './common/config/app.config'
import { setupSwaggerConfig } from './common/config/swagger.config'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const logger = new Logger('App')

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  setupAppConfig(app)
  setupSwaggerConfig(app)

  await app.listen(process.env.APP_PORT || 3002, () => {
    logger.log(`App running in http://localhost:${process.env.APP_PORT}`)
  })
}

bootstrap()
