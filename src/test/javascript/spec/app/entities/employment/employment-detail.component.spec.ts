/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { EmploymentDetailComponent } from 'app/entities/employment/employment-detail.component';
import { Employment } from 'app/shared/model/employment.model';

describe('Component Tests', () => {
    describe('Employment Management Detail Component', () => {
        let comp: EmploymentDetailComponent;
        let fixture: ComponentFixture<EmploymentDetailComponent>;
        const route = ({ data: of({ employment: new Employment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [EmploymentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmploymentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploymentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
