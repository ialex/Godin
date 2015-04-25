window.addEventListener("load", function() {
  var BASE_URL = 'http://infinigag.eu01.aws.af.cm/hot/';
  var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#container',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the <script> tag above.
    template: '#memeTemplate',

    onrender: function() {
      qwest.get('http://infinigag.eu01.aws.af.cm/hot/0').then(function(response){
        ractive.set("memes", response.data);
        ractive.set("paging", response.paging.next);
      });
    },
    // Here, we're passing in some initial data
    data: {
      memes: [],
      paging: "0"
    }
  });

  ractive.on('loadMore', function(){
    var paging = ractive.get('paging');
    qwest.get(BASE_URL + paging).then(function(response){
      ractive.set("paging", response.paging.next);
      response.data.map(function(meme){
        ractive.push("memes", meme);
        return meme;
      });
      
    });
  });


});

