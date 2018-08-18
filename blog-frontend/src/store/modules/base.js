import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const INITALIZE_LOGIN_MODAL = 'base/INITAILIZE_LOGIN_MODAL';

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const checkLogin = createAction(CHECK_LOGIN);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const initailizeLoginModal = createAction(INITALIZE_LOGIN_MODAL);

const initialState = Map({
  modal: Map({
    remove: false,
    login: false
  }),
  loginModal: Map({
    password: '',
    error: false
  }),
  logged: false
});

export default handleActions({
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;

    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;

    return state.setIn(['modal', modalName], false);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      return state.set('logged', true);
    },
    onError: (state, action) => {
      return state.setIn(['loginModal', 'error'], true)
                  .setIn(['loginModal', 'password'], '');
    }
  }),
  ...pender({
    type: CHECK_LOGIN,
    onSuccess: (state, action) => {
      const { logged } = action.payload.data;
      return state.set('logged', logged);
    }
  }),
  [CHANGE_PASSWORD_INPUT]: (state, action) => {
    const { payload: value } = action;

    return state.setIn(['loginModal', 'password'], value);
  },
  [INITALIZE_LOGIN_MODAL]: (state, action) => {
    return state.setIn(['loginModal'], initialState.get('loginModal'));
  }
}, initialState);