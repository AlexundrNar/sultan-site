const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux") as any,
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

import Header from './Header';
import * as ReactDom from "react-dom"
import * as reduxHooks from "react-redux"
import { fireEvent, render, screen } from '@testing-library/react';


describe('header', () => {
  let container: HTMLElement

  beforeAll(() => {
    container = document.createElement('header')
    document.body.appendChild(container)
    ReactDom.render(<Header />, container)
  })

  afterAll(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('render header', () => {
    const component = render(<Header />)
    expect(component).toMatchSnapshot()
  })

  it('inputs in header', () => {
    const inputs = container.querySelectorAll('input')
    expect(inputs).toHaveLength(1)
  })

  it('admin btn check', () => {
    const adminBtn = screen.getByText(/АДМИН-ПАНЕЛЬ/i)
    expect(adminBtn).toBeInTheDocument()
  })

  it('admin btn click', () => {
    const adminBtn = screen.getByText(/АДМИН-ПАНЕЛЬ/i)
    fireEvent.click(adminBtn)
    expect(mockedUsedNavigate).toHaveBeenCalled()
  })

  it('admin btn check', () => {
    const qnty = screen.getByTestId('количество')
    const amount = screen.getByTestId('сумма')

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(qnty)
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(amount)
    
    expect(qnty).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
  })

})