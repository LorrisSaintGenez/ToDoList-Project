import { createStore, combineReducers } from 'redux';

const initialLoginState = {
  token: null,
  userid: null
};

const initialBoardState = {
  personal: [],
  shared: []
};

const loginReducer = (state = initialLoginState, action) => {
  if (action.type === 'LOGIN_ACT') {
    return Object.assign({}, state, { token: action.auth.token, userid: action.auth.userid });
  }
  if (action.type === 'LOGOUT_ACT') {
    return Object.assign({}, state, { token: initialLoginState.token, userid: initialLoginState.userid });
  }
  return state;
};


const boardReducer = (state = initialBoardState, action) => {
  if (action.type === 'LOAD_BOARDS') {
    return Object.assign({}, state, {personal: action.board.personal, shared: action.board.shared});
  }
  if (action.type === 'UNLOAD_BOARDS') {
    return Object.assign({}, state, {personal: initialBoardState.personal, shared: initialBoardState.shared});
  }
  return state;
};

const reducers = combineReducers({
  loginState: loginReducer,
  boardState: boardReducer
});

const store = createStore(reducers);

export default store;