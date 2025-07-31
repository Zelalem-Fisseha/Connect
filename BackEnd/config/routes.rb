Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users do
    resource :job_seeker_profile, only: [:show, :create, :update, :destroy]
    resource :employer_profile, only: [:show, :create, :update, :destroy]
  end

  resources :job_posts do
    resources :applications, only: [:index, :create]
    resources :offers, only: [:index, :create]
  end
  resources :offers, only: [:show, :update, :destroy]


  # Defines the root path route ("/")
  # root "posts#index"
end
