Rails.application.routes.draw do

  root to: 'main#index'
  resources :video, only: [:create, :update]
  post '/upload_file', to: 'main#upload_file'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
