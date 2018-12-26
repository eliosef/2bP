import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Report } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { ReportComponent } from './report.component';
import { ReportDetailComponent } from './report-detail.component';
import { ReportUpdateComponent } from './report-update.component';
import { ReportDeletePopupComponent } from './report-delete-dialog.component';
import { IReport } from 'app/shared/model/report.model';

@Injectable({ providedIn: 'root' })
export class ReportResolve implements Resolve<IReport> {
    constructor(private service: ReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Report> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Report>) => response.ok),
                map((report: HttpResponse<Report>) => report.body)
            );
        }
        return of(new Report());
    }
}

export const reportRoute: Routes = [
    {
        path: 'report',
        component: ReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.report.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/:id/view',
        component: ReportDetailComponent,
        resolve: {
            report: ReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.report.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/new',
        component: ReportUpdateComponent,
        resolve: {
            report: ReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.report.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report/:id/edit',
        component: ReportUpdateComponent,
        resolve: {
            report: ReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.report.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportPopupRoute: Routes = [
    {
        path: 'report/:id/delete',
        component: ReportDeletePopupComponent,
        resolve: {
            report: ReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'App.report.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
