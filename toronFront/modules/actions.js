// action 타입 정의 == 동작을 시키기 위한 type 정의 
const ADD_POST = 'action/ADD_POST';

// action creator
// state 업데이트 하는 역할 = 액션 
const addPost = (board_id, currentstate, board_create, content, ) => {
    return{
        type: ADD_POST,
        payload: {
            board_id,
            content,
            currentstate,
            board_create
        }
    }
}

// 초기 상태 정의 (초기 값: '')
const initState = {
    board_id: '',
    content: '',
    currentstate: 1,
    board_create: ''
}

// 현재 상태와 액션을 받아와 새로운 상태를 반환 
function presetPostReducer(state = initState, action){
    switch(action.type){
        case 'action/ADD_POST':
            return{...state, 
                board_id: action.payload.board_id,
                content: action.payload.content,
                currentstate: action.payload.currentstate,
                board_create: action.payload.board_create
            };
        default:
            return state;
    }
}

module.exports = { addPost, presetPostReducer };