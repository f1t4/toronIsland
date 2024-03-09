// action 타입 정의 == 동작을 시키기 위한 type 정의 
const ADD_POST = 'action/ADD_POST';

// action creator
// state 업데이트 하는 역할 = 액션 
const addPost = (board_id, currentstate, board_create, content, ) => {
    return{
        type: ADD_POST,
        // payload: ADD_POST 액션에 대한 추가적인 데이터(정보)
        payload: {
            board_id,
            content,
            currentstate,
            board_create
        }
    }
}

// 초기 상태 정의 
const initState = {
    posts:[
        {board_id:1,state:1,board_create:"2024-03-03T07:14:00.000Z",board_content:"대학원생 , vs , 대학교 10년"},
        
    ]
}

// 현재 상태와 액션을 받아와 새로운 상태를 반환 
function presetPostReducer(state = initState, action){
    switch(action.type){
        case 'action/ADD_POST':
            return{
                ...state, 
                posts: [
                    ...state.posts,
                    {board_id: action.payload.board_id,
                    content: action.payload.content,
                    }
                ]

            };
        default:
            return state;
    }
}

module.exports = { addPost, presetPostReducer };