// Importaciones con ES Modules
import { sumar, dividir } from './operaciones.mjs'
import * as Chai from 'chai'

Chai.should()

describe("archivo de operaciones.js", () => {

  describe("función sumar", () => {

    it("si sumas 1 y 2 el resultado es 3", () => {
      const resultado = sumar(1, 2)
      resultado.should.equal(3)
    })

    it("si sumas 5 y 4 el resultado es 9", () => {
      const resultado = sumar(5, 4) == 9
      resultado.should.be.true
    })

  })

  describe("función dividir", () => {

    it("si divides 10 y 5 el resultado es 2", () => {
      const resultado = dividir(10, 5)
      resultado.should.equal(2)
    })

    it("si divides algo por 0 tiene que dar un error", () => {
      (
        () => dividir(9, 0)
      ).should.throw(Error, 'No se puede dividir por 0')
    })

  })

})
