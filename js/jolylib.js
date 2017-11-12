/* Is this possible to do more elegantly if one cares about order? */
function toggleVisibleMusic() {
    var elspan = document.getElementById('soundcloudtoggle');
    var el = document.getElementById('soundcloud');
    el.style.display = (el.style.display != 'none' ? 'none' : '' );
    elspan.innerHTML = (el.style.display != 'none' ? '-' : '+' );
    if (el && el.innerHTML == '') {
        SC.initialize({
            client_id: '0b1d3a71e298ee7a93c2483a4bf1dde4'
        });
        SC.get('/tracks', { q: 'lyheden', order: 'created_at' }, 
            function(tracks) {
                function processTracks(allTracks) {
                    function findIndexByKeyValue(obj, key, value) {
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i][key] == value) {
                                return i;
                            }
                        }
                        return null;
                    }
                    var sorted_array = [];
                    for (var i = 0; i < tracks.length; i++) {
                        sorted_array[i] = allTracks[findIndexByKeyValue(allTracks,'title',tracks[i].title + ' by Lyheden')].html;
                    }
                    el.innerHTML = sorted_array.join('<hr>');
                }
                var callbacksOutstanding = tracks.length;
                var allTracks = [];
                var callback = function(track) {
                    allTracks.push(track);
                    if (--callbacksOutstanding === 0) {
                        processTracks(allTracks);
                    }
                };
                for (var i = 0; i < tracks.length; i++) {
                    SC.oEmbed(tracks[i].permalink_url, { auto_play: false, iframe: true }, callback);
                }
            }
        );
    }
};

function toggleVisible(id) {
    var elspan = document.getElementById(id + "toggle");
    var el = document.getElementById(id);
    el.style.display = (el.style.display != 'none' ? 'none' : '' );
    elspan.innerHTML = (el.style.display != 'none' ? '-' : '+' );
};

window.onload = function() {
    if (!document.getElementsByTagName) return false;
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
       if (links[i].getAttribute("rel") == "external") {
          links[i].onclick = function() {
             return !window.open(this.href);
          };
       }
    };
};