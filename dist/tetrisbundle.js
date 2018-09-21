!function(t){var e={};function o(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(i,r,function(e){return t[e]}.bind(null,r));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);var i={blockSize:20,rows:20,columns:10,blankColor:"#000",borderColor:"#000",scoreMoveDown:1,scoreRemoveRow:5,tetrominoes:[[[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]]],[[[0,1,1],[1,1,0],[0,0,0]],[[1,0,0],[1,1,0],[0,1,0]]],[[[1,1,0],[0,1,1],[0,0,0]],[[0,1,0],[1,1,0],[1,0,0]]],[[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[1,1,1],[0,1,0],[0,0,0]],[[0,1,0],[1,1,0],[0,1,0]]],[[[1,1,0],[1,1,0],[0,0,0]]],[[[1,1,1],[1,0,0],[0,0,0]],[[1,1,0],[0,1,0],[0,1,0]],[[0,0,1],[1,1,1],[0,0,0]],[[1,0,0],[1,0,0],[1,1,0]]],[[[1,0,0],[1,1,1],[0,0,0]],[[1,1,0],[1,0,0],[1,0,0]],[[1,1,1],[0,0,1],[0,0,0]],[[0,1,0],[0,1,0],[1,1,0]]]],tetrominoesColor:["#d11","#1d1","#11f","#dd1","#d1d","#1cd","#fdd"]};class r{constructor(t,e){this.rows=t,this.cols=e,this.field=[];for(let t=0;t<this.rows;t++)this.field.push(new Array(this.cols))}setBlock(t,e,o,i,r=i){this.field[e][t]?(this.field[e][t].isFull=o,this.field[e][t].color=i,this.field[e][t].borderColor=r):this.field[e][t]={isFull:o,color:i,borderColor:r}}getBlock(t,e){return this.field[e][t]}isFullBlock(t,e){return this.field[e][t]&&this.field[e][t].isFull}removeBlock(t,e){this.field[e][t]=!1}getRow(t){return this.field[t]}rowHasAnyFull(t){for(let e=0;e<this.field[t].length;e++)if(this.field[t][e].isFull)return!0;return!1}isFullRow(t){for(let e=0;e<this.cols;e++)if(!this.field[t][e].isFull)return!1;return!0}}class s{constructor(t,e,o,i){this.canvas=t,this.ctx=t.getContext("2d"),this.field=e,this.blockSize=o,this.blankColor=i}block(t,e,o,i=o){const r=t*this.blockSize,s=e*this.blockSize;this.ctx.fillStyle=o,this.ctx.fillRect(r,s,this.blockSize,this.blockSize),this.ctx.strokeStyle=i,this.ctx.strokeRect(r,s,this.blockSize,this.blockSize),this.field.setBlock(t,e,o!==this.blankColor,o,i)}grid(t,e,o,i){for(let r=0;r<t;r++)for(let t=0;t<e;t++)this.block(t,r,o,i)}reset(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}drawTetromino(t,e=t.color,o=t.borderColor){const i=t.getCurrentMatrix();for(let r=0;r<i.length;r++)for(let s=0;s<i.length;s++)if(i[r][s]){const i=t.getX()+s,n=t.getY()+r;this.block(i,n,e,o)}}moveRow(t,e){const o=this.field.getRow(t).length;for(let i=0;i<o;i++){const o=this.field.getBlock(i,t);o&&(this.field.setBlock(i,e,o.isFull,o.color,o.borderColor),this.block(i,e,o.color,o.borderColor))}}moveAllRows(t,e){let o=0;for(let i=t;i>=0;i--)this.moveRow(i,e-o++),this.removeRow(i)}removeRow(t){const e=this.field.getRow(t).length;for(let o=0;o<e;o++)this.field.removeBlock(o,t),this.block(o,t,this.blankColor,this.blankColor)}}class n{constructor(t,e,o,i,r){[this.type,this.x,this.y,this.color,this.borderColor]=[t,e,o,i,r],this.rotation=0,this.locked=!1}getX(){return this.x}getY(){return this.y}getBottomY(){const t=this.getCurrentMatrix();for(let e=t.length-1;e>=0;e--)for(let o=0;o<t.length;o++)if(t[e][o])return this.y+e}getCurrentMatrix(){return this.type[this.rotation]}isLocked(){return this.locked}lock(){this.locked=!0}rotate(){this.locked||this.setRotation(this.rotation+1)}getRotation(){return this.rotation}setRotation(t){this.rotation=t%this.type.length}moveLeft(){this.locked||this.x--}moveRight(){this.locked||this.x++}moveDown(){this.locked||this.y++}}const l={LEFT:1,RIGHT:2,BOTTOM:3,OTHER:4};class h{constructor(t,e,o=o,i=defaultConfig){this.onUpdateScore=(()=>{}),this.onGameOver=(()=>{}),this.onElapsedSecond=(()=>{}),this.onRandomTetromino=(()=>{}),this.field=e,this.drawer=t,this.window=o,this.config=i,this.tetrominoes=i.tetrominoes,this.score=0,this.elapsedSeconds=0,this.gameOver=!1}start(){this.drawer.grid(this.config.rows,this.config.columns,this.config.blankColor,this.config.borderColor),this.setRandomTetromino(),this.drawer.drawTetromino(this.currentTetromino)}setRandomTetromino(){this.currentTetromino=this.nextTetromino||this.getRandomTetromino(),this.nextTetromino=this.getRandomTetromino(),this.currentTetromino.x=this.config.columns/2-1,this.onRandomTetromino(this.nextTetromino)}getRandomTetromino(){const t=this.config.tetrominoesColor,e=Math.floor(Math.random()*t.length),o=Math.floor(Math.random()*this.tetrominoes.length);return new n(this.tetrominoes[o],0,0,t[e],this.config.borderColor)}isThereCollision(t,e){const o=this.currentTetromino.getCurrentMatrix();for(let i=o.length-1;i>=0;i--)for(let r=o.length-1;r>=0;r--)if(o[r][i]){const o=this.currentTetromino.getX()+i+t,s=this.currentTetromino.getY()+r+e;if(o<0)return l.LEFT;if(o>=this.config.columns)return l.RIGHT;if(s>=this.config.rows)return l.BOTTOM;if(this.field.isFullBlock(o,s))return l.OTHER}return 0}setListeners(){this.keyListener=this.keyListener.bind(this),this.stepListener=this.stepListener.bind(this),this.elapsedSecondsListener=this.elapsedSecondsListener.bind(this),this.window.addEventListener("keydown",this.keyListener),this.intervalId=setInterval(this.stepListener,1e3),this.elapsedSecondsId=setInterval(this.elapsedSecondsListener,1e3)}stepListener(){this.checkDown()}elapsedSecondsListener(){this.elapsedSeconds++,this.onElapsedSecond(this.elapsedSeconds)}keyListener(t){if(!(-1!==[37,38,39,40].indexOf(t.keyCode))||this.currentTetromino.isLocked())return!1;if(this.drawer.drawTetromino(this.currentTetromino,this.config.blankColor),37===t.keyCode&&(this.isThereCollision(-1,0)||this.currentTetromino.moveLeft()),38===t.keyCode){const t=this.currentTetromino.getRotation();this.currentTetromino.rotate(),this.isThereCollision(0,0)&&this.currentTetromino.setRotation(t)}39===t.keyCode&&(this.isThereCollision(1,0)||this.currentTetromino.moveRight()),40!==t.keyCode?this.drawer.drawTetromino(this.currentTetromino):this.checkDown()}checkDown(){if(this.drawer.drawTetromino(this.currentTetromino,this.config.blankColor),this.isThereCollision(0,1)){this.drawer.drawTetromino(this.currentTetromino),this.currentTetromino.lock();let t=this.currentTetromino.getBottomY(),e=0;for(;t>=this.currentTetromino.getY();)this.field.isFullRow(t)?(e++,this.drawer.moveAllRows(t-1,t)):t--;this.score+=this.config.scoreRemoveRow*e,this.onUpdateScore(this.score),this.setRandomTetromino(),this.isThereCollision(0,1)&&this.setGameOver()}else this.score+=this.config.scoreMoveDown,this.currentTetromino.moveDown();this.drawer.drawTetromino(this.currentTetromino)}getScore(){return this.score}getElapsedSeconds(){return this.elapsedSeconds}getNextTetromino(){return this.nextTetromino}isGameOver(){return this.gameOver}setGameOver(){this.window.removeEventListener("keydown",this.keyListener),clearInterval(this.intervalId),clearInterval(this.elapsedSecondsId),this.gameOver=!0,this.onGameOver()}}window.addEventListener("load",function t(){const e=document.getElementById("gameover");e.style="visibility: hidden";const o=i;const n=document.getElementById("score");const l=document.getElementById("time");const c=new r(o.rows,o.columns);const d=new s(document.getElementById("tetris"),c,o.blockSize,o.blankColor);const a=new h(d,c,window,o);const m=new r(5,5);const u=new s(document.getElementById("nextPiece"),m,15,o.blankColor);a.setListeners();n.innerText=l.innerText=0;a.onUpdateScore=(t=>{n.innerText=t});a.onGameOver=(()=>{e.style="visibility: visible"});a.onElapsedSecond=(t=>{l.innerText=t});a.onRandomTetromino=(t=>{u.reset(),u.drawTetromino(t)});a.start();document.getElementById("newGame").addEventListener("click",t)})}]);