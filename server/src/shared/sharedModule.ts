import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/configService';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [],
  controllers: [],
})
export class SharedModule {}
