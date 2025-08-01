Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users do
    resource :job_seeker_profile, only: [:show, :create, :update, :destroy]
    resource :employer_profile, only: [:show, :create, :update, :destroy]
  end
  
  get 'job_seeker_profiles/by_user/:user_id', to: 'job_seeker_profiles#by_user', as: 'job_seeker_profile_by_user'

  resources :job_posts do
    resources :applications, only: [:index, :create]
    resources :offers, only: [:index, :create]
  end
  
  resources :job_seeker_profiles, only: [] do
    resources :applications, only: [:index], controller: 'job_seeker_applications'
  end
  resources :offers, only: [:show, :update, :destroy]

  # authentication routes( we use sessions controller for authentication)
  post "login", to: "sessions#create", as: :login
  delete "logout", to: "sessions#destroy", as: :logout
  get "current_user", to: "sessions#current_user", as: :current_user
  post "register", to: "users#create", as: :register
  
  # CSRF token endpoint
  get "csrf_token", to: "sessions#csrf_token"

  
  # Defines the root path route ("/")
  # root "posts#index"
end
