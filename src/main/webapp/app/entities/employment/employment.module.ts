import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared';
import {
    EmploymentComponent,
    EmploymentDetailComponent,
    EmploymentUpdateComponent,
    EmploymentDeletePopupComponent,
    EmploymentDeleteDialogComponent,
    employmentRoute,
    employmentPopupRoute
} from './';

const ENTITY_STATES = [...employmentRoute, ...employmentPopupRoute];

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmploymentComponent,
        EmploymentDetailComponent,
        EmploymentUpdateComponent,
        EmploymentDeleteDialogComponent,
        EmploymentDeletePopupComponent
    ],
    entryComponents: [EmploymentComponent, EmploymentUpdateComponent, EmploymentDeleteDialogComponent, EmploymentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEmploymentModule {}
