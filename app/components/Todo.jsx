var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
	render: function(){
		var {id, text, completed, createdAt, completedAt} = this.props;
		var renderDate = () => {
			var message = "Created ";
			var timestamp = createdAt;
			if (completedAt){
				message = "Completed at ";
				var timestamp = completedAt;
			}
			return message + moment.unix(timestamp).format("MMMM Do YYYY @ h:mm a");
		}
		return(
				<div onClick={()=>{
						this.props.onToggle(id);
					}}>
					<input type="checkbox" checked={completed}/>
					<p>{text}</p>
					<p>{renderDate()}</p>
				</div>
		)
	}
});

module.exports = Todo;
