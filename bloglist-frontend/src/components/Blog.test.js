import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test User',
    url: 'Test Url',
    likes: 666,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User'
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
      <Blog blog={blog} user={user} />
    )

    const button = component.container.querySelector('.viewMore')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).toHaveTextContent(
      'Test Blog'
    )
    expect(component.container).toHaveTextContent(
      'Test Url'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )

  })

  test('if like is pressed twice, addLike is called twice', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const viewMorebutton = component.container.querySelector('.viewMore')
    fireEvent.click(viewMorebutton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})