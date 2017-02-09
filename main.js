var getInstance = require("./store.js");
var reducers = require("./reducers.js");


var store = getInstance();

store.addReducers(reducers);
var dispatch = store.dispatch;

var view = {
    num: 0,
    text: "",
};

function connect(view) {
    store.subscribe(function monitorNum(current, prev) {
        current = current["calcReducer"];
        prev = prev["calcReducer"];
        if (current != prev) {
            view.num = current;
        }
    });
    store.subscribe(function monitorText(current, prev) {
        current = current["appendTextReducer"];
        prev = prev["appendTextReducer"];
        if (current != prev) {
            view.text = current;
        }
    });
}
connect(view);

console.log(view);
dispatch({type: "PLUS"});
console.log(view);
dispatch({type: "MINUS"});
console.log(view);
dispatch({type: "APPEND", text: "foo"});
console.log(view);
dispatch({type: "PLUS"});
dispatch({type: "PLUS"});
dispatch({type: "PLUS"});
console.log(view);
