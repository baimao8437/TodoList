class TodoListController < ApplicationController
    def index
        @todos = Todo.all
    end
end
