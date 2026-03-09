$(function(){
  listBanks();
});
var locationthisGET = window.location.href;
var domainthisGET = new URL(locationthisGET).origin;
var domainByControllers = domainthisGET+"/admin/";
// ------------ AGREGAR BANCO
$(document).on('submit', '#form-add-bank', function(e){
  e.preventDefault();
  var formdata = new FormData();
  var filelength = $('.images')[0].files.length;
  for (var i = 0;i < filelength; i ++) {
    formdata.append("imagen", $('.images')[0].files[i]);
  }
  formdata.append("name", $('#name').val());
  $.ajax({
    url: domainbyadm.controllers+"c_add-bank.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false,
  }).done((e) => {
    if(e == "true"){
      $('#form-add-bank')[0].reset();
      listBanks();
      $('#addbankModal').modal("hide");
    }else{
      console.log("Error, no se pudo guardar el registro.");
    }
  });
});
// ------------ LISTAR RESULTADOS
function listBanks(searchVal){ 
  $.ajax({
    url: domainbyadm.controllers+"c_list-banks.php",
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
              <img src="../admin/views/assets/img/icons/icon-sad-face.svg" alt="img_noun-img" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;
      $("#tbl_banks").html(template);
    }else{
      $.each(response, function(i,e){
        var img_route = "../admin/views/assets/img/banks/"+e.photo;
        template += `
          <tr id="item-${e.id}">
            <td class='center'>${e.id}</td>
            <td class='center'>${e.name}</td>
            <td class="cont-img-table">
              <a href="${img_route}" target="_blank">
                <img src="${img_route}" alt="img_bank-${i}" loading="lazy" class="img-fluid">
              </a>
            </td>
            <td class="cont-btn-update">
              <a class="btn-update-bank" data-toggle="modal" data-target="#updateModal"  href="#" 
                data-id="${e.id}"
                data-name="${e.name}"
                data-photo="${img_route}"
                >Editar</a>
            </td>
            <td class="cont-btn-delete" id="cont-btn-delete">
              <a class="btn-delete-bank" data-toggle="modal" data-target="#deleteModal" href="#"
                data-id="${e.id}"
                >Eliminar</a>
            </td>
          </tr>
          `;
      });
      $("#tbl_banks").html(template);
    }
  });
}
// ------------ BUSCADOR EN TIEMPO REAL
$(document).on('keyup', '#searchbanks', function() {
  var searchVal = $(this).val();
  if(searchVal != ""){
    listBanks(searchVal);
  }else{
    listBanks();
  }
});
// ------------ LISTAR DATOS EN EL MODAL
$(document).on('click', '.btn-update-bank', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      name: $(this).attr('data-name'),
      photo: $(this).attr('data-photo'),
    };
    $('#idupdate-bank').val(item_data['id']);
    $('#name-update').val(item_data['name']);
    $('#photo-update').attr('href', item_data['photo']);
  });
});
// ------------ ACTUALIZAR POR ID
$(document).on('submit', '#form-update-bank', function(e){
  e.preventDefault();
  var formdata = new FormData();
  var filelength = $('.images-update')[0].files.length;
  for (var i = 0;i < filelength; i ++) {
    formdata.append("imagen", $('.images-update')[0].files[i]);
  }
  formdata.append("name", $('#name-update').val());
  formdata.append("id", $('#idupdate-bank').val());

  $.ajax({
    url: domainbyadm.controllers+"c_update-bank.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e == "true"){
      listBanks();
      $('#updateModal').modal("hide");
    }else{
      console.log("Error, no se pudo actualizar el registro.");
    }
  });
});
// ------------ LISTAR ID DEL PAÍS EN EL MODAL
$(document).on('click', '.btn-delete-bank', function(e){
  e.preventDefault();
  var id = $(this).attr('data-id');
  $('#iddelete-bank').val(id);
});
// ------------ ELIMINAR PAÍS
$(document).on('click', '#btndelete-bank', function(e){
  e.preventDefault();
	var id = $('#iddelete-bank').val();
  $.ajax({
    url: domainbyadm.controllers+"c_delete-bank.php",
    method: "POST",
    data: {id : id},
  }).done((e) => {
    if(e == "true"){
      $("#item-" + id).remove();
      $('#deleteModal').modal("hide");
      listBanks();
    }else {
      console.log("Error, no se pudo eliminar el registro");
    }
  });
});