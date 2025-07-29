// // Authentication utility functions

// // Get token from localStorage
// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// // Set token in localStorage
// export const setToken = (token) => {
//   localStorage.setItem('token', token);
// };

// // Remove token from localStorage
// export const removeToken = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userEmail');
// };

// // Check if user is authenticated
// export const isAuthenticated = () => {
//   const token = getToken();
//   return !!token;
// };

// // Get user email from localStorage
// export const getUserEmail = () => {
//   return localStorage.getItem('userEmail');
// };

// // Verify token with backend
// export const verifyToken = async () => {
//   const token = getToken();
//   if (!token) return false;

//   try {
//     const response = await fetch('http://localhost:8000/api/users/verify', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     return response.ok;
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return false;
//   }
// };

// export const logout = () => {
//   removeToken();
//   window.location.href = '/login';
// }; 