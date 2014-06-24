//Pseudo-Code for appBackbone View
//var messagesView = Backbone.View.extend({
  //for our rendering methods
  //Anything getting displayed goes in here - stuff like our jQuery things
  //add a tagName of div, to append our individual messages to the message container div
  //add a template property with a value of the underscore template function with the user, the room, the date and the message included
  //add the event property, which will show the events we are listening for and the functions they call when triggered
    //clicking on a div to add a friend
    //clicking on a div to remove a friend
    //clicking on a div to ban a user
  //add an initialize function whcih does the following
    //tells each instantiated view to listen to events and respond
  //add a render function which will
    //display the view contents on the page
    //add a class of username to store for later class changes
    //return the view
  //add a method to toggle the friend status
//})



//var appView = Backbone.View.extend({
  //add event property which will do the following
    //this property listens for a specific action on a specific class or id and performs the below methods accordingly
    //refreshButton method that, on  click, refreshes the messages on the page
    //sendButton method that, on click, sends the message from the input field and refreshes the page
    //roomButton that switches the specified room from the input field
  //add an initialize property that does the following
    //defines filed and button variables
    //listens to Model changes in order to render appropriately
    //calls the Backbone fetch function, which is the AJAX call
//})
//make a new appView



 //create an event listener for the 'refresh messages' button
  $('#refreshButton').on('click', function() {
    app.fetch(roomName);
    setTimeout(function() {
      highlightFriends();
    }, 200);
  });

  //allow user to send message
  //create a message object with 'window.location.search' as username
  //also pass in text from text box and room name
  $('#sendButton').on('click', function() {
    var message={};
    message.username=window.location.search.slice(10);
    message.text=$('#messageInput').val();
    message.roomname=roomName;
    app.send(message);
    setTimeout(function() {
      app.fetch(roomName);
    }, 200);
    setTimeout(function() {
      highlightFriends();
    }, 400);
  });

  //switches to roomname selected by user
  $('#roomButton').on('click', function() {
    roomName=$('#roomInput').val();
    app.fetch(roomName);
    setTimeout(function() {
      highlightFriends();
    }, 200);  });

  //adds friend to friend list
  $('.messages').on('click', 'div', function() {
    if(confirm('Add '+this.classList[1]+' to your friend list?') && !(this.id in friends)) {
      friends[this.classList[1]]=1;
    }
    highlightFriends();
  });

  //bolds all friend posts
  var highlightFriends=function() {
    for (var friend in friends) {
      $('.'+friend).css('font-weight','bold');
    }
  };
