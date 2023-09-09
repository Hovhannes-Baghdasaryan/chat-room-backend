import { registerAs } from '@nestjs/config'

export interface I_AppConfig {
  port: string
  api_prefix: string
  server_domain: string
}

export default registerAs(
  'app',
  (): I_AppConfig => ({
    port: process.env.APP_PORT,
    api_prefix: process.env.API_PREFIX,
    server_domain: process.env.SERVER_DOMAIN,
  })
)
