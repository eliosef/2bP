import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { IEmployment } from 'app/shared/model/employment.model';
import { EmploymentService } from 'app/entities/employment';

@Component({
    selector: 'jhi-report-update',
    templateUrl: './report-update.component.html'
})
export class ReportUpdateComponent implements OnInit {
    report: IReport;
    isSaving: boolean;

    employments: IEmployment[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected reportService: ReportService,
        protected employmentService: EmploymentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ report }) => {
            this.report = report;
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
        if (this.report.id !== undefined) {
            this.subscribeToSaveResponse(this.reportService.update(this.report));
        } else {
            this.subscribeToSaveResponse(this.reportService.create(this.report));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReport>>) {
        result.subscribe((res: HttpResponse<IReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
