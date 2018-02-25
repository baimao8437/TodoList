class TodoListController < ApplicationController
  def index
    # @todos = todos.all
    respond_with todos.all
end

  def create
    # respond_with todos.create()
  end

  def update
    todo = todos.find(params['key'])
    todo.update_attributes(completed: params['completed'])
    respond_with todo
  end

  def destory
    respond_with todos.destroy
  end
end
