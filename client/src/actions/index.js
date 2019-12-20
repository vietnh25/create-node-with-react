import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

/* 
    We could do just like this but we're going to
    handle the dispatch function manually

    - the dispatch function is called after the 
    action is produced and before the new state
    is set at the store

const fetchUser = () => {
    const request = axios.get('/api/current_user')

    return {
        type: FETCH_USER,
        payload: request
    }    
}
*/
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)

  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)

  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')

  dispatch({ type: FETCH_SURVEYS, payload: res.data })
}