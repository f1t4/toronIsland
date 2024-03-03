// reducer 묶기 위해 import 
import { combineReducers } from 'redux';
// redux 정의 라이브러리 (아마도)
import { configureStore } from '@reduxjs/toolkit';
import { presetPostReducer } from './actions';

// 내가 작성해 둔 action & redux
import actions from './actions';

const rootReducer = combineReducers({
    actions: presetPostReducer
    // 일단 하나
});
const store = configureStore({ reducer: rootReducer });

console.log(store.getState().actions.posts);

export default store;
