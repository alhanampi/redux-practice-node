const redux = require("redux");
const createStore = redux.createStore;
//para combinar reducers:
const combineReducers = redux.combineReducers

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "action in redux"
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "action ice"
  };
}

//puedo pasar cada initial state por separado
const initialCakeState = {
  numOfCakes: 10
};

const initialIceCreamState = {
  numOfIceCream: 20
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: {
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1
      };
    }
    default:
      return state;
  }
};

//combinar reducers: 
const rootReducer = combineReducers({
	cake: cakeReducer, 
	iceCream: iceCreamReducer
})

const store = createStore(rootReducer); //el store acepta un parámetro solamente, por eso los combino

console.log("initial state: ", store.getState());
const unsusbscribe = store.subscribe(() =>
  console.log("updated state: ", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsusbscribe();
