/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmploymentComponentsPage, EmploymentDeleteDialog, EmploymentUpdatePage } from './employment.page-object';

const expect = chai.expect;

describe('Employment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employmentUpdatePage: EmploymentUpdatePage;
    let employmentComponentsPage: EmploymentComponentsPage;
    let employmentDeleteDialog: EmploymentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employments', async () => {
        await navBarPage.goToEntity('employment');
        employmentComponentsPage = new EmploymentComponentsPage();
        expect(await employmentComponentsPage.getTitle()).to.eq('App.employment.home.title');
    });

    it('should load create Employment page', async () => {
        await employmentComponentsPage.clickOnCreateButton();
        employmentUpdatePage = new EmploymentUpdatePage();
        expect(await employmentUpdatePage.getPageTitle()).to.eq('App.employment.home.createOrEditLabel');
        await employmentUpdatePage.cancel();
    });

    it('should create and save Employments', async () => {
        const nbButtonsBeforeCreate = await employmentComponentsPage.countDeleteButtons();

        await employmentComponentsPage.clickOnCreateButton();
        await promise.all([
            employmentUpdatePage.setPositionInput('position')
            // employmentUpdatePage.employeeSelectLastOption(),
            // employmentUpdatePage.managerSelectLastOption(),
        ]);
        expect(await employmentUpdatePage.getPositionInput()).to.eq('position');
        await employmentUpdatePage.save();
        expect(await employmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Employment', async () => {
        const nbButtonsBeforeDelete = await employmentComponentsPage.countDeleteButtons();
        await employmentComponentsPage.clickOnLastDeleteButton();

        employmentDeleteDialog = new EmploymentDeleteDialog();
        expect(await employmentDeleteDialog.getDialogTitle()).to.eq('App.employment.delete.question');
        await employmentDeleteDialog.clickOnConfirmButton();

        expect(await employmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
