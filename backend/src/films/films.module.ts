import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [HttpModule],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {} 