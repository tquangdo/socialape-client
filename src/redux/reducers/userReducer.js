import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ } from '../types'
import { hienMsg } from '../../utils/ToastHelper'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload,
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notifi => notifi.read = true)
            return {
                ...state,
            }
        case LIKE_SCREAM:
            hienMsg('Đã like!')
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId,
                    }
                ]
            }
        case UNLIKE_SCREAM:
            hienMsg('Đã unlike!')
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.screamId !== action.payload.screamId
                )
            }
        default:
            return state
    }
}

export default userReducer