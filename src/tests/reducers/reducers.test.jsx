var expect  = require("expect");
var df = require('deep-freeze-strict')

var reducers = require("reducers");

describe("Reducers", () => {
  describe("searchTextReducer", () => {
    it("should set searchText", () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: "test search text"
      };
      var res = reducers.searchTextReducer(df(''), df(action))
      expect(res).toEqual(action.searchText);
    });
  });
  describe("showCompletedReducer", () => {
    it("should toggle showCompleted", () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action))
      expect(res).toEqual(true);
    });
  });
  describe("todosReducer", () => {
    it("should add new todo", () => {
      var action = {
        type: 'ADD_TODO',
        text: 'new todo text'
      }
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });
    it("should update todo completed", () => {
      var todosArray = [
        {
          id: 1,
          text: "test text 1",
          completed: false,
          createdAt: 183813813,
          completedAt: undefined
        },
        {
          id: 2,
					text: "Test text 2",
					completed: true,
					createdAt: 183813813,
					completedAt: 131134
        }
      ]
      var action1 = {
        type: 'TOGGLE_TODO',
        id: 1
      }
      var action2 = {
        type: 'TOGGLE_TODO',
        id: 2
      }
      var res1 = reducers.todosReducer(df(todosArray), df(action1));
      var res2 = reducers.todosReducer(df(todosArray), df(action2));
      //checks toggel from false to true
      expect(res1[0].completed).toEqual(true);
      expect(res1[0].completedAt).toBeA('number');
      //checks toggle from true to false
      expect(res2[1].completed).toEqual(false);
      expect(res2[1].completedAt).toEqual(undefined);
    });
    it("should add existing todos", () => {
      var todos = [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      var action = {
        type: "ADD_TODOS",
        todos
      };
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
