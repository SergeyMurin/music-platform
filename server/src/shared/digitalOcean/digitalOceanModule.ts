import { Module } from '@nestjs/common';
import { DigitalOceanService } from './digitalOceanService';

@Module({
  providers: [DigitalOceanService],
  exports: [DigitalOceanService],
})
export class DigitalOceanModule {}
