import { createStore } from './createStore';

// Define the store state type
interface CounterState {
  count: number;
}

// Initial state
const initialState: CounterState = {
  count: 0,
};

// Create the counter store
export const counterStore = createStore(initialState);

// Define actions to update the store
export const counterActions = {
  increment: () => {
    const currentState = counterStore.getState();
    counterStore.setState({
      count: currentState.count + 1,
    });
  },
  
  decrement: () => {
    const currentState = counterStore.getState();
    counterStore.setState({
      count: currentState.count - 1,
    });
  },
  
  reset: () => {
    counterStore.setState(initialState);
  },
  
  setCount: (newCount: number) => {
    counterStore.setState({
      count: newCount,
    });
  },
};
