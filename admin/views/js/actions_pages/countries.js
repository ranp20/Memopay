$(function(){
  listCountries();
});
var locationthisGET = window.location.href;
var domainthisGET = new URL(locationthisGET).origin;
var domainByControllers = domainthisGET+"/admin/";
// ------------ AGREGAR PAÍS
$(document).on('click', '#btnadd-country', function(e){
  e.preventDefault();
  var formdata = new FormData();
  var filelength = $('.images')[0].files.length;
  for (var i = 0;i < filelength; i ++) {
    formdata.append("imagen", $('.images')[0].files[i]);
  }
  formdata.append("name", $('#name').val());
  formdata.append("prefix", $('#prefix').val());
  $.ajax({
    url: domainbyadm.controllers+"c_add-country.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false,
  }).done((e) => {
    if(e == "true"){
      $('#form-add-country')[0].reset();
      listCountries();
      $('#addcountryModal').modal("hide");
    }else{
      console.log("Error, no se pudo guardar el registro.");
    }
  });
});
// ------------ LISTAR PAÍSES
function listCountries(searchVal){ 
  $.ajax({
    url: domainbyadm.controllers+"c_list-countries.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";
    if(response.length == 0){
      template = `
        <tr>
          <td colspan="7">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/icons/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;
      $("#tbl_countries").html(template);
    }else{
      response.forEach(e => {
      
      var img_route = "../admin/views/assets/img/flags/"+e.photo;
      var prefijo = e.prefix;
      var cuteprefijo = prefijo.substring(1, 7);

      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class='center'>${e.name}</td>
          <td class='center'>${e.prefix}</td>
          <td class="cont-img-table">
            <a href="${img_route}" target="_blank">
              <img loading="lazy" src="${img_route}">
            </a>
          </td>
          <td class="cont-btn-update">
            <a class="btn-update-country" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-name="${e.name}"
              data-prefix="${cuteprefijo}"
              data-photo="${img_route}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-country" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>
        </tr>
        `;
      }); 
      $("#tbl_countries").html(template);
    }
  });
}
// ------------ BUSCADOR DE PAÍSES
$(document).on('keyup', '#searchcountries', function() {
  var searchVal = $(this).val();
  if(searchVal != ""){
    listCountries(searchVal);
  }else{
    listCountries();
  }
});
// ------------ LISTAR DATOS DEL PAÍS EN EL
$(document).on('click', '.btn-update-country', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      prefix: $(this).attr('data-prefix'),
      name: $(this).attr('data-name'),
      photo: $(this).attr('data-photo'),
    };
    $('#idupdate-country').val(item_data['id']);
    $('#name-update').val(item_data['name']);
    $('#prefix-update').val(item_data['prefix']);
    $('#photo-update').attr('href', item_data['photo']);
  });
});
// ------------ ACTUALIZAR PAIS POR ID
$(document).on('submit', '#form-update-country', function(e){
  e.preventDefault();
  var formdata = new FormData();
  var filelength = $('.images-update')[0].files.length;
  for (var i = 0;i < filelength; i ++) {
    formdata.append("imagen", $('.images-update')[0].files[i]);
  }
  formdata.append("name", $('#name-update').val());
  formdata.append("prefix", $('#prefix-update').val());
  formdata.append("id", $('#idupdate-country').val());

  $.ajax({
    url: domainbyadm.controllers+"c_update-country.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e == "true"){
      listCountries();
      $('#updateModal').modal("hide");
    }else{
      console.log("Error, no se pudo actualizar el registro.");
    }
  });
});
// ------------ LISTAR ID DEL PAÍS EN EL MODAL
$(document).on('click', '.btn-delete-country', function(e){
  e.preventDefault();
  var id = $(this).attr('data-id');
  $('#iddelete-country').val(id);
});
// ------------ ELIMINAR PAÍS
$(document).on('click', '#btndelete-country', function(e){
  e.preventDefault();
	var id = $('#iddelete-country').val();
  $.ajax({
    url: domainbyadm.controllers+"c_delete-country.php",
    method: "POST",
    data: {id : id},
  }).done((e) => {
    if(e == "true"){
      $("#item-" + id).remove();
      $('#deleteModal').modal("hide");
      listCountries();
    }else{
      console.log("Error, no se pudo eliminar el registro");
    }
  });
});