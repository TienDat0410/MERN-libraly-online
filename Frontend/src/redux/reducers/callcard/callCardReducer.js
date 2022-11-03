const { ADD_TO_CALL_CART, REMOVE_ITEM_CALL_CART, SAVE_BOOk_LOAN_INFO } = require("../../actions/actionsTypes");

const callCardReducer = (state = { callCardItems: [], loanInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CALL_CART:
            const item = action.payload;

            const isItemExist = state.callCardItems.find(i => i.book === item.book)

            if (isItemExist) {
                return {
                    ...state,
                    callCardItems: state.callCardItems.map(i => i.book === isItemExist.book ? item : i)
                }
            } else {
                return {
                    ...state,
                    callCardItems: [...state.callCardItems, item]
                }
            }

        case REMOVE_ITEM_CALL_CART:
            return {
                ...state,
                callCardItems: state.callCardItems.filter(i => i.book !== action.payload)
            }


        case SAVE_BOOk_LOAN_INFO:
            return {
                ...state,
                loanInfo: action.payload
            }


        default:
            return state
    }
}

export { callCardReducer };