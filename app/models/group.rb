class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  validates :name, presence: true

  def show_last_message
    if (last_massage = messages.last).present?
      last_massage.content? ? last_massage.content : '画像が投稿されています'
    else
      'まだメッセージはありません。。'
    end
  end
end
