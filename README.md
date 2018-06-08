# テーブル設計

## usersテーブル

|Column|Type|options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :membars
- has_many :messages
- has_many :membars

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through :membars
- has_many :messages
- has_many :members


## membarsテーブル(中間)

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
|body|text|
|image|string|

### Association
- has_many :users, through :membars
- has_many :messages
- has_many :members
