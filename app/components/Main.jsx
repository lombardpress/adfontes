var React = require("react");
import TodoApp from "TodoApp";

var Main = (props) => {
	return(
			<div>
        <h3 className='page-title'>Scholastic Quotation Explorer</h3>

				<div className='page-header'>
					<p>A <a href="http://lombardpress.org">LombardPress</a> Publication | Powerd by Data from the <a href="https://scta.info">Scholastic Commentaries and Text Archive</a></p>
					<p>Designed by <a href="http://jeffreycwitt.com">Jeffrey C. Witt</a></p>
        </div>
        <TodoApp/>
			</div>
		);
}

module.exports = Main;
