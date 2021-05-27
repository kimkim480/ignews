import { screen, render } from '@testing-library/react'
import Home from '../../pages'

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(<Home product={{priceId: 'fake-price-id', amount: '$10.00'}} />)

    expect(screen.getByText('for $10.00 month')).toBeInTheDocument()
  })
})