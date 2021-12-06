import { createStore } from "redux";

const store = createStore((state = {test: 0}, action) => {
    switch(action.type){
        case 'INCREMENT': 
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
        return {
            test: incrementBy
        };
        case 'DECREMENT':
            return {
                test: state.test - 2
        }
    }
})


store.dispatch({
    type: 'INCREMENT',
    incrementBy: 6

})

store.dispatch({
    type: 'DECREMENT'
})

export default store;