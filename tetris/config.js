const TETROMINO_I =
[
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ], 
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
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
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
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
  blankColor: '#111',

  // Border color
  borderColor: '#111',
  
  // Tetrominoes
  tetrominoes: [
    TETROMINO_I,
    TETROMINO_S,
    TETROMINO_T,
    TETROMINO_Q,
    TETROMINO_L
  ],
  tetrominoesColor: ['#d11', '#1d1', '#11d', '#dd1', '#d1d', '#1cd', '#fdd']
}
