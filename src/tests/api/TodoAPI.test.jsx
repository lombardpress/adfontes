var expect = require('expect');

var TodoAPI = require("TodoAPI");

describe("TodoAPI", () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });
  it("should exist", () => {
    expect(TodoAPI).toExist();
  });
  describe('setTodos', () =>{
    it("should set valid todos array", () => {
      var todos = [{
        id: "23",
        test: "test all files",
        completed: false
      }];
      TodoAPI.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem("todos"));
      expect(actualTodos).toEqual(todos);
    });
    it("should not set ivalid todos array", () => {
      var badTodos = {a: 'b'}
      TodoAPI.setTodos(badTodos);
      expect(localStorage.getItem("todos")).toBe(null);

    });
  });
  describe('getTodos', () => {
    it("should return empty array for bad local storage data", () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });
    it("should return todos if valid array in local storage", () => {
      var todos = [{
        id: "23",
        test: "test all files",
        completed: false
      }];

      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });
  describe("filterTodos", () => {
    var todos = [{
      id: "1",
      text: "Some text here",
      completed: true
    },
    {
      id: "2",
      text: "other text here",
      completed: false
    },
    {
      id: "3",
      text: "other text here",
      completed: true
    }];
    it("should return all items if showCompleted is true", () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, "");
      expect(filteredTodos.length).toBe(3);
    });
    it("should return only items that haven't been completed when showCompleted is false", () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, "");
      expect(filteredTodos.length).toBe(1);
    });
    it("should return sort by completed states", () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, "");
      expect(filteredTodos[0].completed).toBe(false);
    });
    it("should return all todos when search text is empty", () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, "");
      expect(filteredTodos.length).toBe(3);
    });
    it("should return todo that matches searchText string", () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, "some");
      expect(filteredTodos.length).toBe(1);
    });
  });
});
