import { IEmployment } from 'app/shared/model//employment.model';

export interface IReport {
    id?: number;
    title?: string;
    employment?: IEmployment;
}

export class Report implements IReport {
    constructor(public id?: number, public title?: string, public employment?: IEmployment) {}
}
