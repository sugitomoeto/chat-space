$(function(){

  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main__middle__messages" data-massege-id="${ message.id }">
                  <div class="main__middle__messages__user-name">
                    ${ message.name }
                  </div>
                  <div class="main__middle__messages__posted-time">
                    ${ message.created_at }
                  </div>
                  <div class="main__middle__messages__content">
                    ${ message.content }
                  </div>
                  <div class="main__middle__messages__content">
                    ${ img }
                  </div>
                </div>`
    return html;
  }

  function scrollDown(place){
    place.animate({scrollTop: $('.main__middle')[0].scrollHeight},'fast');
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
      $('.main__middle').append(buildHTML(message));
      $('.form__message').val("");
      $('.hidden').val("");
      scrollDown($('.main__middle'))
    })
    .fail(function(){
      alert('メッセージが送られていません。');
    })
    return false;
  });

  var interval = setInterval(function(){
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.pathname,
          type: "GET",
          dataType: 'json',
          processData: false,
          contentType: false,
        })
        .done(function(json){
          var id = $('.main__middle__messages').last().data('messageId')
          var insertHTML = '';
          json.messages.forEach(function(message){
            if (message.id > id){
              insertHTML = buildHTML(message)
            }
          })
          $('.main__middle').append(insertHTML)
          scrollDown($('.main__middle'))
        })
        .fail(function(){
          alert('メッセージが取得出来ませんでした。');
        })
      }
    else {
      clearInterval(interval)
    }
  }, 5000 );
});
