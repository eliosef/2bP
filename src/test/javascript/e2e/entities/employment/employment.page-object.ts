import { element, by, ElementFinder } from 'protractor';

export class EmploymentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employment div table .btn-danger'));
    title = element.all(by.css('jhi-employment div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmploymentUpdatePage {
    pageTitle = element(by.id('jhi-employment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    positionInput = element(by.id('field_position'));
    employeeSelect = element(by.id('field_employee'));
    managerSelect = element(by.id('field_manager'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPositionInput(position) {
        await this.positionInput.sendKeys(position);
    }

    async getPositionInput() {
        return this.positionInput.getAttribute('value');
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
    }

    async managerSelectLastOption() {
        await this.managerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async managerSelectOption(option) {
        await this.managerSelect.sendKeys(option);
    }

    getManagerSelect(): ElementFinder {
        return this.managerSelect;
    }

    async getManagerSelectedOption() {
        return this.managerSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class EmploymentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
