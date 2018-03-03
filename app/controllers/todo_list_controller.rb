class TodoListController < ApplicationController
  skip_before_action :verify_authenticity_token #Or will cause 422 error
  rescue_from StandardError, with: :log_error

  def index
    @todos = Todo.all #data from back to front via html.erb
  end

  def create
    Todo.create!(
      text: params[:text],
      key: params[:key],
      completed: params[:completed]
    )
  end

  def show
    return_json = {}
    return_json[:completed] = Todo.find_by(key: params[:id]).completed
    render json: return_json #data from back to front via fetch response
  end

  def update
    todo = Todo.find_by(key: params[:id])
    todo.update(completed: params[:completed])
  end

  def bulk_destroy#destroy according to array to avoid 500 error
    delete_todos = Todo.where(key: params[:ids])
    delete_todos.destroy_all
  end

  def log_error(error)
    puts error.inspect
  end
end
