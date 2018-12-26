import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmployment } from 'app/shared/model/employment.model';
import { AccountService } from 'app/core';
import { EmploymentService } from './employment.service';

@Component({
    selector: 'jhi-employment',
    templateUrl: './employment.component.html'
})
export class EmploymentComponent implements OnInit, OnDestroy {
    employments: IEmployment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected employmentService: EmploymentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.employmentService.query().subscribe(
            (res: HttpResponse<IEmployment[]>) => {
                this.employments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmployment) {
        return item.id;
    }

    registerChangeInEmployments() {
        this.eventSubscriber = this.eventManager.subscribe('employmentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
