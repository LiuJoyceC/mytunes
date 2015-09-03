// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function() {
      if (this.length === 1) {
        this.playFirst();
      }
    }, this);
    this.on('ended', function() {
      console.log('the song ended');
      this.shift();
      if (this.length) {
        this.playFirst();
      }
    }, this);
    this.on('dequeue', function(song) {
      if (song === this.at(0)) var wasFirst = true;
      this.remove(song);
      if (wasFirst && this.length) this.playFirst();

    }, this);
  },

  playFirst: function() {
    console.log('songQueue current length: ',this.length);

      var firstSong = this.at(0);
      console.log(firstSong.get('title'));
      firstSong.play();

  }



    //   params.library.on('ended', function(song) {
    //   var songqueue = this.get('songQueue');
    //   console.log(this.get('songQueue'));
    //   songqueue.shift();
    //   songqueue.playFirst();


    // }, this);



});