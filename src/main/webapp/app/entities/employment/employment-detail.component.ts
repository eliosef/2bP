import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployment } from 'app/shared/model/employment.model';

@Component({
    selector: 'jhi-employment-detail',
    templateUrl: './employment-detail.component.html'
})
export class EmploymentDetailComponent implements OnInit {
    employment: IEmployment;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employment }) => {
            this.employment = employment;
        });
    }

    previousState() {
        window.history.back();
    }
}
