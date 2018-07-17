$(function(){
// ユーザーを検索のHTML作成
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }
// チャットメンバーを追加のHTML作成
  function appendMember(id,name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${ id }">
                  <input name="group[user_ids][]" type="hidden" value="${ id }">
                  <p class="chat-group-user__name">${ name }</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${ id }" data-user-name="${ name }">削除</a>
                </div>`
    return html;
  }
// ユーザーを検索
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    if (input.length !== 0) {
      console.log("a");
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { name: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        users.forEach(function(user){
          $("#user-search-result").append(appendUser(user));
        })
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })
    }
    else {
      $(".chat-group-user").remove();
    }
  })
// チャットメンバーを追加
  $("#user-search-result").on("click", ".js-add-btn", function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    $("#chat-group-users").append(appendMember(id, name));
    $(this).parent().remove();
  })
// チャットメンバーを削除
  $("#chat-group-users").on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
  })
});
