import {
  STORE_USER_DETAILS,
} from '../actions/profile';

const initialState = {
  isGettingUser: true,
  userDetails: {},
  userProgress: {},
};

export default (state = initialState, action) => {
  const actions = {
    [STORE_USER_DETAILS]: () => ({
      ...state,
      userDetails: action.userDetails,
      isGettingUser: false,
    }),
    DEFAULT: () => state,
  };

  return actions[action.type] ? actions[action.type]() : actions.DEFAULT();
};
