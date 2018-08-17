import Field from './field';
import Drawer from './drawer';
import Tetris from './tetris';

const template =
`<main style="box-sizing:border-box;">
  <div style="clear:both;height:400px;overflow:hidden;width:420px;">
    <section style="width:49%;float:left;">
      <canvas id="tetris" width="200" height="400"></canvas>
    </section>
    <section style="width:50%;float:left;">
      <div style="border:1px solid #ccc;clear:both;font-size:1em;margin-bottom:2%;overflow:hidden;padding:3%;">
        <div style="float:left;">SCORE</div>
        <div style="float:right;" id="score">0</div>
      </div>
      <div style="border:1px solid #ccc;clear:both;font-size:1em;margin-bottom:2%;overflow:hidden;padding:3%;">
        <div style="float:left;">TIME</div>
        <div style="float:right;" id="time">0</div>
      </div>
      <div style="border:1px solid #ccc;clear:both;font-size:1em;margin-bottom:2%;overflow:hidden;padding:3%;">
        <canvas id="nextPiece" width="60" height="40"></canvas>
      </div>
    </section>
    <section id="gameover" style="text-align:center;background-color:rgba(1,1,1,.5);height:100%;position:relative;width:100%;z-index:100;">
      <div style="text-align:center">
        <h2>Game over :(</h2><br>
        <button id="newGame">Play again</button>
      </div>
    </section>
  </div>
</main>`;

export default class TetrisBuilder {
  constructor(container, config) {
    container.innerHTML = template;
    this.container = container;
    this.config = config;
    this.scoreElement = document.getElementById('score');
    this.timeElement = document.getElementById('time');
    this.field = new Field(this.config.rows, this.config.columns);
    this.drawer = new Drawer(document.getElementById('tetris'), this.field, this.config.blockSize, this.config.blankColor);
    this.tetris = new Tetris(this.drawer, this.field, window, this.config);
    this.fieldNextPiece = new Field(5, 5);
    this.drawerNextPiece = new Drawer(document.getElementById('nextPiece'), this.fieldNextPiece, 15, this.config.blankColor);
    this.tetris.onGameOver = this.onGameOver.bind(this);
    this.tetris.onElapsedSecond = this.onElapsedSecond.bind(this);
    this.tetris.onRandomTetromino = this.onRandomTetromino.bind(this);
    this.newGame = this.newGame.bind(this);
    this.destroyGame = this.destroyGame.bind(this);
    document.getElementById('newGame').addEventListener('click', this.newGame);
    this.gameOverElement = document.getElementById('gameover');
    this.tetris.onUpdateScore = (score) => {
      this.scoreElement.innerText = score;
    };   
  }

  onGameOver() {
    this.gameOverElement.style = 'visibility:visible';
  }

  onElapsedSecond(totalSeconds) {
    this.timeElement.innerText = totalSeconds;
  }

  onRandomTetromino(tetromino) {
    this.drawerNextPiece.reset();
    this.drawerNextPiece.drawTetromino(tetromino);  
  }

  newGame() {
    this.gameOverElement.style = 'visibility:hidden';
    this.scoreElement.innerText = this.timeElement.innerText = 0;
    this.tetris.start();
    this.tetris.setListeners();
  }
  
  destroyGame() {
    this.tetris.setGameOver();
    this.container.innerHTML = '';
  }  
}