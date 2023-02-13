import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { Request } from 'express';
import { SubscriberService } from './subscriber.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeDto } from './dto/subscribe.dto';
import { GetSubsDto } from './dto/get.subs.dto';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get('/subscriptions')
  async getAllSubscriptions(@Query(new ValidationPipe()) dto: GetSubsDto) {
    return await this.subscriberService.getAllSubscriptions(dto.id);
  }

  @Get('/subscribers')
  async getAllSubscribers(@Query(new ValidationPipe()) dto: GetSubsDto) {
    return await this.subscriberService.getAllSubscribers(dto.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async subscribe(
    @Req() request,
    @Body(new ValidationPipe()) dto: SubscribeDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.subscriberService.subscribe(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async removeSubscribe(
    @Req() request,
    @Body(new ValidationPipe()) dto: SubscribeDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.subscriberService.removeSubscribe(token, dto);
  }
}
