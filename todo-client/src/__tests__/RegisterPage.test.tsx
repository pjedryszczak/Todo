import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import RegisterPage from '../components/RegisterPage';
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
   const event = {
       preventDefault: () => {}
   } as React.FormEvent<HTMLFormElement>;
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
            <RegisterPage />
        </Provider>
        </StaticRouter>);
    });

    it('it renders with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('register action on submit', () => {
        
        renderer.act(() => {
            component.root.findByType('form').props.onSubmit(event);
          });
          //inputs are empty
        expect(store.dispatch).toHaveBeenCalledTimes(0);        
      });
  });