$(document).ready(function () {

  // Multipliziere die zwei Matrizen.
  function multiply(){
    var resultMatrix = leereMatrix(matrix_anzahl);
    for (var row = 0; row < matrix_anzahl; row++) {
      for (var column = 0; column < matrix_anzahl; column++) {
        for (var otherColumn = 0; otherColumn < matrix_anzahl; otherColumn++) {
                  if((resultMatrix[row][column] += matrix[row][otherColumn] * matrix[otherColumn][column]) >= 1) {
                      resultMatrix[row][column] = 1;
                  }
        }
      }
    }
    return resultMatrix;
  }  

  function hoch(n) {
    var resultMatrix = matrix;
    for (var i = 1; i < n; i++) {
      resultMatrix = multiply(matrix);
    }
    return resultMatrix;
  }


  function wegMatrix() {
    resultMatrix = leereMatrix(matrix_anzahl);
                for(var row = 0; row < matrix_anzahl; row++) {
                    for(var column = 0; column < matrix_anzahl; column++) {
                        if(column == row) {
                            resultMatrix[row][column] = 1;
                        }
                    }
                }
                for(var potenz = 1; potenz < matrix_anzahl; potenz++)
                {
                    var updated = false;
                    var completed = true;
                    var potenzmatrix = hoch(potenz);
                    // Wenn die Wegmatrix lauter 1er hat setze completed auf false
                    for(var row = 0; row < matrix_anzahl; row++) {
                        for(var column = 0; column < matrix_anzahl; column++) {
                            if(resultMatrix[row][column] == 0) {
                                completed = false;
                            }
                        }
                    }
                    for(var row = 0; row < matrix_anzahl; row++) {
                        for(var column = 0; column < matrix_anzahl; column++) {
                            if(potenzmatrix[row][column] > 0) {
                                resultMatrix[row][column] = 1;
                                // setze updated auf true wenn ein Wert gesetzt wurde
                                updated = true;
                            }
                        }
                    }
                    // Wenn sich die matrix nicht mehr geändert hat breche ab
                    if(updated == false) {
                        break;
                    }
                    // Wenn es nur mehr 1er gibt breche ab
                    if(completed == true) {
                        break;
                    }
                }
                
    return resultMatrix;
  }

  function distanzMatrix(){
    resultMatrix = leereMatrix(matrix_anzahl);
    var min_val = -2000;

                for(var row = 0; row < matrix_anzahl; row++) {
                    for(var column = 0; column < matrix_anzahl; column++) {
                        if(row == column) {
                            resultMatrix[row][column] = 0;
                        }
                        if(row != column) {
                            resultMatrix[row][column] = 0;
                            resultMatrix[row][column] = min_val;
                        }
                    }
                }
                for(var potenz = 1; potenz < matrix_anzahl; potenz++) {
                    var updated = false;
                    var completed = true;
                    var potenzmatrix = hoch(potenz);
                    // Wenn die Distanzmatrix kein unendlich mehr hat setze completed auf true
                    for(var row = 0; row < matrix_anzahl; row++) {
                        for(var column = 0; column < matrix_anzahl; column++) {
                            if(resultMatrix[row][column] == min_val) {
                                completed = false;
                            }
                        }
                    }
                    for(var row = 0; row < matrix_anzahl; row++) {
                        for(var column = 0; column < matrix_anzahl; column++) {
                            if(potenzmatrix[row][column] > 0 && resultMatrix[row][column] == min_val) {
                                resultMatrix[row][column] = potenz;
                                // setze updated auf true wenn ein Wert gesetzt wurde
                                updated = true;
                            }
                        }
                    }
                    // Wenn sich die matrix nicht mehr geändert hat breche ab
                    if(updated == false) {
                        break;
                    }
                    // Wenn es nur mehr 1er gibt breche ab
                    if(completed == true) {
                        break;
                    }
                }
    return resultMatrix;
  }

  function exzentrizitaeten() {
   var distanzMa = distanzMatrix(); 
    exz = leeresArray(matrix_anzahl);
    // Durchlaufe alle Zeilen und Spalten.
    for(var row = 0; row < matrix_anzahl; row++) {
      for(var column = 0; column < matrix_anzahl; column++) {
        exz[row] = Math.max(distanzMa[row][column], exz[row]);
      }
    }
    return exz;
  }

  // liste mit knotengrade
  function knotengrad(){
    var knotenGrade = []
    for(var i = 0; i < matrix_anzahl; i++) {
        knotenGrade[i] = knotengrad_von_knoten(i);
    }
    return knotenGrade;
  }

  // Liefert den Knotengrad des übergebenen Knotens zurück
  function knotengrad_von_knoten(knoten) {
      var knotenGrad = 0;
      if(knoten < matrix_anzahl) {
          for(var i = 0; i < matrix_anzahl; i++) {
              knotenGrad += matrix[knoten][i];
          }
      }
      return knotenGrad;


  }

  function kantenanzahl() {
    var anzahl = 0;
    for (var row = 0; row < matrix_anzahl; row++) {
      for (var column = 0; column < matrix_anzahl; column++) {
        if (matrix[row][column] == 1) {
          anzahl++;
        } 
      }
    }
    return Math.floor(anzahl/2);
  }

  function zusammenhaengend() {
    var weg = wegMatrix();
    for(var row = 0; row < matrix_anzahl; row++) {
        for(var column = 0; column < matrix_anzahl; column++) {
            if(weg[row][column] != 1) {
                return false;
            }
        }
    }
    return true;
  }

  function zentren() {
    var exz = exzentrizitaeten();
    var rad = radius();
    // Erstelle eine Liste (dynamisch) f�r die Knoten.
    z = [];
    for(var i = 0; i < exz.length; i++) {
        if(exz[i] == rad) {
            z.push(i + 1);
        }
    }
    return z;
  }

  function durchmesser() {
    var exz = exzentrizitaeten();
    for(var i = 0; i < exz.length; i++) {
        dm = Math.max(exz[i], exz[0]);
    }
    return dm;
  }

  function radius() {
    var exz = exzentrizitaeten();
    // Es wird angenommen, dass der 0. Wert der kleinste ist; das wird nur
    // gemacht, damit der Radius schon beim ersten Vergleich einen Werte aus
    // der Menge m�glicher Ergebnisse enth�lt.
    for(var i = 0; i < exz.length; i++) {
        ra = Math.min(exz[i], exz[0]);
    }
    return ra;   
  }

  function leeresArray(dimension) {
    l = []
    for (var i=0; i<dimension; i++) {
      l.push(0);
    }
    return l;
  }

  function leereMatrix(dimension) {
    l = []
    for (var i=0; i<dimension; i++) {
      a = [];
      for (var j=0; j<dimension; j++) {
        a.push(0);
      }
      l.push(a);
    }
    return l;
  }

  function update_matrizen() {
    var x = $(this).attr('x');
    var y = $(this).attr('y');

    new_value = ($(this).text() == 0) ? 1 : 0;
    matrix[x][y] = new_value;
    matrix[y][x] = new_value;

    zeichne_adjazenzmatrix();
    zeichne_wegmatrix();
    zeichne_distanzmatrix();
    zeichne_exzentritaeten();
    zeichne_radius();
    zeichne_durchmesser();
    zeichne_zentrum();
    zeichne_zusammenhaengend();
    zeichne_kantenanzahl();
    zeichne_knotenanzahl();
    return false;
  }

  function zeichne_kantenanzahl() {
    var html_table = $('#kantenanzahltable');
    html_table.html("");
    html_table.append('<b>Kanten: </b>');
    html_table.append('<span class="am_title">'+kantenanzahl()+'</span>');
    html_table.append('<br>');
  }

  function zeichne_knotenanzahl() {
    var html_table = $('#knotenanzahltable');
    html_table.html("");
    html_table.append('<b>Knoten: </b>');
    html_table.append('<span class="am_title">'+knotengrad()+'</span>');
    html_table.append('<br>');
  }

  function zeichne_zusammenhaengend() {
    var html_table = $('#zusammenhangtable');
    html_table.html("");
    html_table.append('<b>Zusammenhängend: </b>');
    html_table.append('<span class="am_title">'+((zusammenhaengend())?'Ja':'Nein')+'</span>');
    html_table.append('<br>');
  }

  function zeichne_zentrum() {
    var html_table = $('#zentrumtable');
    html_table.html("");
    html_table.append('<b>Zentrum: </b>');
    html_table.append('<span class="am_title">'+zentren()+'</span>');
    html_table.append('<br>');
  }

  function zeichne_durchmesser() {
    var html_table = $('#durchmessertable');
    html_table.html("");
    html_table.append('<b>Durchmesser: </b>');
    html_table.append('<span class="am_title">'+durchmesser()+'</span>');
    html_table.append('<br>');
  }

  function zeichne_radius() {
    var html_table = $('#radiustable');
    html_table.html("");
    html_table.append('<b>Radius: </b>');
    html_table.append('<span class="am_title">'+radius()+'</span>');
    html_table.append('<br>');
  }

  function zeichne_exzentritaeten() {
    var html_table = $('#exzentritaetentable');
    html_table.html("");
    var exz = exzentrizitaeten(); 
    html_table.append('<b>Exzentritaeten: </b>');
    for (var i = 0; i < matrix_anzahl; i++) {
      html_table.append('<span class="am_title">'+exz[i]+'</span>');
    }
    html_table.append('<br>');
  }

  function zeichne_adjazenzmatrix() {
      var html_table = $('#adjazenztable');
      html_table.html("");
      html_table.append('<span class="am_title am_with" style="width:17px;display:inline-block"></span>');
      for (var i = 1; i <= matrix_anzahl; i++) {
        html_table.append('<div class="am_title am_width">'+i+'</div>');
      }
      html_table.append('<br>');
      for (var i = 0; i < matrix_anzahl; i++) {
        html_table.append('<div class="am_title am_width">'+(i+1)+'</div>');
        for (var j = 0; j < matrix_anzahl; j++) {
            var link = $('<a x="'+i+'" y="'+j+'" href="" class="am_zelle am_width">'+matrix[i][j]+'</a>');
            link.click(update_matrizen);
            html_table.append(link);
        }
        html_table.append('<br>');
      }
  }


  function zeichne_wegmatrix() {
      var html_table = $('#wegmatrixtable');
      var wegmatrix = wegMatrix();
      html_table.html("");
      html_table.append('<span class="am_title">.</span>');
      for (var i = 1; i <= matrix_anzahl; i++) {
        html_table.append('<span class="am_title">'+i+'</span>');
      }
      html_table.append('<br>');
      for (var i = 0; i < matrix_anzahl; i++) {
        html_table.append('<span class="am_title am_width">'+(i+1)+'</span>');
        for (var j = 0; j < matrix_anzahl; j++) {
            var link = $('<span class="am_zelle am_width">'+(wegmatrix[i][j])+'</span>');
            html_table.append(link);
        }
        html_table.append('<br>');
      }
  }

  function zeichne_distanzmatrix() {
      var html_table = $('#distanzmatrixtable');
      var distanzmatrix = distanzMatrix();
      html_table.html("");
      html_table.append('<span class="am_title">.</span>');
      for (var i = 1; i <= matrix_anzahl; i++) {
        html_table.append('<span class="am_title">'+i+'</span>');
      }
      html_table.append('<br>');
      for (var i = 0; i < matrix_anzahl; i++) {
        html_table.append('<span class="am_title am_width">'+(i+1)+'</span>');
        for (var j = 0; j < matrix_anzahl; j++) {
            dmausgabe = (distanzmatrix[i][j] == -2000)? '∞' : distanzmatrix[i][j];
            var link = $('<span class="am_zelle am_width">'+dmausgabe+'</span>');
            html_table.append(link);
        }
        html_table.append('<br>');
      }
  }

  var matrix_anzahl = 1;
  var matrix = [];

  // initalize
  // gui elemente
  $("#adjazenzmatrix").hide();
  $("#wegmatrix").hide();
  $("#distanzmatrix").hide();
  $("#eigenschaften").hide();

  // event listeners
  $('#matrix_submit').click(function() {
      matrix_anzahl = $('#matrix_anzahl').val(); 


      // fuelle matrix array mit nullen
      for (var i = 0; i < matrix_anzahl; i++) {
          l = []
          for (var j = 0; j < matrix_anzahl; j++) {
            l.push(0)
          }
          matrix.push(l);
      }
      
      zeichne_adjazenzmatrix();
      zeichne_wegmatrix();
      zeichne_distanzmatrix();
      zeichne_exzentritaeten();
      zeichne_radius();
      zeichne_durchmesser();
      zeichne_zentrum();
      zeichne_zusammenhaengend();
      zeichne_kantenanzahl();
      zeichne_knotenanzahl();

      // gui elemente
      $('#form').hide();
      $("#adjazenzmatrix").show();
      $("#wegmatrix").show();
      $("#distanzmatrix").show();
      $("#eigenschaften").show();
      return false;
  });


});
