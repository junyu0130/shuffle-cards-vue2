var vm = new Vue({
  el: "#app",
  data: {
    gather: true,
    state: "Press the cards to start a game!",
    symbols: [
      { label: "spades", symbol: "♠" },
      { label: "hearts", symbol: "♥" },
      { label: "diamonds", symbol: "♦" },
      { label: "clubs", symbol: "♣" },
    ],
    cards: [
      {
        id: 1,
        label: "spades",
        open: false,
      },
      {
        id: 2,
        label: "hearts",
        open: false,
      },
      {
        id: 3,
        label: "clubs",
        open: false,
      },
      {
        id: 4,
        label: "diamonds",
        open: false,
      },
    ],

    question: null,
    mode: "",
    count: 0,
  },
  methods: {
    shuffle() {
      let newOrder = [1, 2, 3, 4].sort((a, b) =>
        Math.random() > 0.5 ? 1 : -1
      );
      this.cards.forEach((card, cid) => (card.id = newOrder[cid]));
    },
    turnAll(state) {
      this.cards.forEach((card) => (card.open = state));
    },
    getSymbol(label) {
      let result = this.symbols.find((s) => s.label == label);
      return result ? result.symbol : label;
    },
    startGame() {
      this.mode = "";
      this.question = this.symbols[parseInt(Math.random() * 4)];
      this.turnAll(false);
      this.gather = true;
      this.state = "Ready..";
      setTimeout(() => {
        this.gather = false;
        this.state = "Your mission is..";
      }, 1000);
      setTimeout(() => {
        this.turnAll(true);
        this.state = "Find " + this.question.label + this.question.symbol + "!";
      }, 2000);
      setTimeout(() => {
        this.turnAll(false);
        this.state = "Get ready..";
      }, 4000);
      this.count = 0;
      setTimeout(() => {
        let startShuffle = () => {
          this.shuffle();
          if (this.count++ < 6) {
            setTimeout(startShuffle, 300);
          } else {
            this.state =
              "Please Pick out " + this.question.label + this.question.symbol;
            this.mode = "answer";
          }
        };
        startShuffle();
      }, 6000);
    },
    getCard(label) {
      return this.cards.find((card) => card.label == label);
    },
    openCard(card) {
      if (this.mode == "answer") {
        card.open = !card.open;
        if (card.label == this.question.label) {
          this.state =
            "You get the " + this.question.label + this.question.symbol + "!!!";
        } else {
          this.state = "You lose!!!";
          setTimeout(() => {
            this.getCard(this.question.label).open = true;
          }, 1000);
        }
        setTimeout(() => {
          this.mode = "";
          this.question = null;
          this.turnAll(false);
          this.gather = true;
          this.state = "Press the cards to start a game!";
          let i = 1;
          this.cards.forEach((card) => (card.id = i++));
        }, 3000);
      } else {
        this.startGame();
      }
    },
  },
});
