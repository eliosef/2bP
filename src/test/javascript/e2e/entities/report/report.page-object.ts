import { element, by, ElementFinder } from 'protractor';

export class ReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-report div table .btn-danger'));
    title = element.all(by.css('jhi-report div h2#page-heading span')).first();

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

export class ReportUpdatePage {
    pageTitle = element(by.id('jhi-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    employmentSelect = element(by.id('field_employment'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async employmentSelectLastOption() {
        await this.employmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employmentSelectOption(option) {
        await this.employmentSelect.sendKeys(option);
    }

    getEmploymentSelect(): ElementFinder {
        return this.employmentSelect;
    }

    async getEmploymentSelectedOption() {
        return this.employmentSelect.element(by.css('option:checked')).getText();
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

export class ReportDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-report-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-report'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
