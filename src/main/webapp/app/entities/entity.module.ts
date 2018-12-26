import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppTaskModule } from './task/task.module';
import { AppEmployeeModule } from './employee/employee.module';
import { AppEmploymentModule } from './employment/employment.module';
import { AppReportModule } from './report/report.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AppTaskModule,
        AppEmployeeModule,
        AppEmploymentModule,
        AppReportModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
