describe('Tests visuales', () => {

  it.only('debería de tener una caja de color gold', () => {
    cy.visit('http://127.0.0.1:8080/05-tests-visuales.html')

    cy.matchImageSnapshot('caja-de-oro')
  })

})