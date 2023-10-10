import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePurchaseDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}