import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

@Module({
  imports: [HttpModule],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {} 