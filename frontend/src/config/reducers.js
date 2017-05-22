const initialLoginState = {
  token: null,
  userid: null
};

const loginReducer = (state = initialLoginState, action) => {
  if (action.type === 'LOGIN_ACT') {
    return Object.assign({}, state, { token: action.auth.token, userid: action.auth.userid });
  }
  // SAME RETURN - CREATED IN CASE OTHER ACTION NEEDED FOR LOGOUT
  if (action.type === 'LOGOUT_ACT') {
    return Object.assign({}, state, { token: null, userid: null });
  }
  return state;
};

export default loginReducer;