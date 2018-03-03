Rails.application.routes.draw do
  root to: "todo_list#index"
  resources :todo_list, only: %i[show create update] do
    collection do
      post :bulk_destroy#post /todo_list/bulk_destroy => todo_list#bulk_destroy
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
