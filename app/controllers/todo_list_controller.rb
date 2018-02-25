class TodoListController < ApplicationController
    def index
        @todos = Todo.all
    end
    def create
        Todo.create!(
            text: params[:text],
            key: params[:key],
            completed: params[:completed]
        )
    end
end
