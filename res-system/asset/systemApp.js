/**************************************************************************** */
function FoncSaisie() {
  var saisie = document.getElementById("x1").value;
  console.log(saisie);
  alert("saisie" + saisie);
}

function Hidden(tab) {
  for (let i = 0; i < tab.length; i++) {
    document.getElementById(tab[i]).style.visibility = "hidden";
    document.getElementById(tab[i]).style.position = "absolute";
  }
}
function Show(tab) {
  for (let i = 0; i < tab.length; i++) {
    document.getElementById(tab[i]).style.visibility = "visible";
    document.getElementById(tab[i]).style.position = "static";
  }
}
function TestShow() {
  switch (nbInco) {
    case 2:
      Show(["x1", "x2", "y1", "y2", "res1", "res2", "equ1", "equ2", "X", "Y"]);
      Hidden(["x3", "y3", "z1", "z2", "z3", "res3", "equ3", "Z"]);
      break;
    case 3:
      Show(["x3", "y3", "z3", "z1", "z2", "z3", "res3", "equ3", "Z"]);
      Hidden(["x4", "y4", "z4", "a1", "a2", "a3", "a4", "res4", "equ4", "A"]);
      break;
    case 4:
      Show(["x4", "y4", "z4", "a1", "a2", "a3", "a4", "res4", "equ4", "A"]);
      Hidden([
        "x5",
        "y5",
        "z5",
        "a5",
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "res5",
        "equ5",
        "B",
      ]);
      break;
    default:
      Show([
        "x5",
        "y5",
        "z5",
        "a5",
        "b5",
        "b4",
        "b3",
        "b2",
        "b1",
        "res5",
        "equ5",
        "B",
      ]);
  }
}
function CompleteTab() {}
function TestComplete() {
  switch (nbInco) {
    case 2:
      Show(["x1", "x2", "y1", "y2", "res1", "res2", "equ1", "equ2"]);
      break;
    case 3:
      Show(["x3", "y3", "z3", "z1", "z2", "z3", "res3", "equ3", "Z"]);
      break;
    case 4:
      Show(["x4", "y4", "z4", "a1", "a2", "a3", "a4", "res4", "equ4", "A"]);
      break;
    default:
      Show([
        "x5",
        "y5",
        "z5",
        "a5",
        "b4",
        "b3",
        "b2",
        "b1",
        "res5",
        "equ5",
        "B",
      ]);
  }
}

/***************************************************************************** */
var resoudre = document.getElementById("button1");
var inco = document.getElementById("inco");
var nbInco = 2;
var nbLine = 2;
var up = document.getElementById("up");
var down = document.getElementById("down");
var button1 = document.getElementById("button1");
inco.innerHTML = nbInco;

up.addEventListener("click", function () {
  if (nbInco != 5) {
    nbInco++;
    inco.innerHTML = nbInco;
    TestShow();
  }
});
down.addEventListener("click", function () {
  if (nbInco != 2) {
    nbInco--;
    inco.innerHTML = nbInco;
    TestShow();
  }
});
TestShow();

button1.addEventListener("click", function () {
  alert("la dim est -> " + nbInco);
});
document.writeln("<p>Entrez votre mot de passe :</p>");
