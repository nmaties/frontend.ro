export const STORE_USER_DETAILS = 'STORE_USER_DETAILS';
export const storeUserDetails = (userDetails) => ({
  type: STORE_USER_DETAILS,
  userDetails,
});
