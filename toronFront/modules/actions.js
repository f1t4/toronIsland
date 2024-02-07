// action
const ADD_POST = 'action/ADD_POST';

// action creator
export const addPost = (postId, content) => {
    return{
        type: ADD_POST,
        payload: {
            postId,
            content
        }
    }
}

// Reducer: 초기 상태 정의 
const initState = {
    postId: '',
    content: '',
}

// 현재 상태와 액션을 받아와 새로운 상태를 반환 
export default function presetPostReducer(state = initState, action){
    switch(action.type){
        case 'action/ADD_POST':
            return{...state, 
                postId: action.payload.postId,
                content: action.payload.content
            };
        default:
            return state;
    }
}