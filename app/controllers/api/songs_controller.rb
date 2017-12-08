class Api::SongsController < ApplicationController
  def index
    render json: Song.all
  end

  def create
    song = Song.create(song_params)
    render json: song
  end

  def destroy
    Song.find(params[:id]).destroy
    render json: {status: 'ok'}
  end

  private
  def song_params
    params.require(:song).permit(:title, :artist) 
  end
end
