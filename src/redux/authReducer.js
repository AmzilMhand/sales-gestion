const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  role: localStorage.getItem('role') || null,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('role', action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
        error: null
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      return {
        isAuthenticated: false,
        user: null,
        role: null,
        error: null
      };
    default:
      return state;
  }
};

export const loginSuccess = (user, role) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, role }
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});

export const logout = () => ({
  type: 'LOGOUT'
});

