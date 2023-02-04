/**************************************************************************** */
function FoncSaisie() {
  var saisie = document.getElementById("x1").value;
  console.log(saisie);
  alert("saisie" + saisie);
}
function Cacher() {
  document.getElementById("z1").style.visibility = "collapse";
  document.getElementById("z2").style.visibility = "collapse";
  document.getElementById("z3").style.visibility = "collapse";
  document.getElementById("z4").style.visibility = "collapse";
  document.getElementById("z5").style.visibility = "collapse";
  document.getElementById("a1").style.visibility = "collapse";
  document.getElementById("a2").style.visibility = "collapse";
  document.getElementById("a3").style.visibility = "collapse";
  document.getElementById("a4").style.visibility = "collapse";
  document.getElementById("a5").style.visibility = "collapse";
  document.getElementById("b1").style.visibility = "collapse";
  document.getElementById("b2").style.visibility = "collapse";
  document.getElementById("b3").style.visibility = "collapse";
  document.getElementById("b4").style.visibility = "collapse";
  document.getElementById("b5").style.visibility = "collapse";
  document.getElementById("x3").style.visibility = "collapse";
  document.getElementById("x4").style.visibility = "collapse";
  document.getElementById("x5").style.visibility = "collapse";
  document.getElementById("y3").style.visibility = "collapse";
  document.getElementById("y4").style.visibility = "collapse";
  document.getElementById("y5").style.visibility = "collapse";
}
function MontereZ() {
  document.getElementById("z1").style.visibility = "visible";
  document.getElementById("z2").style.visibility = "visible";
  document.getElementById("z3").style.visibility = "visible";
  document.getElementById("z4").style.visibility = "visible";
  document.getElementById("z5").style.visibility = "visible";
}
function TestShow() {
  if (nbInco == 3 && nbLine == 2) {
    document.getElementById("z1").style.visibility = "visible";
    document.getElementById("z2").style.visibility = "visible";
  } else if (nbInco == 2 && nbLine == 3) {
    document.getElementById("x3").style.visibility = "visible";
    document.getElementById("y3").style.visibility = "visible";
  } else if (nbInco == 3 && nbLine == 3) {
    document.getElementById("z1").style.visibility = "visible";
    document.getElementById("z2").style.visibility = "visible";
    document.getElementById("x3").style.visibility = "visible";
    document.getElementById("y3").style.visibility = "visible";
    document.getElementById("z3").style.visibility = "visible";
  } else if (nbInco == 4 && nbLine == 2) {
    document.getElementById("z1").style.visibility = "visible";
    document.getElementById("z2").style.visibility = "visible";
    document.getElementById("x3").style.visibility = "visible";
    document.getElementById("y3").style.visibility = "visible";
    document.getElementById("z3").style.visibility = "visible";
  }
}
/***************************************************************************** */
var resoudre = document.getElementById("button1");
var inco = document.getElementById("inco");
var line = document.getElementById("line");
var nbInco = 2;
var nbLine = 2;
var haut1 = document.getElementById("haut1");
var bas1 = document.getElementById("bas1");
var haut2 = document.getElementById("haut2");
var bas2 = document.getElementById("bas2");

resoudre.addEventListener("click", FoncSaisie);
inco.innerHTML = nbInco;
line.innerHTML = 18;
Cacher();
haut1.addEventListener("click", function () {
  if (nbInco != 5) {
    nbInco++;
    inco.innerHTML = nbInco;
    Cacher();
    TestShow();
  }
});
bas1.addEventListener("click", function () {
  if (nbInco != 2) {
    nbInco--;
    inco.innerHTML = nbInco;
    Cacher();
    TestShow();
  }
});
haut2.addEventListener("click", function () {
  if (nbLine != 5) {
    nbLine++;
    line.innerHTML = nbLine;
    Cacher();
    TestShow();
  }
});
bas2.addEventListener("click", function () {
  if (nbLine != 2) {
    nbLine--;
    line.innerHTML = nbLine;
    Cacher();
    TestShow();
  }
});

var x5 = document.getElementById("x5");

document.getElementById("A").addEventListener("click", function () {
  x5.style.visibility = "collapse";
});
document.getElementById("B").addEventListener("click", function () {
  x5.style.visibility = "visible";
});
