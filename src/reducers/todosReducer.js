const initialState = []

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

export default function todosReducer(state = initialState, action) {
    switch(action.type) {
        case 'todo/todoAdded': {
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    value: action.payload,
                    completed: false
                }
            ]
        }
        case 'todo/todoToggled': {
            return state.map((todo) => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed 
                }
            })
        }
        case 'todo/todoDeleted': {
            return state.filter((todo) => todo.id !== action.payload)
        }
        case 'todo/todoChanged': {

            return state.map((todo) => {
                if(todo.id !== action.payload.id){
                    return todo
                }

                return {
                    ...todo,
                    id: action.payload.id,
                    value: action.payload.value,
                    completed: action.payload.completed
                }
            })
        }
        default: 
            return state
    }
}