class MainController < ApplicationController
  def index
    @videos = Video.where(state: 'uploaded').to_a.as_json
  end
end
