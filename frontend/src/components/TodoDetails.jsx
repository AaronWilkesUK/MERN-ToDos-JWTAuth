import ReactTooltip from "react-tooltip";
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TodoDetails = ({todo}) => {
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {
        if(!user) {
            return
        }
        const response =  await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    const handleComplete = async () => {
        if(!user) {
            return
        }
        todo.completed = true
        const response =  await fetch('/api/todos/' + todo._id, {
            method: 'PATCH',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'UPDATE_TODO', payload: json})
        }
    }

    return (
        <>
            <div className="todo-details">
                <h4 className={todo.completed ? "strike" : ""}>{todo.description}</h4>
                <p><strong>Completed: </strong> {todo.completed ? "Yes" : "No"} </p>
                <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
                {!todo.completed && <span data-tip data-for="completeTooltip" className="material-symbols-outlined check" onClick={handleComplete}>check</span>}
                <span data-tip data-for="deleteTooltip" className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
            </div>
            <ReactTooltip id="deleteTooltip" place="top" effect="solid">
                Delete this todo
            </ReactTooltip>
            <ReactTooltip id="completeTooltip" place="top" effect="solid">
                Mark this todo as completed
            </ReactTooltip>
        </>
    )
}

export default TodoDetails