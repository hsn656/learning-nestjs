import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { User } from 'src/users/users.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService:ReportsService ){}

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() body:CreateReportDto,@CurrentUser() user:User) {
        return this.reportsService.create(body,user);
    }
}
