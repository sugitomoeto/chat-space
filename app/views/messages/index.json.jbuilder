json.array! @new_messages do |message|
  json.name       message.user.name
  json.id         message.id
  json.content    message.content
  json.image      message.image.url
  json.created_at message.created_at.to_s
end
