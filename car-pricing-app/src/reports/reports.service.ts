import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private readonly repo:Repository<Report>){}

    create(reportDto:CreateReportDto,user:User){
        const report = this.repo.create(reportDto);
        report.user=user;
        this.repo.save(report);
        return report;
    }
}
