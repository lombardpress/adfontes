var expect = require('expect');

var TodoAPI = require("TodoAPI");

describe("TodoAPI", () => {
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
  });
});
