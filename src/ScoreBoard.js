class ScoreBoard {
  constructor(options) {
    this.node = options.node || document.createElement("div");
    this.entry = options.entry;
    this.endGame = options.endGame || this.endGame;
    this.health = 50;
    this.score = 0;
    this.init();
  }
  init() {
    this.node.className = "scoreboard";
    this.healthNode = document.createElement("h3");
    this.scoreNode = document.createElement("h3");
    this.healthNode.innerText = this.health;
    this.scoreNode.innerText = this.score;
    this.node.appendChild(this.healthNode);
    this.node.appendChild(this.scoreNode);
    this.entry.appendChild(this.node);
  }
  addPoint() {
    this.score += 10;
    this.scoreNode.innerText = this.score;
  }

  endGame() {
    alert("you lost!!");
  }

  loseHealth() {
    if (this.health > 0) {
      this.health--;
      this.healthNode.innerText = this.health;
    } else {
      this.endGame();
    }
  }
}

export default ScoreBoard;
