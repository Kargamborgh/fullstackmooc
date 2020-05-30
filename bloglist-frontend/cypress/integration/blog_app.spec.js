/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Mikki Hiiri',
        username: 'mhiiri',
        password: 'salakala'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').click()
      cy.contains('username')
      cy.contains('password')
    })

    describe('Login', function() {

        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mhiiri')
            cy.get('#password').type('salakala')
            cy.get('#login-button').click()
        
            cy.contains('Mikki Hiiri logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mhiiri')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            cy.get('.error')
            .should('contain', 'wrong credentials')

            cy.get('html').should('not.contain', 'Mikki Hiiri logged in')
        })
    })
  })