import axios from 'axios'
import { ADD_TO_CALL_CART, REMOVE_ITEM_CALL_CART, SAVE_BOOk_LOAN_INFO } from '../actionsTypes'


const addItemToCallCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/book/auth/${id}`)

    dispatch({
        type: ADD_TO_CALL_CART,
        payload: {
            _id: data.book._id,
            book_name: data.book.book_name,
            unitPrice: data.book.unitPrice,
            book_img: data.book.book_img[0].url,
            book: data.book._id,
            stock: data.book.stock,
            quantity,
        }
    })

    localStorage.setItem('callCardItems', JSON.stringify(getState().cart.callCardItems));

}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CALL_CART,
        payload: id
    })

    localStorage.setItem('callCardItems', JSON.stringify(getState().cart.callCardItems))

}

export const saveLoanInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_BOOk_LOAN_INFO,
        payload: data
    })

    localStorage.setItem('loanInfo', JSON.stringify(data))

}

export { addItemToCallCart };