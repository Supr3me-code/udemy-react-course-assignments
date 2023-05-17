import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, actions) => {
  if (actions.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
    };
  }
  if (actions.type === "DECREMENT") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
