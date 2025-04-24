// src/perjalanan/perjalanan.scheduler.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PerjalananService } from './perjalanan.service';

@Injectable()
export class PerjalananScheduler {
  private readonly logger = new Logger(PerjalananScheduler.name);

  constructor(private readonly service: PerjalananService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleReminderCheck() {
    const list = await this.service.findUpcomingPerjalanan();

    if (list.length === 0) {
      this.logger.log('✅ Tidak ada perjalanan dalam 3 hari ke depan');
    }

    for (const p of list) {
      this.logger.log(
        `📢 Turis ${p.user.name} akan memulai perjalanan ke ${JSON.stringify(p.destinasi)} pada ${p.tanggalMulai}`,
      );
    }
  }
}
