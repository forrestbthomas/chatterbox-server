// $(document).ready(function() {
  var roomName;
  var friends={};
  var App=Backbone.Model.extend({
    server: 'https://api.parse.com/1/classes/chatterbox/',
    initialize: function() {
      this.fetch();
    },
    send: function(message) {
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(room) {
      if (room===undefined) {
        var dataFilter={
          order: '-createdAt'
        };
      } else {
        var dataFilter={
          order: '-createdAt',
          where: '{"roomname": "'+room+'"}'
        };
      }

      $.ajax({
        // always use this url
        //url:  'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
        url:  'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: dataFilter,
        contentType: 'application/json',
        // data: 'data:-createdAt',
        success: function (data) {
          console.log('chatterbox: Message received');
          $('.post').remove();
          //limiting to 30 messages instead of full data['results'].length
          for (var i=0; i<data['results'].length; i++) {
            var msg=data['results'][i];

            var post=msg.username+' ['+msg.roomname+'] '+moment(msg.createdAt).format('lll')+': '+msg.text;
            if (msg.username===undefined) {
              var nameClass='anonymous';
            } else {
              var nameClass=msg.username.split(" ").join();
            }
            var el = $('<div class="post '+nameClass+'">');
            el.text(post);
            $('.messages').append(el);
          }

        },
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to get message');
        }
      });

    }

  });

  var app=new App();

  //load message
  //app.fetch();

  // //create an event listener for the 'refresh messages' button
  // $('#refreshButton').on('click', function() {
  //   app.fetch(roomName);
  //   setTimeout(function() {
  //     highlightFriends();
  //   }, 200);
  // });

  // //allow user to send message
  // //create a message object with 'window.location.search' as username
  // //also pass in text from text box and room name
  // $('#sendButton').on('click', function() {
  //   var message={};
  //   message.username=window.location.search.slice(10);
  //   message.text=$('#messageInput').val();
  //   message.roomname=roomName;
  //   app.send(message);
  //   setTimeout(function() {
  //     app.fetch(roomName);
  //   }, 200);
  //   setTimeout(function() {
  //     highlightFriends();
  //   }, 400);
  // });

  // //switches to roomname selected by user
  // $('#roomButton').on('click', function() {
  //   roomName=$('#roomInput').val();
  //   app.fetch(roomName);
  //   setTimeout(function() {
  //     highlightFriends();
  //   }, 200);  });

  // //adds friend to friend list
  // $('.messages').on('click', 'div', function() {
  //   if(confirm('Add '+this.classList[1]+' to your friend list?') && !(this.id in friends)) {
  //     friends[this.classList[1]]=1;
  //   }
  //   highlightFriends();
  // });

  // //bolds all friend posts
  // var highlightFriends=function() {
  //   for (var friend in friends) {
  //     $('.'+friend).css('font-weight','bold');
  //   }
  // };

// });



