//se debe instalar axios y redux-thunk

const redux = require('redux')
const createStore = redux.createStore 
const applyMiddleware = redux.applyMiddleware

const axios = require('axios')
const reduxThunk = require('redux-thunk').default

//state:
const initialState = {
  loading: false,
  users: [],
  error: ""
};

//actions:
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//action creators:
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
  }
};

//async action creator. Todo action creator retorna un action. Thunk permite retornar una función en vez de solo una accion:
const fetchUsers = () => {
	//no es necesario que sea una función pura, puede tener side effects como llamadas a API:
	return function(dispatch) {
		dispatch(fetchUsersRequest()) //esto va a poner loading en true
		axios.get('https://jsonplaceholder.typicode.com/users')
		.then(response => {
			//res.data va a ser una array of users
			const users = response.data.map(user => user.id)
			dispatch(fetchUsersSuccess(users))
			//hago dispatch de la lista que recibí
		})
		.catch(error => {
			//error.message:
			dispatch(fetchUsersFailure(error.message))
		})
	}
}

//store:
const store = createStore(reducer, applyMiddleware(reduxThunk))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())