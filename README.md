# テーブル設計

## usersテーブル

|Column|Type|options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through :members
- has_many :messages


## membersテーブル(中間)

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key :true|
|group_id|references|null: false, foreign_key :true|
|content|string|
|image|string|

### Association
- belongs_to :group
- belongs_to :user
