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

import Catalog from "./Catalog";
import * as ReactDom from "react-dom"
import * as reduxHooks from "react-redux"
import { render, screen } from '@testing-library/react';


describe('catalog', () => {
  let container: HTMLElement

  beforeAll(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDom.render(<Catalog />, container)
  })

  afterAll(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('inputs to filtering something', () => {
    const inputs = container.querySelectorAll('input')
    expect(inputs).toHaveLength(3)
  })

  it('pagination numbers', () => {
    container.querySelectorAll('.page__items').forEach(item => {
      expect(item).toBeInTheDocument()
    })
  })

  
})