import { configureStore } from '@reduxjs/tookit';
import actions from './actions';

// 기능별 파일을 불러와서 rootReducer에 컴바인 해서 사용,,,
// 어렵


const rootReducer = combineReducers({

});
const store = configureStore({reducer: actions});
export default store;