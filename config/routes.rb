Rails.application.routes.draw do
  root to: "todo_list#index"
  resources :todo_list
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
