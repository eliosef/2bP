import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployment } from 'app/shared/model/employment.model';

type EntityResponseType = HttpResponse<IEmployment>;
type EntityArrayResponseType = HttpResponse<IEmployment[]>;

@Injectable({ providedIn: 'root' })
export class EmploymentService {
    public resourceUrl = SERVER_API_URL + 'api/employments';

    constructor(protected http: HttpClient) {}

    create(employment: IEmployment): Observable<EntityResponseType> {
        return this.http.post<IEmployment>(this.resourceUrl, employment, { observe: 'response' });
    }

    update(employment: IEmployment): Observable<EntityResponseType> {
        return this.http.put<IEmployment>(this.resourceUrl, employment, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmployment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployment[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
