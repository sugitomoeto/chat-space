$(function(){

  function buildHTML(message){
    var img = message.image.url ? `<img src= ${message.image.url}>` : "";
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

  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var $this = $(this);
    var formData = new FormData($this.get(0));
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
      var html = buildHTML(message);
      var middle = $(".main__middle")
      middle.append(html);
      middle.animate({scrollTop: middle[0].scrollHeight},'fast');
      $this.get(0).reset();
    })
    .fail(function(){
      alert('メッセージが送られていません。');
    })
    return false;
  });
});
