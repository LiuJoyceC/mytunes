// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
  //  this.libraryView = new LibraryView({collection: this.model.get('currentPlaylist')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    this.model.on('change:currentPlaylist', function(model) {
      this.libraryView.collection = model.get('currentPlaylist');
      this.libraryView.render();
    }, this);

    this.$el.addClass('app');
    this.$el.on('click','#shuffleButton',function() {
      this.model.shuffle();
    }.bind(this));

    this.songQueueView.on('save', this.savePlaylist, this);

    $(document.body).on('change', '#playlistList', function() {
      this.model.set('currentPlaylist', this.model.get($('#playlistList').val()));
    }.bind(this));

  },

  savePlaylist: function() {
    var playlistName = _.escape($('#savePlaylist input').val());
    $('#savePlaylist input').val('');
    var playlistContents = this.songQueueView.collection.models;
    this.model.set(playlistName, new Songs());
    var playlist = this.model.get(playlistName);
    playlist.add(playlistContents);
    $('#playlistList').append('<option value="' + playlistName + '">' + playlistName + '</option>');
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});
