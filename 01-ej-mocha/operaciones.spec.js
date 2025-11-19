// Importaciones con CommonJS
const { sumar, dividir } = require('./operaciones.js')
const assert = require('assert')

describe("archivo de operaciones.js", () => {

  describe("función sumar", () => {

    it("si sumas 1 y 2 el resultado es 3", () => {
      const resultado = sumar(1, 2)
      assert.equal(resultado, 3)
    })

    it("si sumas 5 y 4 el resultado es 9", () => {
      const resultado = sumar(5, 4)
      assert.ok(resultado == 9)
    })

  })

  describe("función dividir", () => {

    it("si divides 10 y 5 el resultado es 2", () => {
      const resultado = dividir(10, 5)
      assert.equal(resultado, 2)
    })

    it("si divides algo por 0 tiene que dar un error", () => {
      assert.throws(() => {
        dividir(9, 0)
      }, Error('No se puede dividir por 0'))
    })

  })

})
