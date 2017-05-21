var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
	render: function(){
		var {todos} = this.props
		if (todos.length === 0){
			return(
				<div>
					<p className="container__message">Nothing to do!</p>
				</div>

			);
		}
		var renderTodos = () => {
			return todos.map( (todo) => {
				return (
					<Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
				);
			});
		};
		return(
			<div>
				{renderTodos()}
			</div>
		)
	}
});

module.exports = TodoList;
