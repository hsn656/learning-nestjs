import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';
import { PowerService } from 'src/power/power.service';
import { DiskService } from './disk.service';

@Module({
  providers: [DiskService],
  imports: [PowerModule],
  exports:[DiskService]
})
export class DiskModule {}
