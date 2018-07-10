$(function(){
  var middle = $(".main__middle")

  function buildHTML(message){
    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="main__middle__messages">
                  <div class="main__middle__messages__user-name">
                    ${ message.name }
                  </div>
                  <div class="main__middle__messages__posted-time">
                    ${ message.created_at}
                  </div>
                  <div class="main__middle__messages__content">
                    ${ message.content}
                  </div>
                  <div class="main__middle__messages__content">
                    ${ img }
                  </div>
                </div>`
    return html;
  }

  function scrollDown(place){
    place.animate({scrollTop: middle[0].scrollHeight},'fast');
  }

  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      middle.append(buildHTML(message));
      scrollDown(middle)
      $('.form__message').val("");
      $('.hidden').val("");
    })
    .fail(function(){
      alert('メッセージが送られていません。');
    })
    return false;
  });
});
