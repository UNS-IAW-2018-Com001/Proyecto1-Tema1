var datos;
var pizzas;

$(function () {
    $.get("./data/grupo.json", function (data) {
       mostrarGrupo(data.Asociacion.grupos);
       initMap();
    });
});

function mostrarGrupo(data) {
    $("#gruposyRamas").empty();
    datos = data;
     
    $.each(data, function (index, grupo) {
        agregarGrupo(grupo);
    });
    
    $('#panelInfo').hide();
}

function mostrarGrupo2() {
    seleccionarTabGrupo();
    mostrarGrupo(datos);
}

function agregarGrupo(grupo) {
    var nombre = $("<button type=\"button\" class=\"list-group-item\" onclick=\"mostrarRama(" + grupo.codigo + ")\"></button>").text(grupo.nombre);
    $("#gruposyRamas").append(nombre);

}


function mostrarRama(nombre_cod) {
    mostrarInfoGrupo(nombre_cod);
    seleccionarTabRama();
    var raw;
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo.codigo)) {
            $("#gruposyRamas").empty();
            $.each(grupo.ramas, function (index, rama) {                         
                raw = $("<button type=\"button\" class=\"list-group-item\" onclick=\"mostrarInfoRama(" + rama.numeracion + ")\"></button>").text(rama.nombre);
             $("#gruposyRamas").append(raw);
            });
           
        }

    });
}
function mostrarInfoGrupo(nombre_cod) {
    $('#panelInfo').show();
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo.codigo)) {
            $("#boddy2").empty();
            $("#boddy2").append("<dt>Nombre grupo:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.nombre));

            $("#boddy2").append("<dt>Código:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.codigo));

            $("#boddy2").append("<dt>Fecha de creación:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.fecha_Creacion));

            $("#boddy2").append("<dt>Horario inicio:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.horario_Inicio));

            $("#boddy2").append("<dt>Horario finalización:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.horario_fin));

            $("#boddy2").append("<dt>Sitio web:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.sitio_web));

            $("#boddy2").append("<dt>Telefono:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.telefono));

            $("#boddy2").append("<dt>Email:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.email));

            $("#boddy2").append("<dt>Religion:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.religion));

            centrarMapa(grupo.ubicacion.latitud,grupo.ubicacion.longitud);
            crearGaleria(obtenerImagenesGrupo(nombre_cod));
        }
    });
    
}

function mostrarInfoRama(num) {
    $.each(datos, function (index, grupo) {
        $.each(grupo.ramas, function (index, rama) {
            if (num == rama.numeracion) {
                $("#boddy2").empty();
                $("#boddy2").append("<dt>Nombre rama:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.nombre));
                $("#boddy2").append("<dt>Edad minima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_minima));
                $("#boddy2").append("<dt>Edad maxima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_maxima));
                $("#boddy2").append("<dt>Fecha inicio inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaInscripcion_inicio));
                $("#boddy2").append("<dt>Fecha cierre inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaIscripcion_fin));
                $("#boddy2").append("<dt>Tipo:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.tipo));
          }

        });
    });
}

function seleccionarTabGrupo() {
                $("#id_rama").removeClass("active");
                $("#id_grupo").addClass("active");
            }
            function seleccionarTabRama() {
                $("#id_grupo").removeClass("active");
                $("#id_rama").addClass("active");
            }

function obtenerLocalizacionGrupos() {
    var retorno = new Array();
     $.each(datos, function (index, grupo) {
        var grupoI = new Array();        
        grupoI.push(grupo.nombre);
        grupoI.push(grupo.ubicacion.latitud);
        grupoI.push(grupo.ubicacion.longitud);
        grupoI.push(grupo.codigo);
        retorno.push(grupoI);  
   });
    return retorno;
}
function obtenerImagenesGrupo(nombre_cod) {
    var retorno = new Array();
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo.codigo)) {
            $.each(grupo.ramas, function (index, rama) {
                $.each(rama.fotos, function (index, foto){
                    retorno.push(foto);
                });
            });
        }
    });
    return retorno;
}
