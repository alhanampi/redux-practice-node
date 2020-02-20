const redux = require('redux')
const createStore = redux.createStore

//action: describen lo que pasa, pero no cómo afecta al estado de la app
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"

//action creator, se devuelve el objeto de la accion dentro de una funcion:
function buyCake() {
  //lo único obligatorio en el objeto es el type
  return {
    type: BUY_CAKE,
    info: "action in redux"
  }
}

function buyIcecream() {
	return{
		type: BUY_ICECREAM,
		info: "action ice"
	}
}

//reducers: funciones que toman esatdo y accion como argumento y retorna el sig estado de la app. Requiere dos argumentos (esatdo previo y accion) y retorna un estado nuevo
const initialState = {
	numOfCakes: 10,
	numOfIceCream: 5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //primero copio el state, luego recién hago la mutación
        numOfCakes: state.numOfCakes - 1
			};
			case BUY_ICECREAM: {
				return {
					...state,
					numOfIceCream: state.numOfIceCream -1
				}
			}
    default:
      return state;
  }
};

//store:hay un solo store para toda la app. Mantiene el estado de la app, expone un método llamado getState() para acceder al estado. Permite actualizar estado mediante dispatch(action). Registra listeners con subscribe(listener)
const store = createStore(reducer) //el store acepta un parámetro, el reducer, que tiene el estado inicial de la app

console.log('initial state: ', store.getState())
const unsusbscribe = store.subscribe(()=> console.log('updated state: ', store.getState()))
//en el dispatch se invoca al action creator que va a retornar al accion
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyCake())
store.dispatch(buyIcecream())

unsusbscribe()