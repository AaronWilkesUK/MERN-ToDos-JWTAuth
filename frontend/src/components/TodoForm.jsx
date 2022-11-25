import { useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TodoForm = () => {
    const { dispatch } = useTodosContext()
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user) {
            setError('You must be logged in')
            return
        }
        const todo = {description, completed}
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else if(response.ok) {
            setError(null)
            setEmptyFields([])
            setDescription('')
            setCompleted(false)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Todo</h3>
            <label>Description:</label>
            <input type="text" className={emptyFields.includes('description') ? 'error' : ''} onChange={(e) => setDescription(e.target.value)} value={description} />
            <label>Completed:</label>
            <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
            <button>Add Todo</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoForm