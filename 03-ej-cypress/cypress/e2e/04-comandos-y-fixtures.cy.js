describe('Comandos y fixtures', () => {
  let datosUsuarios = {}

  before(() => {
    cy.fixture('login.json')
      .then((datos) => {
        datosUsuarios = datos
      })
  })

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8081/login')
  })

  it('debería ir a la página de inicio si las credenciales son validas', () => {
    cy.get('#email')
      .type(datosUsuarios.usuarioValido.email)

    cy.get('#password')
      .type(datosUsuarios.usuarioValido.password)

    // cy.get('button')
    //   .click()
    cy.get('form')
      .submit()

    cy.get('h1')
      .should('have.text', 'Bienvenido')
  })

  it('debería ir a la página de login si las credenciales son invalidas', () => {
    cy.get('#email')
      .type(datosUsuarios.usuarioInvalido.email)

    cy.get('#password')
      .type(datosUsuarios.usuarioInvalido.password)

    // cy.get('button')
    //   .click()
    cy.get('form')
      .submit()

    cy.url()
      .should('include', '/login')

  })


  it('debería ir a la página de login si las credenciales son invalidas (con comando)', () => {
    cy.login(datosUsuarios.usuarioInvalido.email, datosUsuarios.usuarioInvalido.password)

    cy.url()
      .should('include', '/login')

  })

})