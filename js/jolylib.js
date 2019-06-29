function toggleVisibleMusic() {
    var elspan = document.getElementById('soundcloudtoggle');
    var el = document.getElementById('soundcloud');
    el.style.display = (el.style.display != 'none' ? 'none' : '' );
    elspan.innerHTML = (el.style.display != 'none' ? '-' : '+' );
    if (el && el.innerHTML == '') {
        SC.initialize({
            client_id: '0b1d3a71e298ee7a93c2483a4bf1dde4'
        });
        SC.get('/tracks', { q: 'lyheden', order: 'created_at' }).then(
            function(tracks) {
                for (var i = 0; i < tracks.length; i++) {
                    var trElement = el.appendChild(document.createElement('div'));
                    el.appendChild(document.createElement('br'));
                    SC.oEmbed(tracks[i].permalink_url, {
                        auto_play: false,
                        show_comments: false,
                        maxheight: 166,
                        element: trElement
                    });
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