// LibraryView.js - Defines a backbone view class for the music library.
var LibraryView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.render();
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    var select = this.$el.find('#playlistList');
    if (select.length === 0)  {
      select = '<select id="playlistList"><option value="library">Library</option></select>';
    }
    var playlistName = _.escape($('#playlistList option:selected').text()) || "Library";
    this.$el.html('<th>' + playlistName + '</th>').append('<button id="shuffleButton">Shuffle</button>')
    .append(select)
    .append(
      this.collection.map(function(song){
        return new LibraryEntryView({model: song}).render();
      })
    );
  }
});
