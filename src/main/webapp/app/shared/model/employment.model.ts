import { IEmployee } from 'app/shared/model//employee.model';

export interface IEmployment {
    id?: number;
    position?: string;
    employees?: IEmployee[];
    managers?: IEmployee[];
}

export class Employment implements IEmployment {
    constructor(public id?: number, public position?: string, public employees?: IEmployee[], public managers?: IEmployee[]) {}
}
