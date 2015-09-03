// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    this.get('songQueue').on('remove', function() {
      if (this.get('songQueue').length === 0) {
        this.set('currentSong', null);
      }
    }, this);

    params.library.on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song) {
      var songqueue = this.get('songQueue');
      songqueue.add(song);

    }, this);




  }

});
