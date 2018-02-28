Rails.application.routes.draw do
  root to: "todo_list#index"
  resources :todo_list, only: %i[create update destroy]
  get "/todo_list/destroy_all", to: "todo_list#destroy_all"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end