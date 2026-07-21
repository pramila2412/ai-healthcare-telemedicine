export const SET_USER_ROLE = 'SET_USER_ROLE';

// state-management/modules/auth/authActions.js
export const setUserRole = (role) => {
  localStorage.setItem('userRole', role);   // 🔑 persist
  return { type: SET_USER_ROLE, payload: role };
};