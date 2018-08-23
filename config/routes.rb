Rails.application.routes.draw do
  root 'entries#top'

  namespace :api do
  	namespace :v1 do
  		resources :posts, only: [:create] do
  			collection do
  				post 'read'
  			end
  		end
  	end
  end
end
