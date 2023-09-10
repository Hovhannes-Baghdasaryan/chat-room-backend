import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { join } from 'path'

async function bootstrap() {
  const logger = new Logger('App')

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)

  const appConfig = configService.get('app')

  app.enableCors({ origin: '*' })

  app.setGlobalPrefix(appConfig.api_prefix)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const options = new DocumentBuilder()
    .setTitle('Chat Room Application')
    .setDescription('Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  app.useStaticAssets(join(__dirname, '../avatar'), {
    prefix: '/avatar',
  })

  await app.listen(appConfig.port, () => {
    logger.log(`App running in ${appConfig.server_domain}${appConfig.port}`)
  })
}

bootstrap()
