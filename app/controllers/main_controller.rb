require "rest-client"
require "json"

class MainController < ApplicationController
  def index
    render status: :ok
  end

  def upload_file
    file_name = 'images/' + random_string()
    if params[:image].content_type == "image/png"
      file_name += '.png'
    elsif params[:image].content_type == "image/jpg" or params[:image].content_type == "image/jpeg"
      file_name += '.jpg'
    end
    puts ("#{Dir.pwd}/#{file_name}")
    File.open(file_name, 'wb') do |file| 
      file.write(params[:image].read)
    end
    res = RestClient.post("http://localhost:1235/processImage",
    {
      :path => ("#{Dir.pwd}/#{file_name}")
    }.to_json, {content_type: :json, accept: :json})
    res = JSON.parse(res.body)
    res = res.map do |result|
      file_name = File.basename result["name"], '.*'
      tokens = file_name.split('_')
      name = tokens[0] + '_' + tokens[1]
      second = tokens[2].to_i
      {'name' => name, 'second' => second}
    end
    render json: res
  end

  protected
  def random_string
    return SecureRandom.urlsafe_base64
  end
end
