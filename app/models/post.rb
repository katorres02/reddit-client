class Post < ApplicationRecord
	validates :name_id, presence: true, uniqueness: true
end
