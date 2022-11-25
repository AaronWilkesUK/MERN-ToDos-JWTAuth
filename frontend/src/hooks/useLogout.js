import { useAuthContext } from "./useAuthContext"
import { useTodosContext } from "./useTodosContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: todosDispatch} = useTodosContext()

    const logout = () => {
        
        // remove user from local storage
        localStorage.removeItem('user')
        
        //dispatch logout action
        dispatch({type: 'LOGOUT'})

        //dispatch todo set null action
        todosDispatch({type: 'SET_TODOS', payload: null})
    }

    return {logout}
}