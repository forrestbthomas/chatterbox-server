$(document).ready(function() {
  var app={
    roomName: undefined,
    friends: {},
    server: 'http://127.0.0.1:3000/1/classes/chatterbox/',
    init: function() {
      //Load page and refresh
      app.fetch(app.roomName);
      setInterval(function() {
        app.fetch(app.roomName);
      }, 5000);

      //initialize submit message listener
      app.submitMessage();
      app.roomChange();
      app.addFriend();
    },

    render: function(data){
      $('.post').remove();
      //limiting to 30 messages instead of full data['results'].length
      for (var i=0; i<data.results.length; i++) {
        var msgData=data.results[i];
        //concat all parts of the post and put in our format ('username'-['roomname']-'date-time'-'message')
        var post=msgData.username+' ['+msgData.roomname+'] '+moment(msgData.createdAt).format('lll')+': '+msgData.text;
        if (msgData.username===undefined) {
          var nameClass='anonymous';
        } else {
          var nameClass=msgData.username.split(" ").join();
        }
        var el = $('<div class="post '+nameClass+'">');
        el.text(post);
        $('.messages').append(el);
      }
    },

    send: function(message) {
      $.ajax({
        url: 'http://127.0.0.1:3000/1/classes/chatterbox/',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(room) {
      if (room===undefined || room==='') {
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
        url:  'http://127.0.0.1:3000/1/classes/chatterbox/',
        type: 'GET',
        data: dataFilter,
        contentType: 'application/json',
        success: function (data) {
          console.log(data)
          console.log('chatterbox: Message received');
          app.render(data);
          app.highlightFriends();
        },
        error: function (data) {
          console.error('chatterbox: Failed to get message');
          console.log(this);
        }
      });
    },
    highlightFriends: function() {
      for (var friend in app.friends) {
        $('.'+friend).css('font-weight','bold');
      }
    },
    submitMessage: function() {
      $('#sendButton').on('click', function() {
        var message={};
        message.username=window.location.search.slice(10);
        message.text=$('#messageInput').val();
        message.roomname=app.roomName;
        app.send(message);
      });
    },
    roomChange: function() {
      $('#roomButton').on('click', function() {
        app.roomName=$('#roomInput').val();
        app.fetch(app.roomName);
      });
    },
    addFriend: function() {
      $('.messages').on('click', 'div', function() {
        if(confirm('Add '+this.classList[1]+' to your friend list?') && !(this.id in app.friends)) {
          app.friends[this.classList[1]]=1;
        }
      });
    }
  };
  //start app
  app.init();

});



