var lodash = require("lodash");
var store;

function getInstance() {
    if (!store) store = createStore();
    return store;
}

function createStore() {
    var currentState = {};
    var currentReducer = function(action, state) {
        return state;
    }

    var currentReducerSet = {};

    function addReducers(reducers) {
        currentReducerSet = Object.assign(currentReducerSet, reducers);
        currentReducer = function(action, state) {
            var cumulativeState = {};
            for (key in currentReducerSet) {
                cumulativeState[key] = currentReducerSet[key](action, state[key]);
            }

            return cumulativeState;
        }
    }

    function getState() {
        return lodash.cloneDeep(currentState);
    }

    var subscribers = [];

    function subscribe(fn) {
        subscribers.push(fn);
    }

    function unsubscribe(fn) {
        subscribers.splice(subscribers.indexOf(fn), 1);
    }

    function dispatch(action) {
        var prevState = currentState;
        currentState = currentReducer(action, lodash.cloneDeep(currentState));
        subscribers.forEach(function(subscriber) {
            subscriber(currentState, prevState);
        });
    }

    return {
        addReducers: addReducers,
        dispatch: dispatch,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        getState: getState
    };
}

module.exports = getInstance;
