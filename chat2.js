Messages = new Meteor.Collection("messages");
Usernames = new Meteor.Collection("usernames");

if (Meteor.isClient) {

  Template.main.messages = function() {
    return Messages.find();
  };

  Template.main.usernames = function() {
    return Usernames.find();
  };

  Template.main.events({
    'keypress #chatText' : function (e) {
      if(e.which == 13) {
        var message = $('#chatText').val();
        var username = $('#userholder').val();
        var time = new Date();
        time = (time.getHours() < 10 ? '0' : '' ) + time.getHours()+':'+(time.getMinutes() < 10 ? '0':'') + time.getMinutes();
    
      $('#userholder').attr('readonly','readonly');

      if ( !Usernames.findOne({ name: username}) ){
        Usernames.insert({ name: username });
        console.log('saved');
      }
        
        Messages.insert({
          username: username,
          message: message,
          time: time
        });

        $('#chatText').val(" ");
        var chat_room = $('#chatLineHolder');
        chat_room.scrollTop( chat_room[0].scrollHeight - chat_room.height() );
      }
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      Messages.remove({});
      Usernames.remove({});
  });

}
