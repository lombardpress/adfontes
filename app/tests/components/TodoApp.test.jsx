var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe("TodoApp", () => {
	it("should exist", () => {
		expect(TodoApp).toExist();
	});

	it("should add todo to the todos state on handleAddTodo", () => {
		var todoText =  "walk wendell"
		var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
		todoApp.setState({todos: []});
		todoApp.handleAddTodo(todoText);
		expect(todoApp.state.todos[0].text).toBe(todoText);
		expect(todoApp.state.todos[0].createdAt).toBeA('number')
	});


	it("should toggle completed value when handleToggle called", () => {
		var todoData = {
			id: 11,
			text: "Test features",
			completed: false,
			createdAt: 0,
			completedAt: undefined
		};
		var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
		todoApp.setState({todos: [todoData]});
		var startValue = todoApp.state.todos[0].completed;
		todoApp.handleToggle(11);
		expect(todoApp.state.todos[0].completed).toBe(!startValue);
		expect(todoApp.state.todos[0].completedAt).toBeA('number');
	});

	it("should remove completedAt when toggled from true to false", () => {
		var todoData = {
			id: 11,
			text: "Test features",
			completed: true,
			createdAt: 0,
			completedAt: 1
		};
		var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
		todoApp.setState({todos: [todoData]});
		todoApp.handleToggle(11);
		expect(todoApp.state.todos[0].completedAt).toBe(undefined);
	});

	// test that toggle from true to faluse, completed at gets removed

});
