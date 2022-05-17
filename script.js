var vm = new Vue({
  el: "#app",
  data: {
    gather: true,
    state: "Start the Game!",
    symbols: [
      { label: "spades", symbol: "♠" },
      { label: "hearts", symbol: "♥" },
      { label: "diamonds", symbol: "♦" },
      { label: "clubs", symbol: "♣" },
    ],
    cards: [
      { id: 1, label: "spades", open: false },
      { id: 2, label: "hearts", open: false },
      { id: 3, label: "clubs", open: false },
      { id: 4, label: "diamonds", open: false },
    ],
  },
  methods: {
    shuffle() {
      let newOrder = [1, 2, 3, 4].sort((a, b) =>
        Math.random() > 0.5 ? 1 : -1
      );
      this.cards.forEach((card, cid) => (card.id = newOrder[cid]));
    },
    getSymbol(label) {
      let result = this.symbols.find((s) => s.label == label);
      return result ? result.symbol : label;
    },
  },
});
