var datos;
var pizzas;

$(function () {
    $.get("./data/grupo.json", function (data) {
        mostrarGrupo(data.Asociacion.grupos);

    });
});

function mostrarGrupo(data) {
    $("#gruposyRamas").empty();
    datos = data;
    $.each(data, function (index, grupo) {
        agregarGrupo(grupo);
    });
}
function mostrarGrupo2() {
    mostrarGrupo(datos);
}

function agregarGrupo(grupo) {
    var nombre = $("<button type=\"button\" class=\"list-group-item\" onclick=\"mostrarRama(" + grupo.codigo + ")\"></button>").text(grupo.nombre);
    $("#gruposyRamas").append(nombre);

}

function mostrarRama(nombre_cod) {

    var raw;
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo.codigo)) {
            $("#gruposyRamas").empty();
            $.each(grupo.ramas, function (index, rama) {
                raw = $("<button type=\"button\" class=\"list-group-item\"></button>").text(rama.nombre);
            });
            $("#gruposyRamas").append(raw);
         
        }

    });
}




