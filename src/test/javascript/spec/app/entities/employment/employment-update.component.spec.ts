/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { EmploymentUpdateComponent } from 'app/entities/employment/employment-update.component';
import { EmploymentService } from 'app/entities/employment/employment.service';
import { Employment } from 'app/shared/model/employment.model';

describe('Component Tests', () => {
    describe('Employment Management Update Component', () => {
        let comp: EmploymentUpdateComponent;
        let fixture: ComponentFixture<EmploymentUpdateComponent>;
        let service: EmploymentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [EmploymentUpdateComponent]
            })
                .overrideTemplate(EmploymentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmploymentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploymentService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Employment(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.employment = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Employment();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.employment = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
