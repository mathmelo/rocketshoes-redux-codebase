import { combineReducers } from 'redux';

import cart from './cart/reducer';

const reducer = combineReducers({
  cart,
});

export default reducer;
