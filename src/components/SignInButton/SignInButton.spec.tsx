import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SingInButton } from '.'

jest.mock('next-auth/client')


describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValue([null, false])

    render(
      <SingInButton />
    )

    expect(screen.getByText('Sign In with GitHub')).toBeInTheDocument()

  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValue([
      {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        expires: 'fake-expire'
      },
      false
    ])

    render(
      <SingInButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()

  })
})