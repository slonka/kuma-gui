import { screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import renderWithVuex from '@/testUtils/renderWithVuex'
import AddNewServices from './AddNewServices.vue'

describe('AddNewServices.vue', () => {
  it('renders snapshot', () => {
    const { container } = renderWithVuex(AddNewServices)

    expect(container).toMatchSnapshot()
  })

  it('changes selected box', async () => {
    renderWithVuex(AddNewServices)

    const demoRadio = screen.getAllByTestId('box')[0]
    const manuallyRadio = screen.getAllByTestId('box')[1]

    expect(demoRadio.className).toMatch('box--active')
    expect(manuallyRadio.className).not.toMatch('box--active')

    await userEvent.click(screen.getByText(/After this wizard/))

    expect(demoRadio.className).not.toMatch('box--active')

    expect(manuallyRadio.className).toMatch('box--active')
  })
})
