import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { User } from '../models';

const mockStore = configureStore([]);
describe('Navbar', () => {
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
        loggedIn: true,
        user: user
      });
      store.dispatch = jest.fn();

      component = renderer.create(
        <Provider store={store}>
            <Navbar />
        </Provider>);
    });

    it('it renders with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
  });