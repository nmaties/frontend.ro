import { combineReducers } from 'redux';
import profile from './reducers/profile';

const rootReducer = combineReducers({
  profile,
});

export default rootReducer;
