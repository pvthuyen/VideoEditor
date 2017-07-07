class VideoController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    video = Video.create(videoId: params[:videoId])
  end
end
