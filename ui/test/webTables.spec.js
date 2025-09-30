const { test, expect } = require('@playwright/test');
const { WebTablesPage } = require('../pages/webTablesPage');

test.describe('DEMOQA - Crear y Editar ', () => {
  test('Alta, búsqueda y edición', async ({ page }) => {
    const web = new WebTablesPage(page);
    await web.goto();
    const usuario = {
      firstName: 'Karla',
      lastName: 'Vallecillo',
      email: 'karla@example.com',
      age: 33,
      salary: 5000,
      department: 'QA',
    };
    await web.abrirModal();
    await web.llenarFormulario(usuario);
    let row = await web.buscarxNombreyEmail(usuario.firstName, usuario.email);
    await web.validarRegistro(row, usuario);
    const nuevoSalary = 10000;
    await web.editarSalaryEnFila(row, nuevoSalary);
    row = await web.buscarxNombreyEmail(usuario.firstName, usuario.email);
    await expect(row.locator(web.sel.cell).nth(4)).toHaveText(String(nuevoSalary));
  });
});