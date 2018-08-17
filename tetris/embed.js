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
    <section id="gameover" style="text-align:center;">
      <div style="text-align:center">
        <button onclick="startNewGame();">Play again</button>
      </div>
    </section>
  </div>
</main>`;

class TetrisBuilder {
  createTetris(container) {
    container.innerHTML = template;
  }
  
  destroyTetris(container) {
    container.innerHTML = '';
  }  
}

