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

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')

import Admin from "./Admin";
import * as ReactDom from "react-dom"
import * as reduxHooks from "react-redux"
import * as actions from "../store/reducers/AdminSlice"
import { fireEvent, render, screen } from '@testing-library/react';


describe('catalog', () => {
  it('inputs to set values', () => {
    render(<Admin />)
    screen.queryAllByRole('input').forEach(item => {
      expect(item).toContainHTML('')
    })
  })

  it('delete item', () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)
    const mockedDelete = jest.spyOn(actions.adminActions, 'deleteItem')
    
    const {container} = render(<Admin />)
    container.querySelectorAll('.btn__danger').forEach(item => {
      fireEvent.click(item)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(mockedDelete).toHaveBeenCalledWith('good')
    })
  })

  it('items in localstorage', () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(<Admin />)
    screen.queryAllByRole('input').forEach(item => {
      expect(item).toContainHTML('')
      fireEvent.input(item, {
        target: {value: 'abc123'}
      })
      expect(item).toContainHTML('abc123')
      fireEvent.click(screen.getByTestId('btn_change'))
      expect(localStorage).toMatchObject('adminItems')
    })
  })
})
  