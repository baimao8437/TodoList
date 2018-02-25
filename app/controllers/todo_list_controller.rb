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
    def update
        todo = Todo.find_by(key: params[:id])
        todo.update({ completed: !todo.completed })
    end
end
