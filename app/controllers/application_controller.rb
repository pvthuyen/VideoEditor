class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token 
  skip_before_action :authenticate_user!, raise: false
end
