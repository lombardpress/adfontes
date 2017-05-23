var $ = require('jquery');

module.exports = {
  setTodos: function(todos){
    if ($.isArray(todos)){
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    }
  },
  getQuotations: function(canonicalQuotationId){
    var initialQuotations = [
    	{
    		id: 1,
    		quotation: "this is quotation 1",
    		focused: false,
    		isInstanceOf: 100,
      },
    	{
    		id: 2,
    		quotation: "this is quotation 2",
    		focused: false,
    		isInstanceOf: 101
    	},
    	{
    		id: 3,
    		quotation: "this is quotation 3",
    		focused: false,
    		isInstanceOf: 100
    	},
    	{
    		id: 4,
    		quotation: "this is quotation 4",
    		focused: false,
    		isInstanceOf: 101
    	}
    ]
    var filteredQuotations = initialQuotations.filter(function(quotation){
      return quotation.isInstanceOf === canonicalQuotationId;
    });
    return filteredQuotations
  },
  getTodos: function(){
    var stringTodos = localStorage.getItem("todos");
    var todos = [];
    try {
      todos = JSON.parse(stringTodos);
    }
    catch(e){
    }

    return $.isArray(todos) ? todos : [];
  },
  filterTodos: function(todos, showCompleted, searchText){
    var filteredTodos = todos;
    // filter by show completed
    filteredTodos = filteredTodos.filter(function(todo){
      return !todo.completed || showCompleted;
    });

    //filter by search text
    filteredTodos = filteredTodos.filter(function(todo){
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;
    });


    // sort todos with non-completed first
    filteredTodos.sort(function(a, b){
      if (!a.completed && b.completed){
        return -1;
      }
      else if (a.completed && !b.completed){
        return 1;
      }
      else {
        return 0;
      }
    });
    return filteredTodos;

  }
};
