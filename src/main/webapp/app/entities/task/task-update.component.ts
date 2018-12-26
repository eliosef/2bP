import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IEmployment } from 'app/shared/model/employment.model';
import { EmploymentService } from 'app/entities/employment';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    task: ITask;
    isSaving: boolean;

    employments: IEmployment[];
    assignedDate: string;
    dueDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taskService: TaskService,
        protected employmentService: EmploymentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
            this.assignedDate = this.task.assignedDate != null ? this.task.assignedDate.format(DATE_TIME_FORMAT) : null;
            this.dueDate = this.task.dueDate != null ? this.task.dueDate.format(DATE_TIME_FORMAT) : null;
        });
        this.employmentService.query().subscribe(
            (res: HttpResponse<IEmployment[]>) => {
                this.employments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.task.assignedDate = this.assignedDate != null ? moment(this.assignedDate, DATE_TIME_FORMAT) : null;
        this.task.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
        result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmploymentById(index: number, item: IEmployment) {
        return item.id;
    }
}
