describe('Mocks en', () => {

  describe('localhost', () => {

    describe('popups', () => {
      beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/02-interacciones.html')
        cy.viewport(1920, 1080)
      })

      it.skip('el alert que se muestra debería tener como texto "Hola mundo!!!"', () => {
        cy.on('window:alert', (texto) => {
          expect(texto).to.be.equal('Hola mundo!!!')
        })

        cy.get('#btn-alert')
          .click()
      })

      it('al aceptar el confirm debería desaparecer el mensaje', () => {
        // cy.on('window:confirm', () => {
        //   return true
        // })
        cy.window()
          .then((win) => {
            cy.stub(win, 'confirm').returns(true)
          })

        cy.get('#btn-confirm')
          .click()

        cy.get('#confirm-nombre')
          .should('be.empty')
      })

      it('al mostrar el prompt y escribir el nombre, debería mostrar en la web', () => {
        cy.window()
          .then((win) => {
            cy.stub(win, 'prompt').returns('Charly')
          })

        cy.get('#btn-prompt')
          .click()

        cy.get('#prompt-nombre')
          .should('have.text', 'Charly')
      })

    })

    describe('stubs, mocks e intercepts', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080)
      })

      it('si me encuentro en Birmingham me tiene que mostrar que estoy ahí', () => {
        cy.visit('http://127.0.0.1:8080/02-interacciones.html', {
          onBeforeLoad: (win) => {
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
              .callsFake((cb) => {
                const coords = {latitude: '52.485973', longitude: '-1.890715'}
                const position = {coords}
                return cb(position)
              }).as('stubUbicacion')
          }
        })

        cy.get('#btn-ubicacion')
          .click()

        cy.get('#ciudad')
          .should('have.text', 'Birmingham')

        cy.get('@stubUbicacion')
          .should('have.been.calledOnce')
      })

      it('intercepto la petición para devolver Fargo', () => {
        cy.intercept('/get-city?lat=41.6350208&lon=-0.9109504', {ciudad: 'Fargo'})

        cy.visit('http://127.0.0.1:8080/02-interacciones.html')

        cy.get('#btn-ubicacion')
          .click()

        cy.get('#ciudad')
          .should('have.text', 'Fargo')
      })

    })


    describe.only('tick y clock', () => {

      beforeEach(() => {
        cy.visit('https://resting.onrender.com/')
      })

      it('al crear un descanso de 5min, la cuenta debería empezar en 05:00', () => {
        cy.get('.css-qzovtw')
          .type('Descanso')

        // cy.contains('button', '5')
        cy.get('button.css-j13a3q')
          .first()
          .click()

        cy.contains('button', 'Start')
          .click()

        cy.clock()

        cy.get('.css-6368fc')
          .should('have.text', '05 : 00')

        // cy.wait(3000)

        cy.intercept('https://api.unsplash.com/photos/*').as('descargaImagen')
        cy.wait('@descargaImagen')

        cy.tick(120000)

        cy.get('.css-6368fc')
        .should('have.text', '03 : 00')

        cy.tick(240000)

        cy.get('.css-6368fc')
        .should('have.text', '00 : 00')
      })

    })

  })

})