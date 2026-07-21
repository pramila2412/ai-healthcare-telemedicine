const initialState = {
  role: localStorage.getItem('userRole') || null,  
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return { ...state, role: action.payload };
    default:
      return state;
  }
}