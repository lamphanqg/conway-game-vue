var game = new Vue({
  el: '#game_area',
  data: function() {
    return {
      side_size: 0,
      loop: false,
      state: {},
      turn: 0
    }
  },
  methods: {
    initialize: function(event) {
      if (this.loop) {
        clearInterval(this.loop);
      }
      this.loop = false;
      this.turn = 0;
      this.state = {};

      var side_size = Number(document.getElementById('side_size').value);
      for (var r = 1; r <= side_size; r++) {
        this.$set(this.state, r, {});
        for (var c = 1; c <= side_size; c++) {
          this.$set(this.state[r], c, Math.random() >= 0.7);
        }
      }
      this.side_size = side_size;
    },
    startGame: function() {
      if (this.loop) return;

      this.loop = setInterval(function() {
        state = {};
        new_state = {};
        change = false;

        for (var or = 1; or <= game.side_size; or++) {
          new_state[or] = {};
          for (var oc = 1; oc <= game.side_size; oc++) {
            new_state[or][oc] = game.state[or][oc];
          }
        }

        for (var r = 1; r <= game.side_size; r++) {
          for (var c = 1; c <= game.side_size; c++) {
            var live_neighbors = 0;
            for (var nr = r - 1; nr <= r + 1; nr++) {
              for (var nc = c - 1; nc <= c + 1; nc++) {
                if (nr == r && nc == c) continue;
                if (typeof game.state[nr] == 'undefined' || typeof game.state[nr][nc] == 'undefined') continue;
                if (game.state[nr][nc]) live_neighbors += 1;
              }
            }

            if (game.state[r][c] && live_neighbors != 2 && live_neighbors != 3) {
              new_state[r][c] = false;
              change = true;
            } else if (!game.state[r][c] && live_neighbors == 3) {
              new_state[r][c] = true;
              change = true;
            }
          }
        }

        if (change) {
          game.turn += 1;
          game.state = new_state;
        } else {
          clearInterval(game.loop);
          alert("Game over at turn " + game.turn.toString());
          game.loop = false;
        }
      }, 2000);
    },
    stopGame: function() {
      if (!this.loop) return;
      clearInterval(this.loop);
      this.loop = false;
    }
  }
})
