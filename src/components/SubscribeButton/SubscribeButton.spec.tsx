import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')



describe('SignInButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(<SubscribeButton />)

    expect(screen.getByText('subscribe now')).toBeInTheDocument()

  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()

  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        activeSubscription: 'fake-subscription',
        expires: 'fake-expire'
      },
      false
    ])

    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalled()

  })
})