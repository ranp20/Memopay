$(() => {
  //listClients();
  listAllClients();
});
var locationthisGET = window.location.href;
var domainthisGET = new URL(locationthisGET).origin;
var domainByControllers = domainthisGET+"/admin/";
$(document).on('change', '#selOpts-ValidBiometricFilter', function(e){
  var optionSel = $(this).find("option:selected").attr("data-short");
  var optionSelText = $(this).find("option:selected").text();
  console.log(optionSel);
  console.log(optionSelText);
  $("#title-shortOption").text(optionSelText);
  if(optionSel == "notvalidated" || optionSel == "notvalidated"){
    $("#title-shortOption").removeClass("completed");
    $("#title-shortOption").removeClass("cancel");
    $("#title-shortOption").removeClass("in_review");
    $("#title-shortOption").addClass("processed");
  }else if(optionSel == "inreview"){
    $("#title-shortOption").removeClass("completed");
    $("#title-shortOption").removeClass("cancel");
    $("#title-shortOption").removeClass("processed");
    $("#title-shortOption").addClass("in_review");
  }else if(optionSel == "validated"){
    $("#title-shortOption").removeClass("processed");
    $("#title-shortOption").removeClass("cancel");
    $("#title-shortOption").removeClass("in_review");
    $("#title-shortOption").addClass("completed");
  }else{
    $("#title-shortOption").removeClass("completed");
    $("#title-shortOption").removeClass("processed");
    $("#title-shortOption").removeClass("in_review");
    $("#title-shortOption").addClass("cancel");
  }
  listAllClients(optionSel);
});
var listAllClients = (optionSel = null) => {
  var tblClients = $("#tbl_clients").DataTable({
    "destroy": true,
    "ajax":{
      "url": domainbyadm.controllers+"c_list-clients_byTypeValidationBio.php",
      "data": { option : optionSel },
      "type": "POST",
    },
    "columns":[
      {"data":"id"},
      {"data":"email"},
      {"data":"telephone"},
      {"data":"name"},
      {"data":"lastname"},
      {"data":"type"},
      {"data":"document"},
      {"data":"sex"},
      {"data":"id",
        "render": function ( data, type, row ){
          var idCient = row.id;
          var tmpBtnDetail = "";
          tmpBtnDetail += `<div class="cont-btn-details center">
            <a class="btn-update-detail" href="detallecliente/${idCient}">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="27px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m495.6 43.512h-291.2c-16.336 0-32.004 6.4922-43.555 18.043-11.555 11.551-18.043 27.219-18.043 43.559v349.77c0 16.34 6.4883 32.008 18.043 43.559 11.551 11.551 27.219 18.043 43.555 18.043h291.2c16.336 0 32.004-6.4922 43.555-18.043 11.555-11.551 18.043-27.219 18.043-43.559v-349.77c0-16.34-6.4883-32.008-18.043-43.559-11.551-11.551-27.219-18.043-43.555-18.043zm28 411.38c0 7.4258-2.9531 14.551-8.2031 19.801s-12.371 8.1992-19.797 8.1992h-291.2c-7.4258 0-14.547-2.9492-19.797-8.1992s-8.2031-12.375-8.2031-19.801v-349.77c0-7.4258 2.9531-14.551 8.2031-19.801s12.371-8.1992 19.797-8.1992h291.2c7.4258 0 14.547 2.9492 19.797 8.1992s8.2031 12.375 8.2031 19.801z"/><path d="m251.16 266h-27.719c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.605 0 16.801 3 5.1992 8.5469 8.4023 14.551 8.4023h27.719c6 0 11.547-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.801-3.0039-5.1953-8.5508-8.3984-14.551-8.3984z"/><path d="m476.56 266h-164.13c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.605 0 16.801 3 5.1992 8.5469 8.4023 14.551 8.4023h164.13c6.0039 0 11.551-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.801-3-5.1953-8.5469-8.3984-14.551-8.3984z"/><path d="m251.16 165.2h-27.719c-6.0039 0-11.551 3.2031-14.551 8.4023-3 5.1953-3 11.602 0 16.797 3 5.1992 8.5469 8.4023 14.551 8.4023h27.719c6 0 11.547-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.797-3.0039-5.1992-8.5508-8.4023-14.551-8.4023z"/><path d="m476.56 165.2h-164.13c-6.0039 0-11.551 3.2031-14.551 8.4023-3 5.1953-3 11.602 0 16.797 3 5.1992 8.5469 8.4023 14.551 8.4023h164.13c6.0039 0 11.551-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.797-3-5.1992-8.5469-8.4023-14.551-8.4023z"/><path d="m251.16 366.8h-27.719c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.602 0 16.801s8.5469 8.3984 14.551 8.3984h27.719c6 0 11.547-3.1992 14.551-8.3984 3-5.1992 3-11.602 0-16.801-3.0039-5.1953-8.5508-8.3984-14.551-8.3984z"/><path d="m476.56 366.8h-164.13c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.602 0 16.801s8.5469 8.3984 14.551 8.3984h164.13c6.0039 0 11.551-3.1992 14.551-8.3984s3-11.602 0-16.801c-3-5.1953-8.5469-8.3984-14.551-8.3984z"/></g></svg>
              </span>
            </a>
          </div>`;
          return tmpBtnDetail;
        }
      },
    ],
    "language":{
      "processing": "Procesando...",
      "lengthMenu": "Mostrar _MENU_ registros",
      "zeroRecords": "No se encontraron resultados",
      "emptyTable": "Ningún dato disponible en esta tabla",
      "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
      "infoFiltered": "(filtrado de un total de _MAX_ registros)",
      "search": "Buscar:",
      "infoThousands": ",",
      "loadingRecords": "Cargando...",
      "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
      },
      "aria": {
          "sortAscending": ": Activar para ordenar la columna de manera ascendente",
          "sortDescending": ": Activar para ordenar la columna de manera descendente"
      },
      "buttons": {
          "copy": "Copiar",
          "colvis": "Visibilidad",
          "collection": "Colección",
          "colvisRestore": "Restaurar visibilidad",
          "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
          "copySuccess": {
              "1": "Copiada 1 fila al portapapeles",
              "_": "Copiadas %d fila al portapapeles"
          },
          "copyTitle": "Copiar al portapapeles",
          "csv": "CSV",
          "excel": "Excel",
          "pageLength": {
              "-1": "Mostrar todas las filas",
              "1": "Mostrar 1 fila",
              "_": "Mostrar %d filas"
          },
          "pdf": "PDF",
          "print": "Imprimir"
      },
      "autoFill": {
          "cancel": "Cancelar",
          "fill": "Rellene todas las celdas con <i>%d<\/i>",
          "fillHorizontal": "Rellenar celdas horizontalmente",
          "fillVertical": "Rellenar celdas verticalmentemente"
      },
      "decimal": ",",
      "searchBuilder": {
          "add": "Añadir condición",
          "button": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
          },
          "clearAll": "Borrar todo",
          "condition": "Condición",
          "conditions": {
              "date": {
                  "after": "Despues",
                  "before": "Antes",
                  "between": "Entre",
                  "empty": "Vacío",
                  "equals": "Igual a",
                  "notBetween": "No entre",
                  "notEmpty": "No Vacio",
                  "not": "Diferente de"
              },
              "number": {
                  "between": "Entre",
                  "empty": "Vacio",
                  "equals": "Igual a",
                  "gt": "Mayor a",
                  "gte": "Mayor o igual a",
                  "lt": "Menor que",
                  "lte": "Menor o igual que",
                  "notBetween": "No entre",
                  "notEmpty": "No vacío",
                  "not": "Diferente de"
              },
              "string": {
                  "contains": "Contiene",
                  "empty": "Vacío",
                  "endsWith": "Termina en",
                  "equals": "Igual a",
                  "notEmpty": "No Vacio",
                  "startsWith": "Empieza con",
                  "not": "Diferente de"
              },
              "array": {
                  "not": "Diferente de",
                  "equals": "Igual",
                  "empty": "Vacío",
                  "contains": "Contiene",
                  "notEmpty": "No Vacío",
                  "without": "Sin"
              }
          },
          "data": "Data",
          "deleteTitle": "Eliminar regla de filtrado",
          "leftTitle": "Criterios anulados",
          "logicAnd": "Y",
          "logicOr": "O",
          "rightTitle": "Criterios de sangría",
          "title": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
          },
          "value": "Valor"
      },
      "searchPanes": {
          "clearMessage": "Borrar todo",
          "collapse": {
              "0": "Paneles de búsqueda",
              "_": "Paneles de búsqueda (%d)"
          },
          "count": "{total}",
          "countFiltered": "{shown} ({total})",
          "emptyPanes": "Sin paneles de búsqueda",
          "loadMessage": "Cargando paneles de búsqueda",
          "title": "Filtros Activos - %d"
      },
      "select": {
          "1": "%d fila seleccionada",
          "_": "%d filas seleccionadas",
          "cells": {
              "1": "1 celda seleccionada",
              "_": "$d celdas seleccionadas"
          },
          "columns": {
              "1": "1 columna seleccionada",
              "_": "%d columnas seleccionadas"
          }
      },
      "thousands": ".",
      "datetime": {
          "previous": "Anterior",
          "next": "Proximo",
          "hours": "Horas",
          "minutes": "Minutos",
          "seconds": "Segundos",
          "unknown": "-",
          "amPm": [
              "am",
              "pm"
          ]
      },
      "editor": {
          "close": "Cerrar",
          "create": {
              "button": "Nuevo",
              "title": "Crear Nuevo Registro",
              "submit": "Crear"
          },
          "edit": {
              "button": "Editar",
              "title": "Editar Registro",
              "submit": "Actualizar"
          },
          "remove": {
              "button": "Eliminar",
              "title": "Eliminar Registro",
              "submit": "Eliminar",
              "confirm": {
                  "_": "¿Está seguro que desea eliminar %d filas?",
                  "1": "¿Está seguro que desea eliminar 1 fila?"
              }
          },
          "error": {
              "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
          },
          "multi": {
              "title": "Múltiples Valores",
              "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
              "restore": "Deshacer Cambios",
              "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
          }
      },
      "info": "Mostrando _START_ - _END_ de _TOTAL_ registros"
    },
    "responsive": "false",
    "dom": 'Bfrtilp',
    "buttons": [
      {
        "extend": 'excelHtml5',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m383.04 424.43v-298.93h-24.137c-61.992 11.199-123.82 21.559-186.03 32.312v282.74c61.207 10.809 123.2 21.617 184.8 32.816h25.199v-48.941zm-91.168-62.051c-7.7188-16.508-14.488-33.449-20.27-50.734-5.6016 16.406-13.328 31.863-19.656 47.938-8.8477 0-17.695-0.50391-26.543-0.83984 10.359-20.328 20.383-40.824 31.078-60.984-9.0703-20.832-19.098-41.215-28.449-61.879l26.77-1.5156c5.9922 15.793 12.602 31.414 17.586 47.602 5.6016-17.191 13.273-33.602 20.105-49.953 9.1484-0.63281 18.312-1.1953 27.496-1.6797-10.758 22.102-21.602 44.258-32.539 66.473 11.199 22.398 22.398 45.078 33.602 67.703-9.7461-0.78516-19.434-1.3984-29.18-2.1289z"/><path d="m393.23 164.25v21.449h42.84v31.641h-42.84v17.359h42.84v31.641h-42.84v17.359h42.84v31.586h-42.84v17.359h42.84v31.359h-42.84v18.367h42.84v30.633h-42.84v21.449h147.95v-270.2zm115.3 248.98h-62.27v-30.629h62.27zm0-49h-62.27v-31.637h62.27zm0-49h-62.27v-31.582h62.27zm0-49h-62.27v-31.582h62.27zm0-49h-62.27v-31.527h62.27z"/></g></svg>`,
        "titleAttr": 'Exportar a Excel',
        "className": 'btn btn-success'
      },
      {
        "extend": 'pdfHtml5',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m190.92 4.125c-23.449 0-42.523 19.023-42.523 42.406v466.94c0 23.383 19.074 42.406 42.52 42.406h318.16c23.449 0 42.523-19.023 42.523-42.406v-352.67c0-2.7422-1.0625-5.3789-2.9688-7.3594l-140.57-146.06c-2-2.0781-4.7617-3.2539-7.6484-3.2539h-209.5zm0 21.219h190.91v137.94c0 5.8594 4.75 10.609 10.609 10.609h137.94v339.57c0 11.68-9.5547 21.188-21.297 21.188h-318.16c-11.746 0-21.301-9.5039-21.301-21.188v-466.94c0-11.68 9.5547-21.188 21.301-21.188zm212.13 7.4258 115.39 119.9h-115.39zm-57.367 129.7c-2.6289-0.03125-5.5781 0.30078-8.8711 1.125-8.3125 2.0781-21.688 10.195-17.871 41.219 1.6875 13.707 6.707 31.168 14.145 49.969-4 12.531-8.4531 25.633-12.832 38.512-4.125 12.133-8.3945 24.68-12.191 36.504h-0.003906c-3.0469 9.4883-5.8398 18.457-8.4766 26.938-3.6953 11.883-7.0469 22.652-10.336 32.402-56.73 32.211-79.395 60.109-80.781 77.273-0.56641 6.9727 2.1602 13.035 7.4766 16.625 2.668 1.8008 6.4922 3.3242 11.809 3.3242 5.3438 0 12.195-1.5391 20.883-5.8828 30.621-15.312 45.078-40.629 57.973-76.707 10.895-5.9609 23.238-12.191 37.223-18.645 22.055-10.176 40.836-16.461 56.613-20.156 18.246 19.164 37.547 31.742 55.656 31.742 19.699 0 33.594-6.5117 38.121-17.859 3.3359-8.3672 0.78906-17.672-6.8203-24.887-10.805-10.246-30.027-15.5-54.086-14.812-7.9883 0.23047-16.434 1.1328-25.258 2.6836-19.996-24-39.41-57.328-52.453-88.008 13.367-43.137 18.25-71.324 6.0625-84.562-3.0469-3.3086-8.0898-6.7031-15.984-6.8008zm-0.15625 21.199c0.35938 0.003906 0.54297 0.023437 0.55078 0 0.37891 0.46484 4.2539 6.125-2.7148 35.328-1.582-6.0156-2.7266-11.656-3.3555-16.773-1.5664-12.738 0.68359-17.723 1.9492-18.039 1.8047-0.44922 2.9531-0.51172 3.5664-0.51172zm0.40234 99.945c10.969 22.223 24.48 44.574 39.207 63.48-15.984 4.4648-32.855 10.754-50.195 18.758-6.5508 3.0234-12.812 6.0273-18.777 9 1.207-3.8438 2.4336-7.7852 3.6914-11.816 2.6172-8.418 5.3906-17.328 8.418-26.746h-0.003906c3.7461-11.656 7.9844-24.117 12.082-36.168 1.9336-5.6797 3.7969-11.18 5.582-16.516zm89.035 76.734c19.047-0.30859 29.434 3.9492 32.637 5.5469 4.5195 2.2578 6.25 4.4414 6.7109 5.3359-1.1367 1.2422-6.0703 4.2578-18.211 4.2578-9.0234 0-19.262-5.5078-29.836-14.707 3.0781-0.25391 5.9766-0.39062 8.6953-0.43359zm-158.72 61.656c-8.9922 18.227-19.879 30.883-37.098 39.492-3.7852 1.8945-6.5859 2.8125-8.5312 3.25 3.2539-7.1406 15.152-22.461 45.629-42.742z"/></g></svg>`,
        "titleAttr": 'Exportar a PDF',
        "className": 'btn btn-danger'
      }
      ,
      {
        "extend": 'print',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1" viewBox="0 0 700 700"><g><path d="m525 70c0-19.32-15.68-35-35-35h-280c-19.32 0-35 15.68-35 35v35h350z"/><path d="m560 140h-420c-19.32 0-35 15.68-35 35v210c0 19.32 15.68 35 35 35h35v70c0 19.32 15.68 35 35 35h280c19.32 0 35-15.68 35-35v-70h35c19.32 0 35-15.68 35-35v-210c0-19.32-15.68-35-35-35zm-70 350h-280v-175h280zm35-245h-70v-35h70z"/><path d="m245 420h105v35h-105z"/><path d="m245 350h210v35h-210z"/></g></svg>`,
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },
    ]
  });
};
/*
// ------------ LISTAR BANCOS
function listClients(searchVal){ 
  $.ajax({
    url: domainbyadm.controllers+"c_list-clients.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done((e) => {
    var r = JSON.parse(e);
    var template = "";
    if(r.length == 0){
      template = `
      <tr>
        <td colspan="9">
          <div class="msg-non-results-res">
            <img src="../admin/views/assets/img/icons/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
            <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
          </div>
        </td>
      </tr>`;
      $("#tbl_clients").html(template);
    }else{
      $.each(r, function(i,v){
        template += `
        <tr id="item-${v.id}">
          <td class='center'>${v.id}</td>
          <td>${v.email}</td>
          <td class='center'>${v.telephone}</td>
          <td>${v.name}</td>
          <td>${v.lastname}</td>
          <td class='center'>${v.type}</td>
          <td class='center'>${v.document}</td>
          <td class='center'>${v.sex}</td>
          <td class='cont-btn-update center'>
            <a class="btn-update-client" data-toggle="modal" data-target="#updateModal" href="javascript:void(0);"
              data-id='${v.id}'
              data-list-coupons='${v.id_coupons}'
            >Editar</a>
          </td>
          <td class='cont-btn-details center'>
            <a class="btn-update-detail" href="detallecliente/${v.id}">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="27px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m495.6 43.512h-291.2c-16.336 0-32.004 6.4922-43.555 18.043-11.555 11.551-18.043 27.219-18.043 43.559v349.77c0 16.34 6.4883 32.008 18.043 43.559 11.551 11.551 27.219 18.043 43.555 18.043h291.2c16.336 0 32.004-6.4922 43.555-18.043 11.555-11.551 18.043-27.219 18.043-43.559v-349.77c0-16.34-6.4883-32.008-18.043-43.559-11.551-11.551-27.219-18.043-43.555-18.043zm28 411.38c0 7.4258-2.9531 14.551-8.2031 19.801s-12.371 8.1992-19.797 8.1992h-291.2c-7.4258 0-14.547-2.9492-19.797-8.1992s-8.2031-12.375-8.2031-19.801v-349.77c0-7.4258 2.9531-14.551 8.2031-19.801s12.371-8.1992 19.797-8.1992h291.2c7.4258 0 14.547 2.9492 19.797 8.1992s8.2031 12.375 8.2031 19.801z"/><path d="m251.16 266h-27.719c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.605 0 16.801 3 5.1992 8.5469 8.4023 14.551 8.4023h27.719c6 0 11.547-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.801-3.0039-5.1953-8.5508-8.3984-14.551-8.3984z"/><path d="m476.56 266h-164.13c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.605 0 16.801 3 5.1992 8.5469 8.4023 14.551 8.4023h164.13c6.0039 0 11.551-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.801-3-5.1953-8.5469-8.3984-14.551-8.3984z"/><path d="m251.16 165.2h-27.719c-6.0039 0-11.551 3.2031-14.551 8.4023-3 5.1953-3 11.602 0 16.797 3 5.1992 8.5469 8.4023 14.551 8.4023h27.719c6 0 11.547-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.797-3.0039-5.1992-8.5508-8.4023-14.551-8.4023z"/><path d="m476.56 165.2h-164.13c-6.0039 0-11.551 3.2031-14.551 8.4023-3 5.1953-3 11.602 0 16.797 3 5.1992 8.5469 8.4023 14.551 8.4023h164.13c6.0039 0 11.551-3.2031 14.551-8.4023 3-5.1953 3-11.602 0-16.797-3-5.1992-8.5469-8.4023-14.551-8.4023z"/><path d="m251.16 366.8h-27.719c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.602 0 16.801s8.5469 8.3984 14.551 8.3984h27.719c6 0 11.547-3.1992 14.551-8.3984 3-5.1992 3-11.602 0-16.801-3.0039-5.1953-8.5508-8.3984-14.551-8.3984z"/><path d="m476.56 366.8h-164.13c-6.0039 0-11.551 3.2031-14.551 8.3984-3 5.1992-3 11.602 0 16.801s8.5469 8.3984 14.551 8.3984h164.13c6.0039 0 11.551-3.1992 14.551-8.3984s3-11.602 0-16.801c-3-5.1953-8.5469-8.3984-14.551-8.3984z"/></g></svg>
              </span>
            </a>
          </td>
        </tr>`;
      });
      $("#tbl_clients").html(template);
    }
  });
}
// ------------ BUSCADOR DE RESTAURANTES
$(document).on('keyup', '#searchclients', function(e) {
  var searchVal = e.target.value;
  if(searchVal != ""){
    listClients(searchVal);
  }else{
    listClients();
  }
});
// ------------ ACTUALIZAR POR ID
$(document).on('submit', '#form-update-client', function(e){
  e.preventDefault();
  var formdata = $(this).serializeArray();
  $.ajax({
    url: domainbyadm.controllers+"c_update-client-coupon.php",
    method: "POST",
    dataType: 'JSON',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: formdata,
    // method: "POST",
    // data: formdata,
    // contentType: false,
    // cache: false,
    // processData: false
  }).done((e) => {
    console.log(e);    
    //window.location.href = "clientes";
    
    if(e.res == "updated"){
      listClients();
      $('#updateModal').modal("hide");
      Swal.fire({
        title: 'Éxito!',
        text: 'El cupón se ha actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      window.location.href = "clientes";
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'El cupón no se ha actualizado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
});
*/