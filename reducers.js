module.exports = {
    calcReducer: function(action, state = 0) {
        if (action.type == "PLUS") {
            return state + 1;
        } else if (action.type == "MINUS") {
            return state - 1;
        }

        return state;
    },
    appendTextReducer: function(action, state = '') {
        if (action.type == "APPEND") {
            return state + action.text;
        }

        return state;
    }
};
