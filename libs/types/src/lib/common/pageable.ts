import { IsNumber } from "class-validator";

export class Pageable {
    @IsNumber()
    currentPage: number;

    @IsNumber()
    numberPerPage: number;
}