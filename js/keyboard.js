var palabras = ['GATITO', 'SUAVECITO', 'PELUDIN', 'RONRONEO', 'MICHI', 'DESTRUCCION', 'COLITA', 'AMOR', 'RATON', 'PESCADITO']

let usadas = []

let historial ={}
historial.gop = []
historial.turnos = []
historial.cont = 0

document.getElementById('image').innerHTML = '<img src="img/0.png" alt="">'

let elegidor = getRandomInt(10)

let longitud = palabras[elegidor].length;

let stringInput = ""

let contadorBien = 0, contadorMal = 0;

function loadgame() {
  usadas = []
  elegidor = getRandomInt(10)
  longitud = palabras[elegidor].length
  stringInput = ""
  contadorMal = 0
  contadorBien = 0
  printTable()

  for (let i = 0; i < longitud; i++) {
    stringInput += '<input type="text" id="' + i + '" readonly></input>&nbsp;&nbsp;'
  }

  document.getElementById("inputs").innerHTML = stringInput

  document.getElementById('image').remove
  document.getElementById('image').innerHTML = '<img src="img/' + contadorMal + '.png" alt="">'


}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function usar(exc) {
  let i = 0
  while (usadas[i]) {
    i++
  }
  usadas[i] = exc
}


function printTable() {
  let stringTable = ""
  let letra = 65

  for (let i = 1; i <= 5; i++) {
    stringTable += "<tr>";

    for (let j = 1; j <= 6; j++) {
      let bandera = 0


      for (let k = 0; k < usadas.length; k++) {
        if (usadas[k] === String.fromCharCode(letra)) {
          bandera = 1;
        }
      }
      if ((bandera === 0) && (letra <= 90)) {
        stringTable += '<td onclick="setInput(\'' + String.fromCharCode(letra) + '\')"> &nbsp;&nbsp;' + String.fromCharCode(letra) + '&nbsp;&nbsp;</td>'
      }

      letra++;
    }

    stringTable += "</tr>"
    document.getElementById("keyboard").innerHTML = stringTable
  }
}

function calificar() {
  let strhis = "<tr><th>Resultado</th><th>Turnos</th></tr>"
  for (var i = 0; i < historial.cont; i++) {
    strhis += "<tr><td>" + historial.gop[i] + "</td><td>" + historial.turnos[i] + "</td></tr>"
  }
  document.getElementById("hist").innerHTML = strhis
}

function setInput(exc) {
  var bandera = 0
  for (var i = 0; i < longitud; i++) {
    if (palabras[elegidor].charAt(i) === exc) {
      document.getElementById(i).value = exc
      contadorBien++
      usar(exc)
      printTable(usadas)
      bandera = 1

    }
  }
  if (contadorBien == longitud) {
    alert("ganaste")
    historial.gop[historial.cont] = "ganaste"
    historial.turnos[historial.cont] = contadorMal + contadorBien 
    historial.cont++
    calificar()
    loadgame()

  }
  if (bandera === 0) {
    contadorMal++
    if (contadorMal < 6) {
      document.getElementById('image').remove
      document.getElementById('image').innerHTML = '<img src="img/' + contadorMal + '.png" alt="">'
    } else {
      alert("perdiste")
      historial.gop[historial.cont] = "perdiste"
      historial.turnos[historial.cont] = contadorMal + contadorBien 
      historial.cont++
      calificar()
      loadgame()
    }
  }
}

$(document).ready(function () {
  $("#historial").click(function () {
    $("#dos").show()
    $("#uno").hide()
    
  })

  $("#salir").click(function () {
    $("#dos").hide()
    $("#uno").show()
  })

})