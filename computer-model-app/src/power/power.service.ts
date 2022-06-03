import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(amount:number){
        console.log(`Power supply ${amount} watts`);
    }
}
