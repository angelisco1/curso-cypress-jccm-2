import { createOutputSpy } from "cypress/angular"
import { ContadorComponent } from "../src/app/components/contador/contador.component"

describe('Contador', () => {
  beforeEach(() => {
    cy.mount(ContadorComponent, {
      componentProperties: {
        cuenta: 2,
        onIncrementar: createOutputSpy('onIncrementarSpy'),
        onDecrementar: createOutputSpy('onDecrementarSpy')
      }
    })
  })

  it('la cuenta empieza en 2', () => {
    cy.get('[data-cy="cuenta"]')
      .should('have.text', 2)
  })

  it('al pulsar el botón de +1 se emite el evento de onIncrementar', () => {
    cy.get('[data-cy="btn-incrementar"]')
      .click()

    cy.get('@onIncrementarSpy')
      .should('have.callCount', 1)
  })

})