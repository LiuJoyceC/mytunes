// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.render();
    this.collection.on('add remove', this.render, this);
  },

  savePlaylist: function() {

  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.html('<th>Song Queue</th>')
    .append(['<form type="submit" onsubmit="return false" id="savePlaylist">',
                '<input type="text" placeholder="Save As Playlist"></input>',
                '<button>Save</button>',
            '</form>'].join(''))
    .append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );

    $('#savePlaylist').on('submit', function(event) {
      this.trigger('save', this);
    }.bind(this));
  }


});
