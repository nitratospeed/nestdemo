import { Injectable } from "@nestjs/common";
import { firstValueFrom, lastValueFrom, map } from "rxjs";
import { HttpModule, HttpService } from '@nestjs/axios';

@Injectable()
export class RetoolService{
    constructor(
        private readonly httpService: HttpService,
      ) {}

    async findByProductId(id: string): Promise<any> {
      try {
        const response = await firstValueFrom(
          this.httpService.get(`https://api-generator.retool.com/gDFva6/nestjsdemo?productID=${id}`));
       
        if (response.status != 200) {
            console.log('error getting external service product');
            return null;
        }
        
        return response.data[0];
      } 
      catch (error) {
        console.log(error.message);
        return null;
      }
    }

    async create(productId: string): Promise<boolean> {
      try {
        const data = await lastValueFrom(
          this.httpService.post(
            'https://api-generator.retool.com/gDFva6/nestjsdemo',
            {
              'productID': productId,
              'ratingStars': '4 stars',
              'reviewCount': '55 reviews'
            }
          ).pipe(
            map(resp => resp)
          )
        );
      
        if (data.status != 201) {
            console.log('error creating external service product');
            return false;
        } 

        return true;
      } 
      catch (error) {
        console.log(error.message);
        return false;
      }
    }
}