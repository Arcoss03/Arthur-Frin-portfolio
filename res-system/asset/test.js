let N = 3;

// let tab = [
//   [1, 1, 2, 9],
//   [4, 9, 5, 0],
//   [6, -9, 0, 7],
// ];
let tab = [
  [1, -1, 2, 5],
  [3, 2, 1, 10],
  [2, -3, -2, -10],
];
// let tab = [
//   [2, 4, 5, 6, 7],
//   [5, 6, 2, 3, 1],
//   [4, 3, 4, 4, 5],
//   [1, 2, 3, 4, 5],
// ];

//affichage tab
function aff(tab) {
  for (let i = 0; i < N; i++) {
    console.log(tab[i]);
  }
}
//tab[1][1] = tab[1][1] * tab[0][0] - tab[0][1] * tab[1][0];
aff(tab);
console.log("-------------");
// par ce quoi on multiplie
let p1;
let p2;
for (let l = 1; l <= N-1; l++) {
  for (let i = l; i <= N-1; i++){
    p1 = tab[l-1][l-1]
    p2 = tab[i][l-1]
    aff(tab)
    for (let c = l-1; c <= N; c++){
      tab[i][c] = tab[i][c] * p1 -p2 * tab[l-1][c]
    }
  }
}
aff(tab);
console.log("*************************");
let res = new Array(N-1).fill(0);
for (let i = N - 1; i >= 0; i--) {
  res[i] = tab[i][N] / tab[i][i];
  for (let k = i - 1; k >= 0; k--) {
    tab[k][N] -= tab[k][i] * res[i];
  }
}


aff(tab)
aff(res)