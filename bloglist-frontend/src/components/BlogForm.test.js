import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls props callback with data on submit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('.addBlogForm')

  fireEvent.change(titleInput, {
    target: { value: 'Test Blog' }
  })

  console.log(titleInput.value)

  fireEvent.change(authorInput, {
    target: { value: 'Test Author' }
  })

  console.log(authorInput.value)

  fireEvent.change(urlInput, {
    target: { value: 'Test Url' }
  })

  console.log(urlInput.value)

  fireEvent.submit(form)

  //console.log(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
})