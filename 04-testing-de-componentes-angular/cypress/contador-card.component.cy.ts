import { ContadorCardComponent } from "../src/app/components/contador-card/contador-card.component"


describe('Contador', () => {
  beforeEach(() => {
    cy.mount(ContadorCardComponent, {
      componentProperties: {
        cuentaInicial: 5,
        titulo: 'Artículos'
      }
    })
  })


  it('el titulo es el correcto', () => {
    cy.get('[data-cy="cuenta"]')
      .should('have.text', 5)

    cy.get('h1')
      .should('have.text', 'Artículos')
  })

  it('al pulsar el botón de +1 incrementa la cuenta en 1', () => {
    cy.get('[data-cy="btn-incrementar"]')
      .click()

    cy.get('[data-cy="cuenta"]')
      .should('have.text', 6)
  })

})