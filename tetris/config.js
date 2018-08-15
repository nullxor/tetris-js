const TETROMINO_I =
[
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ], 
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ]
];

const TETROMINO_Q =
[
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ], 
];

const TETROMINO_S =
[
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ], 
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const TETROMINO_Z =
[
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

const TETROMINO_T =
[
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],  
];

const TETROMINO_L =
[
  [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ], 
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],  
];

const TETROMINO_J =
[
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ], 
  [
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],  
];

const defaultConfig = {
  // Block size in pixels
  blockSize: 20,
  
  // Rows in 'Blocks'
  rows: 20,
  
  //Columns in 'Blocks'
  columns: 10,

  // Blank Color
  blankColor: '#000',

  // Border color
  borderColor: '#000',

  // Score after moving down a tetromino
  scoreMoveDown: 1,

  // Score after removing a row
  scoreRemoveRow: 5,

  // Tetrominoes
  tetrominoes: [
    TETROMINO_I,
    TETROMINO_S,
    TETROMINO_Z,
    TETROMINO_T,
    TETROMINO_Q,
    TETROMINO_L,
    TETROMINO_J,
  ],
  tetrominoesColor: ['#d11', '#1d1', '#11f', '#dd1', '#d1d', '#1cd', '#fdd']
}
