import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Employment } from 'app/shared/model/employment.model';
import { EmploymentService } from './employment.service';
import { EmploymentComponent } from './employment.component';
import { EmploymentDetailComponent } from './employment-detail.component';
import { EmploymentUpdateComponent } from './employment-update.component';
import { EmploymentDeletePopupComponent } from './employment-delete-dialog.component';
import { IEmployment } from 'app/shared/model/employment.model';

@Injectable({ providedIn: 'root' })
export class EmploymentResolve implements Resolve<IEmployment> {
    constructor(private service: EmploymentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Employment>) => response.ok),
                map((employment: HttpResponse<Employment>) => employment.body)
            );
        }
        return of(new Employment());
    }
}

export const employmentRoute: Routes = [
    {
        path: 'employment',
        component: EmploymentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.employment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment/:id/view',
        component: EmploymentDetailComponent,
        resolve: {
            employment: EmploymentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.employment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment/new',
        component: EmploymentUpdateComponent,
        resolve: {
            employment: EmploymentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.employment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment/:id/edit',
        component: EmploymentUpdateComponent,
        resolve: {
            employment: EmploymentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.employment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employmentPopupRoute: Routes = [
    {
        path: 'employment/:id/delete',
        component: EmploymentDeletePopupComponent,
        resolve: {
            employment: EmploymentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.employment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
