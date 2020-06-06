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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mhiiri', password: 'salakala' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('cypress test blog')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress_url.com')
            cy.contains('create').click()
            cy.contains('cypress test blog')
        })

        it('A created blog can be liked', function () {

            // dirty copy & paste

            cy.contains('new blog').click()
            cy.get('#title').type('cypress test blog')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress_url.com')
            
            cy.contains('create').click()
            cy.contains('cypress test blog')

            cy.contains('view more').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'blog 1', author: 'cypress', url: 'cypress.com', likes: 0})
            })

            it('that blog can be deleted', function() {
                cy.contains('view more').click()
                cy.contains('remove').click()

                const stub = cy.stub()
                
                cy.on('window:alert', stub)

                cy.get('html').should('contain', 'blog 1 removed successfully')
            })
        })

        describe('and several blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'blog 1', author: 'cypress', url: 'cypress.com', likes: 100})
                cy.createBlog({ title: 'blog 2', author: 'cypress', url: 'cypress.com', likes: 200})
                cy.createBlog({ title: 'blog 3', author: 'cypress', url: 'cypress.com', likes: 300})
            })

            it('blogs are sorted by likes', function() {
                cy.contains('view more').click()
                cy.contains('view more').click()
                cy.contains('view more').click()

                cy.get('[data-testid=likes]').then(($likes) => {
                    expect($likes[0].innerText).to.eq('likes: 300like')
                    expect($likes[1].innerText).to.eq('likes: 200like')
                    expect($likes[2].innerText).to.eq('likes: 100like')
                })
            })
        })
    })
  })