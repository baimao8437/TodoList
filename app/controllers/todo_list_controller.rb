class TodoListController < ApplicationController
  skip_before_action :verify_authenticity_token #Or will cause 422 error
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
    todo.update(completed: !todo.completed)
  end

  def destroy
    delete_todo = Todo.find_by(key: params[:id])
    delete_todo.destroy
  end
end
