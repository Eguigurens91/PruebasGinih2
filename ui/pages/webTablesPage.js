const { expect } = require('@playwright/test');

class WebTablesPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.api = 'https://demoqa.com/webtables';
    this.sel = {
      addbtn: '#addNewRecordButton',
      modal: '.modal-content',
      inputs: {
        firstName: '#firstName',
        lastName:  '#lastName',
        email:     '#userEmail',
        age:       '#age',
        salary:    '#salary',
        department:'#department',
      },
      submitBtn: '#submit',
      search: '#searchBox',
      tbody: '.rt-tbody',
      rowGroup: '.rt-tr-group',
      cell: '.rt-td',
      editBtnRow: '[title="Edit"]',
    };
  }

  async goto() {
    await this.page.goto(this.api);
    await expect(this.page.locator(this.sel.tbody)).toBeVisible();
  }

  async abrirModal() {
    const add = this.page.locator(this.sel.addbtn);
    await expect(add).toBeVisible();
    await add.click();
    await expect(this.page.locator(this.sel.modal)).toBeVisible();
  }

  async llenarFormulario(data) {
    const { inputs, submitBtn } = this.sel;
    await this.page.locator(inputs.firstName).fill(String(data.firstName));
    await this.page.locator(inputs.lastName ).fill(String(data.lastName));
    await this.page.locator(inputs.email    ).fill(String(data.email));
    await this.page.locator(inputs.age      ).fill(String(data.age));
    await this.page.locator(inputs.salary   ).fill(String(data.salary));
    await this.page.locator(inputs.department).fill(String(data.department));
    await expect(this.page.locator(submitBtn)).toBeEnabled();
    await this.page.locator(submitBtn).click();
    await expect(this.page.locator(this.sel.modal)).toBeHidden();
  }

  /**
   * @returns {import('@playwright/test').Locator} 
   */
  async buscarxNombreyEmail(firstName, email) {
    await this.page.locator(this.sel.search).fill(firstName);
    const row = this.page.locator(this.sel.rowGroup, { has: this.page.locator(this.sel.cell, { hasText: email }) });
    await expect(row).toBeVisible();
    return row;
  }

  async validarRegistro(row, data) {
    const c = (i) => row.locator(this.sel.cell).nth(i);
    await expect(c(0)).toHaveText(String(data.firstName));
    await expect(c(1)).toHaveText(String(data.lastName));
    await expect(c(2)).toHaveText(String(data.age));
    await expect(c(3)).toHaveText(String(data.email));
    await expect(c(4)).toHaveText(String(data.salary));
    await expect(c(5)).toHaveText(String(data.department));
  }

  async editarSalaryEnFila(row, nuevoSalary) {
    await row.locator(this.sel.editBtnRow).click();
    await expect(this.page.locator(this.sel.modal)).toBeVisible();
    await this.page.locator(this.sel.inputs.salary).fill(String(nuevoSalary));
    await this.page.locator(this.sel.submitBtn).click();
    await expect(this.page.locator(this.sel.modal)).toBeHidden();
  }
}

module.exports = { WebTablesPage };