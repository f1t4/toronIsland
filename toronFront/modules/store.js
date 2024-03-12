// reducer 묶기 위해 import 
import { combineReducers } from 'redux';
// redux 정의 라이브러리 (아마도)
import { configureStore } from '@reduxjs/toolkit';
import { presetPostReducer } from './actions';


const rootReducer = combineReducers({
    posts: presetPostReducer
    // 일단 하나
});
const store = configureStore({ reducer: rootReducer });

// console.log(store.getState().posts.posts[0].board_content);
// console.log(store.getState().posts);


export default store;
