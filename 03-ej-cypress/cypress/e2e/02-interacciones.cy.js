const URL = 'http://127.0.0.1:8080/02-interacciones.html'

describe('Interacciones con elementos web', () => {

  describe('Retry ability', () => {

    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/02-interacciones.html')
    })

    it('debería de aparecer un botón con el texto "Soy un botón perezoso"', () => {
      cy.get('#btn-lazy-3500')
        .should('have.text', 'Soy un botón perezoso')
    })

    it('debería de aparecer un botón con el texto "Soy un botón más perezoso todavía"', () => {
      // cy.get('#btn-lazy-5500')
      cy.get('#btn-lazy-5500', { timeout: 6000 })
        .should('have.text', 'Soy un botón más perezoso todavía')
    })

  })

  describe('Clicks, desplegables y checkboxes', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/02-interacciones.html')
    })

    it('Si introducimos el código correcto (6710) nos muestra en el display el mensaje "CODE OK"', () => {
      cy.get('#p6')
        .click()
      cy.get('#p7')
        .click()
      cy.get('#p1')
        .click()
      cy.get('#p0')
        .click()

      cy.get('#pantalla-codigo')
        .should('have.text', 'CODE OK')
    })


    it('Si pulsamos números y pulsamos el botón de "CLD" los borra', () => {
      cy.get('#p6')
        .click()
      cy.get('#p7')
        .click()
      cy.get('#p1')
        .click()
      cy.get('#pclear')
        .click()

      cy.get('#pantalla-codigo')
        .should('have.text', '')

      cy.get('#pantalla-codigo')
        .should('be.empty')
    })


    it('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
      cy.get('#p6')
        .click()
      cy.get('#p7')
        .click()
      cy.get('#p1')
        .click()

      cy.get('#pantalla-codigo')
        .should('have.text', '671')

      cy.get('#pdel')
        .click()

      cy.get('#pantalla-codigo')
        .should('have.text', '67')
    })

    it('No deja introducir un código de más de 4 números', () => {
      cy.get('#p6')
        .click()
      cy.get('#p7')
        .click()
      cy.get('#p1')
        .click()
      cy.get('#p7')
        .click()
      cy.get('#p1')
        .click()
      cy.get('#p1')
        .click()
      cy.get('#p1')
        .click()

      cy.get('#pantalla-codigo')
        .should('have.text', '6717')
    })

    it('la caja debería de cambiar al color amarillo al hacer doble click sobre ella', () => {
      cy.get('#caja-doble-click')
        .dblclick()
        .should('have.css', 'background-color', 'rgb(255, 255, 0)')
        .and('have.class', 'db-clicked')
    })

    it('Al marcar Cine y Tenis, deberíamos de encontrarnos con 3 opciones seleccionadas, y después al desmarcar el de Series, quedan 2 opciones marcadas', () => {
      cy.get('input#hobby1')
        .check()
      cy.get('input#hobby4')
        .check()

      cy.get('[data-cy="hobbies"] input:checked')
        .should('have.length', 3)

      cy.get('input#hobby3')
        .uncheck()

      cy.get('[data-cy="hobbies"] input:checked')
        .should('have.length', 2)
    })

    it.only('Al seleccionar la opción de XPeng se queda seleccionada, y si después seleccionamos la de Tesla, se cambia la selección', () => {
      cy.get('#select-coches-electricos')
        .select('xpeng-p7')

      cy.get('#select-coches-electricos option:selected')
        .should('have.text', 'Xpeng P7')


      cy.get('#select-coches-electricos')
        .select('Tesla Model 3')
        .should('have.value', 'tesla-model-3')

      cy.get('#select-coches-electricos option:selected')
        .should('have.value', 'tesla-model-3')
    })


  })

  describe('Escribir en campos de texto', () => {

    describe('TODO MVC', () => {

      beforeEach(() => {
        cy.visit('https://todomvc.com/examples/javascript-es6/dist/')

        cy.get('input.new-todo')
          .type('Tarea 1{enter}')
          .type('Tarea 2{enter}')
          .type('Tarea 3{enter}')
      })

      it('Crear 3 tareas', () => {
        // cy.visit('https://todomvc.com/examples/javascript-es6/dist/')

        // cy.get('input.new-todo')
        //   .type('Tarea 1{enter}')
        //   .type('Tarea 2{enter}')
        //   .type('Tarea 3{enter}')

        cy.get('ul.todo-list label')
          .each(($label, index, $listaLabels) => {
            expect($label.text()).to.be.equal(`Tarea ${$listaLabels.length - index}`)
          })

        cy.contains('a', 'Active')
          .should('exist')

        cy.contains('a', 'Completed')
          .should('exist')
      })

      it('Añadir 3 tareas y marcar 1 como completada', () => {
        cy.get('ul.todo-list input[type="checkbox"]')
          .eq(1)
          .click()
          .next()
          .should('have.css', 'text-decoration', 'line-through')


        cy.get('ul.todo-list input[type="checkbox"]')
          .last()
          .click()

        cy.get('ul.todo-list label')
          .last()
          .should('have.css', 'text-decoration', 'line-through')

      })

      it('Añadir 3 tareas, completar todas y eliminar las completadas', () => {

        cy.get('ul.todo-list input[type="checkbox"]')
          .click({ multiple: true })

        cy.contains('button', 'Clear completed')
          .click()

        cy.get('ul.todo-list')
          .children()
          .should('have.length', 0)

      })

      it('Añadir 3 tareas, completar todas y eliminar las completadas', () => {

        cy.get('label.toggle-all-label')
          .click()

        cy.contains('button', 'Clear completed')
          .click()

        cy.get('ul.todo-list')
          .children()
          .should('have.length', 0)

      })

    })

    describe('Wikipedia', () => {

      beforeEach(() => {
        cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada')
      })

      it('buscar japón en la wikipedia y comprobar que en el título pone Japón (con submit)', () => {
        cy.get('#p-search > a')
          .click()

        cy.get('#searchform input[name="search"]')
          .type('Japón')

        cy.get('#searchform')
          .submit()

        cy.get('#firstHeading span')
          .should('have.text', 'Japón')

        cy.title()
          .then((titulo) => {
            expect(titulo).to.be.equal('Japón - Wikipedia, la enciclopedia libre')
          })

        cy.title()
          .should('equal', 'Japón - Wikipedia, la enciclopedia libre')
      })

      // it.only('buscar japón en la wikipedia y comprobar que en el título pone Japón (con botón)', () => {
      //   cy.get('#p-search > a')
      //     .click()

      //   cy.get('#searchform input[name="search"]')
      //     .type('Japón')

      //   cy.contains('button', 'Buscar')
      //     .click()

      //   cy.get('#firstHeading span')
      //     .should('have.text', 'Japón')

      //   cy.title()
      //     .then((titulo) => {
      //       console.log(titulo)
      //       expect(titulo).to.be.equal('Japón - Wikipedia, la enciclopedia libre')
      //     })
      // })

    })

  })


  describe('Drag and drop', () => {

  })

  describe('Popups nativos', () => {

  })

  describe('Screenshots', () => {

  })

})