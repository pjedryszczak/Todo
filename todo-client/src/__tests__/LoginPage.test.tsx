import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { clearUser } from './../store/actions'

import LoginPage from '../components/LoginPage';
import { Provider } from 'react-redux';
import { User } from '../models';
import { StaticRouter } from 'react-router-dom';

const mockStore = configureStore([]);
describe('LoginPage', () => {
    let store: any;
    let component: renderer.ReactTestRenderer; 
   const user: User ={
    firstName: 'TestName',
    id: 0,
    username: 'testname',
    token: ''
   }
    beforeEach(() => {
      store = mockStore({
        loggedIn: false,
        user: user,
        loading: false
      });
      store.dispatch = jest.fn();

      component = renderer.create(
          <StaticRouter>
        <Provider store={store}>
            <LoginPage />
        </Provider>
        </StaticRouter>);
    });

    it('it renders with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('clear action on mount', () => {
             
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            clearUser()
        );
      });
  });