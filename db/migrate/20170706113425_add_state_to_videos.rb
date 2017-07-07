class AddStateToVideos < ActiveRecord::Migration[5.1]
  def change
    add_column :videos, :state, :string
    add_index :videos, :state
    add_column :videos, :url, :string
    add_column :videos, :embed_url, :string
    add_column :videos, :thumbnail_url, :string
  end
end
