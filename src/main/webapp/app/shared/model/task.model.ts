import { Moment } from 'moment';
import { IEmployment } from 'app/shared/model//employment.model';

export interface ITask {
    id?: number;
    title?: string;
    assignedDate?: Moment;
    dueDate?: Moment;
    employment?: IEmployment;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public assignedDate?: Moment,
        public dueDate?: Moment,
        public employment?: IEmployment
    ) {}
}
