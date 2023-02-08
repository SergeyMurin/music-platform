import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { Request } from 'express';
import { SubscriberService } from './subscriber.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get('/subscriptions')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllSubscriptions(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.subscriberService.getAllSubscriptions(token);
  }

  @Get('/subscribers')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllSubscribers(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.subscriberService.getAllSubscribers(token);
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
