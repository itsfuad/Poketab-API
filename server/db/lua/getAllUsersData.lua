local userIds = redis.call('smembers', 'chat:' .. ARGV[1] .. ':users')
local users = {}
if #userIds == 0 then
  return cjson.encode(users)
end
for _, id in ipairs(userIds) do
  local userData = redis.call('hmget', 'chat:' .. ARGV[1] .. ':user:' .. id, 'name', 'avatar', 'uid')
  -- if no user data then continue
  if userData[1] then
    local name, avatar, uid = unpack(userData)
    users[uid] = { name = name, avatar = avatar, uid = uid }
  end
end
return cjson.encode(users)