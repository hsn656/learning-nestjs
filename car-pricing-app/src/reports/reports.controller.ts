import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {

    @Post()
    create(@Body() body:CreateReportDto) {
        return body;
    }
}
