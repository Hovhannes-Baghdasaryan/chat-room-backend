import { ConfigService, registerAs } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

export interface I_AppConfig {
  port: string
  nodeEnv: string
  apiPrefix: string
}

export const setupAppConfig = (app: NestExpressApplication) => {
  const configService = app.get(ConfigService)

  app.enableCors({ origin: '*' })

  app.setGlobalPrefix(configService.get('app.apiPrefix'))
}

export default registerAs(
  'app',
  (): I_AppConfig => ({
    port: process.env.APP_PORT,
    nodeEnv: process.env.NODE_ENV,
    apiPrefix: process.env.API_PREFIX,
  })
)
