const initialState = []

function nextItemId(itemList) {
    const maxId = itemList.reduce((maxId, item) => Math.max(item.id, maxId), -1)
    return maxId + 1
}

export default function itemListReducer(state = initialState, action) {
    switch(action.type) {
        case 'item/itemAdded': {
            return [
                ...state,
                {
                    id: nextItemId(state),
                    value: action.payload,
                    completed: false
                }
            ]
        }
        case 'item/itemToggled': {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item
                }

                return {
                    ...item,
                    completed: !item.completed 
                }
            })
        }
        case 'item/itemDeleted': {
            return state.filter((item) => item.id !== action.payload)
        }
        case 'item/itemChanged': {

            return state.map((item) => {
                if(item.id !== action.payload.id){
                    return item
                }

                return {
                    ...item,
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