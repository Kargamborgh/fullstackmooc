import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test User',
    url: 'Test Url',
    likes: 666
  }

  test('renders title and author by default', () => {

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).not.toHaveTextContent(
      'Test Url'
    )
    expect(component.container).not.toHaveValue(
      666
    )
  })

  test('renders title, author, url and likes when view button is pressed', () => {

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.container.querySelector('viewMore')

    component.debug()

    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).toHaveTextContent(
      'Test Url'
    )
    expect(component.container).toHaveValue(
      666
    )

  })
})