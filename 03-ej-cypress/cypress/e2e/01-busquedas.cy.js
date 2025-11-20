const URL = 'http://127.0.0.1:8080/01-busquedas.html'

describe('Búsquedas de elementos en', () => {

  describe('01-busquedas.html', () => {

    beforeEach(() => {
      cy.visit(URL)
    })

    it('el h1 de la página debería mostrar un mensaje de bienvenida', () => {
      // cy.visit('http://127.0.0.1:8080/01-busquedas.html')

      // Usando el selector de las etiquetas -> <nombre de la etiqueta>
      cy.get('h1')
        .should('have.text', 'Bienvenido a la página')
    })

    it('debería haber 4 elementos con la clase item', () => {
      // cy.visit('http://127.0.0.1:8080/01-busquedas.html')

      // Usando el selector de las clases -> .<nombre de la clase>
      cy.get('.item')
        .should('have.length', 4)
    })

    it('el h2 con id titulo debería tener el texto Listados', () => {
      // Usando el selector de los ids -> #<valor del atributo id>
      cy.get('#titulo')
        .should('have.text', 'Listados')
    })

    it('el segundo elemento de la lista de cosas debería ser Cosa 2', () => {
      // Usando el selector de los atributos -> [<nombre del atributo> =<valor del atributo>]
      cy.get('[data-cy="cosa2"]')
        .should('have.text', 'Cosa 2')
    })

    it('el primer enlace debería de tener el texto Amazon', () => {
      cy.get('[href="#Amazon"]')
        .should('have.text', 'Amazon')
    })

    it('el enlace de Google debería tener como href #Google', () => {
      cy.contains('a', 'Google')
        .should('have.attr', 'href', '#Google')
    })

    it('la caja de listados debería de tener un listado de items con 4 elementos', () => {

      // Usando el selector de descendiente directo -> <selector al elemento padre> > <selector al elemento hijo>
      cy.get('[data-cy="listados"]')
        .find('#listaItems > li')
        .should('have.length', 4)
    })



    it('el tercer elemento de la lista de cosas es Cosa 3 (con cypress)', () => {
      cy.get('#listaCosas > li')
        .should('have.length', 3)
        .eq(2)
        .should('have.text', 'Cosa 3')
        .parent()
        .find('li')
        .eq(0)
        .should('have.text', 'Cosa 1')

      // En lugar de usar find('li'), podemos usar children() porque nos devuelve la misma lista, los elementos hijos
      cy.get('#listaCosas > li')
        .should('have.length', 3)
        .eq(2)
        .should('have.text', 'Cosa 3')
        .parent()
        .children()
        // .eq(0)
        .first()
        .then(($li) => {
          console.log('$li', $li)
        })
        .should('have.text', 'Cosa 1')
    })

    it('el tercer elemento de la lista de cosas es Cosa 3 (con selector)', () => {
      cy.get('#listaCosas > li:last')
        .should('have.text', 'Cosa 3')
    })

    it('el tercer elemento de la lista de cosas es Cosa 3 (con cypress)', () => {
      cy.get('#listaCosas > li')
        .last()
        .should('have.text', 'Cosa 3')
    })

    it('la lista items deberían de mostrar del Item 1 al Item 4', () => {

      // String Interpolation | Template literal
      // const nombre = 'Charly'
      // const apellido = 'Falco'

      // console.log('Me llamo ' + nombre + ' ' + apellido)
      // console.log(`Me llamo ${nombre} ${apellido}`)

      cy.get('#listaItems > li')
        .each(($item, index) => {
          // console.log('Dentro del each')
          // console.log($item)
          const itemNativo = $item[0]
          // console.log(itemNativo)

          expect($item.text()).to.be.equal(`Item ${index+1}`)
          expect(itemNativo.textContent).to.be.equal(`Item ${index+1}`)
        })
        .should('have.length', 4)

      cy.get('#listaItems > li')
        .then(($items) => {
          console.log('$items', $items)
          expect($items.length).to.be.equal(4)
          for (let i = 0; i < $items.length; i++) {
            expect($items[i].textContent).to.be.equal(`Item ${i+1}`)
          }
        })
    })

  })

  describe.only('Ejercicio tabla (lab 14.1)', () => {

    beforeEach(() => {
      cy.visit('http://www.w3schools.com/html/html_tables.asp')
    })

    it('Comprueba que la tabla existe', () => {
      cy.get('#customers')
        .should('exist')
    })

    it('Comprueba que tiene el número de filas correcto', () => {
      cy.get('#customers tr')
        .should('have.length', 7)
    })

    it('Comprueba que la última fila tiene el número de celdas correcto', () => {
      cy.get('#customers tr')
        .last()
        .children()
        .should('have.length', 3)
    })

    it('Comprueba que la última fila tiene el número de celdas correcto', () => {
      cy.get('#customers tr:last > td')
        .should('have.length', 3)
    })

    it('Comprueba que después de la quinta fila, hay dos filas más', () => {
      let numFilas = 0

      cy.get('#customers tr')
        .each(($tr, index) => {
          if (index + 1 > 5) {
            numFilas += 1
          }
        })
        .then(() => {
          expect(numFilas).to.be.equal(2)
        })
    })

    it('Comprueba que después de la quinta fila, hay dos filas más', () => {
      cy.get('#customers tr')
        .eq(4)
        .nextAll()
        .should('have.length', 2)
    })

    it('Comprueba que después de la quinta fila, hay dos filas más', () => {
      cy.get('#customers tr:nth-child(5)')
        .nextAll()
        .should('have.length', 2)
    })

    it('Comprueba que después de la quinta fila, hay dos filas más', () => {
      cy.get('#customers tr:nth-child(5)~tr')
        .should('have.length', 2)
    })

    it('Comprueba que todas las celdas tienen contenido', () => {
      cy.get('#customers th, #customers td')
        .each(($celda) => {
          expect($celda.text()).is.not.empty
          expect($celda.text()).not.be.equal('')
        })
    })

    it('Todas las comprobaciones en un mismo hilo de cypress', () => {
      cy.get('#customers')
        .should('exist')
        .find('tr')
        .should('have.length', 7)
        .last()
        .children()
        .should('have.length', 3)
        .first()
        .should('have.text', 'Magazzini Alimentari Riuniti')
        .parent()
        .parent()
        .children()
        .eq(4)
        .nextAll()
        .should('have.length', 2)
        .parent()
        .find('th, td')
        .each(($celda) => {
          expect($celda.text()).is.not.empty
          expect($celda.text()).not.be.equal('')
        })
    })

  })

})