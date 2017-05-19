const initialLoginState = {
  token: null
};

const loginReducer = (state = initialLoginState, action) => {
  if (action.type === 'LOGIN_ACT') {
    return Object.assign({}, state, { token: action.token });
  }
  // SAME RETURN - CREATED IN CASE OTHER ACTION NEEDED FOR LOGOUT
  if (action.type === 'LOGOUT_ACT') {
    return Object.assign({}, state, { token: action.token });
  }
  return state;
};

export default loginReducer;