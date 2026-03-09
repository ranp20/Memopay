$(function(){
  listTranferBanks();
});
var locationthisGET = window.location.href;
var domainthisGET = new URL(locationthisGET).origin;
var domainByControllers = domainthisGET+"/admin/";
// ------------ LIMITAR EL MÁXIMO DE NÚMEROS EN NÚMERO DE CUENTA
$("#rucAccBank").on('keyup keypress blur change', function(e) {
    //return false if not 0-9
    ($(this).val() != 0) ? $("#msgErrNounNumbRUC").text("") : $("#msgErrNounNumbRUC").text("Debes ingresar el RUC");
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
    }else{
        //limit length but allow backspace so that you can still delete the numbers.
        if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
            return false;
        }
    }
});
$("#n_account").on('keyup keypress blur change', function(e) {
    //return false if not 0-9
    ($(this).val() != 0) ? $("#msgErrNounNumbAccount").text("") : $("#msgErrNounNumbAccount").text("Debes ingresar una cuenta");
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
    }else{
        //limit length but allow backspace so that you can still delete the numbers.
        if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
            return false;
        }
    }
});
// ------------ ABRIR/CERRAR EL LISTADO DE MONEDAS - AGREGAR
$(document).on("click", "#btn-FakeListTypeCurr", function(){
  $("#c-listitems-typecurrency").addClass("show");
   $.ajax({
    url: domainbyadm.controllers+"c_list-currency.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      result.forEach( (e) => {
        template += `
          <li class="cont-modalbootstrap__form--controlSelect--m--item" id="${e.id}" typeacc="${e.name}">${e.prefix}</li>
        `;
      });
      $("#c-listitems-typecurrency").html(template);
    }else{
      template += `
        <li class="cont-modalbootstrap__form--controlSelect--m--item">No se enconraron datos</li>
      `;
      $("#c-listitems-typecurrency").html(template);
    }
  });
});
// ------------ FIJAR EL PREFIJO EN EL FAKE SELECT
$(document).on("click", ".cont-modalbootstrap__form--controlSelect--m--item", function(){
  $("#msgErrNounTypeCurr").text("");
  $("#c-listitems-typecurrency").removeClass("show");
  $("#selectedItem-fakeSel").text($(this).text());
  $("#SelectedItem-inputfakesel").attr("typeacc", $(this).attr("typeacc"));
  $("#SelectedItem-inputfakesel").attr("idtypecurrency", $(this).attr("id"));
});
// ------------ ABRIR/CERRAR EL LISTADO DE TIPOS DE CUENTA - ACTUALIZAR
$(document).on("click", "#btn-FakeListTypeAccount", function(){
  $("#c-listitems-typeaccount").addClass("show");
   $.ajax({
    url: domainbyadm.controllers+"c_list-type-accounts.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      result.forEach( (e) => {
        template += `
          <li class="cont-modalbootstrap__form--controlSelect--m--itemAccount" id="${e.id}">${e.type}</li>
        `;
      });
      $("#c-listitems-typeaccount").html(template);
    }else{
      template += `
        <li class="cont-modalbootstrap__form--controlSelect--m--itemAccount">No se enconraron datos</li>
      `;
      $("#c-listitems-typeaccount").html(template);
    }
  });
});
// ------------ FIJAR EL PREFIJO EN EL FAKE SELECT
$(document).on("click", ".cont-modalbootstrap__form--controlSelect--m--itemAccount", function(){
  $("#msgErrNounTypeAccount").text("");
  $("#c-listitems-typeaccount").removeClass("show");
  $("#selectedItemAccount-fakeSel").text($(this).text());
  $("#SelectedItemAccount-inputfakesel").attr("idtypeaccount", $(this).attr("id"));
});
// ------------ VALIDAR SI EL NOMBRE DE BANCO ESTÁ VACÍO
$(document).on("keyup", "#nameAccBank", function(){
  ($(this).val() != 0) ? $("#msgErrNounNombBank").text("") : $("#msgErrNounNombBank").text("Debes ingresar un banco");
});
// ------------ AGREGAR BANCO DE TRANSACCIONES
$(document).on('submit', '#form-add-transferbank', function(e){
  e.preventDefault();

  ($("#SelectedItem-inputfakesel").attr("idtypecurrency")) ? $("#msgErrNounTypeCurr").text("") : $("#msgErrNounTypeCurr").text("Debes seleccionar la moneda");
  ($("#SelectedItemAccount-inputfakesel").attr("idtypeaccount")) ? $("#msgErrNounTypeAccount").text("") : $("#msgErrNounTypeAccount").text("Debes seleccionar un tipo");
  ($("#nameAccBank").val() != 0) ? $("#msgErrNounNombBank").text("") : $("#msgErrNounNombBank").text("Debes ingresar un banco");
  ($("#rucAccBank").val() != 0) ? $("#msgErrNounNumbRUC").text("") : $("#msgErrNounNumbRUC").text("Debes ingresar el RUC");
  ($("#n_account").val() != 0) ? $("#msgErrNounNumbAccount").text("") : $("#msgErrNounNumbAccount").text("Debes ingresar una cuenta");

  if($("#SelectedItem-inputfakesel").attr("idtypecurrency") && $("#SelectedItemAccount-inputfakesel").attr("idtypeaccount") && $("#nameAccBank").val() != 0 && $("#rucAccBank").val() != 0 && $("#n_account").val() != 0){
    var formdata = new FormData();
    var filelength = $('.images')[0].files.length;
    for (var i = 0;i < filelength; i ++) {
      formdata.append("imagen", $('.images')[0].files[i]);
    }

    formdata.append("name", $('#nameAccBank').val());
    formdata.append("n_account", $('#n_account').val());
    formdata.append("id_type_account", $("#SelectedItemAccount-inputfakesel").attr("idtypeaccount"));
    formdata.append("id_curr", $("#SelectedItem-inputfakesel").attr("idtypecurrency"));
    formdata.append("ruc", $('#rucAccBank').val());
    /*
    formdata.append("type_curr", $("#SelectedItem-inputfakesel").attr("typeacc"));
    formdata.append("prefix_curr", $("#selectedItem-fakeSel").text());
    */

    $.ajax({
      url: domainbyadm.controllers+"c_add-transferbank.php",
      method: "POST",
      data: formdata,
      contentType: false,
      cache: false,
      processData: false,
    }).done((res) => {

      $('#form-add-transferbank')[0].reset();
      $("#selectedItem-fakeSel").text("Seleccione una moneda");
      $("#selectedItemAccount-fakeSel").text("Seleccina un tipo");
      $("#SelectedItemAccount-inputfakesel").removeAttr("idtypeaccount");
      $("#SelectedItem-inputfakesel").removeAttr("typeacc");
      $("#SelectedItem-inputfakesel").removeAttr("idtypecurrency");
      listTranferBanks();
      $('#addtransferbanksModal').modal("hide");

    });
  }else{
    console.log('No hay datos');
  }

});
// ------------ LISTAR TRANFERBANKS
function listTranferBanks(searchVal){ 
  $.ajax({
    url: domainbyadm.controllers+"c_list-transferbanks.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done((res) => {
    var response = JSON.parse(res);
    var template = "";
    if(response.length == 0){
      template = `
        <tr>
          <td colspan="9">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/icons/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;
      $("#tbl_my-transferbanks").html(template);
    }else{
      response.forEach(e => {
      var img_route = "../admin/views/assets/img/transferbanks/"+e.photo;
      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class='center'>${e.name}</td>
          <td class='center'>${e.ruc}</td>
          <td class='center'>${e.tipo}</td>
          <td class='center'>${e.n_account}</td>
          <td class='center'>${e.moneda}</td>
          <td class="cont-img-table">
            <a href="${img_route}" target="_blank">
              <img loading="lazy" src="${img_route}">
            </a>
          </td>
          <td class="cont-btn-update">
            <a class="btn-update-transferbank" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-name="${e.name}"
              data-ruc="${e.ruc}"
              data-idtype-acc="${e.id_type_account}"
              data-type-acc="${e.tipo}"
              data-n_account="${e.n_account}"
              data-id_currency="${e.idcurr}"
              data-typecurr="${e.moneda}"
              data-prefixcurr="${e.prefix}"
              data-photo="${img_route}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-transferbank" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>
        </tr>
        `;
      });
      $("#tbl_my-transferbanks").html(template);
    }
  });
}
// ------------ BUSCADOR DE TRANSFBANKS
$(document).on('keyup', '#searchtransferbanks', function() {
  var searchVal = $(this).val();
  if(searchVal != ""){
    listTranferBanks(searchVal);
  }else{
    listTranferBanks();
  }
});
// ------------ ABRIR/CERRAR EL LISTADO DE MONEDAS - ACTUALIZAR
$(document).on("click", "#btn-FakeListTypeCurr-Update", function(){
  $("#c-listitems-typecurrency-Update").addClass("show");
   $.ajax({
    url: domainbyadm.controllers+"c_list-currency.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      result.forEach( (e) => {
        template += `
          <li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" typeacc="${e.name}">${e.prefix}</li>
        `;
      });
      $("#c-listitems-typecurrency-Update").html(template);
    }else{
      template += `
        <li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se enconraron datos</li>
      `;
      $("#c-listitems-typecurrency-Update").html(template);
    }
  });
});
// ------------ FIJAR EL PREFIJO EN EL FAKE SELECT - ACTUALIZAR MONEDA
$(document).on("click", ".cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
  $("#msgErrNounTypeCurr-update").text("");
  $("#c-listitems-typecurrency-Update").removeClass("show");
  $("#selectedItem-fakeSel-Update").text($(this).text());
  $("#SelectedItem-inputfakesel-Update").attr("typeacc", $(this).attr("typeacc"));
  $("#SelectedItem-inputfakesel-Update").attr("idtypecurrency", $(this).attr("id"));
});
// ------------ ABRIR/CERRAR EL LISTADO DE TIPOS DE CUENTA - ACTUALIZAR
$(document).on("click", "#btn-FakeListTypeAccount-Update", function(){
  $("#c-listitems-typeaccount-Update").addClass("show");
   $.ajax({
    url: domainbyadm.controllers+"c_list-type-accounts.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      result.forEach( (e) => {
        template += `
          <li class="cont-modalbootstrapupdate__form--controlSelect--m--itemAccount" id="${e.id}">${e.type}</li>
        `;
      });
      $("#c-listitems-typeaccount-Update").html(template);
    }else{
      template += `
        <li class="cont-modalbootstrapupdate__form--controlSelect--m--itemAccount">No se enconraron datos</li>
      `;
      $("#c-listitems-typeaccount-Update").html(template);
    }
  });
});
// ------------ FIJAR EL PREFIJO EN EL FAKE SELECT - ACTUALIZAR MONEDA
$(document).on("click", ".cont-modalbootstrapupdate__form--controlSelect--m--itemAccount", function(){
  $("#msgErrNounTypeAccount-update").text("");
  $("#c-listitems-typeaccount-Update").removeClass("show");
  $("#selectedItemAccount-fakeSel-update").text($(this).text());
  $("#SelectedItemAccount-inputfakesel-update").attr("idtypeaccount", $(this).attr("id"));
});
// ------------ LISTAR DATOS DEL TRANSFERBANKS EN EL MODAL
$(document).on('click', '.btn-update-transferbank', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      name: $(this).attr('data-name'),
      ruc: $(this).attr('data-ruc'),
      idtypeacc: $(this).attr('data-idtype-acc'),
      typeacc: $(this).attr('data-type-acc'),
      n_account: $(this).attr('data-n_account'),
      idcurr: $(this).attr('data-id_currency'),
      typecurr: $(this).attr('data-typecurr'),
      prefixcurr: $(this).attr('data-prefixcurr'),
      photo: $(this).attr('data-photo'),
    };
    $('#idupdate-transferbank').val(item_data['id']);
    $('#nameAccBank-update').val(item_data['name']);
    $('#rucAccBank-update').val(item_data['ruc']);
    $("#SelectedItemAccount-inputfakesel-update").attr("idtypeaccount", item_data['idtypeacc']);
    $("#selectedItemAccount-fakeSel-update").text(item_data['typeacc']);
    $('#n_account-update').val(item_data['n_account']);
    $("#SelectedItem-inputfakesel-Update").attr("typeacc", item_data['typecurr']);
    $("#SelectedItem-inputfakesel-Update").attr("idtypecurrency", item_data['idcurr']);
    $("#selectedItem-fakeSel-Update").text(item_data['prefixcurr']);
    $('#photo-update').attr('href', item_data['photo']);
  });
});
// ------------ VALIDAR SI EL NOMBRE DE BANCO ESTÁ VACÍO
$(document).on("keyup", "#nameAccBank-update", function(){
  ($(this).val() != 0) ? $("#msgErrNounNombBank-update").text("") : $("#msgErrNounNombBank-update").text("Debes ingresar un banco");
});
// ------------ LIMITAR EL MÁXIMO DE NÚMEROS EN NÚMERO DE CUENTA
$("#rucAccBank-update").on('keyup keypress blur change', function(e) {
    //return false if not 0-9
    ($(this).val() != 0) ? $("#msgErrNounNumbRUC-update").text("") : $("#msgErrNounNumbRUC-update").text("Debes ingresar el RUC");
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
    }else{
        //limit length but allow backspace so that you can still delete the numbers.
        if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
            return false;
        }
    }
});
$("#n_account-update").on('keyup keypress blur change', function(e) {
    //return false if not 0-9
    ($(this).val() != 0) ? $("#msgErrNounNumbAccount-update").text("") : $("#msgErrNounNumbAccount-update").text("Debes ingresar una cuenta");
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
    }else{
        //limit length but allow backspace so that you can still delete the numbers.
        if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
            return false;
        }
    }
});
// ------------ ACTUALIZAR TRANSFERBANKS POR ID
$(document).on('submit', '#form-update-transferbank', function(e){
  e.preventDefault();

  ($("#SelectedItem-inputfakesel-Update").attr("idtypecurrency")) ? $("#msgErrNounTypeCurr-update").text("") : $("#msgErrNounTypeCurr-update").text("Debes seleccionar la moneda");
  ($("#nameAccBank-update").val() != 0) ? $("#msgErrNounNombBank-update").text("") : $("#msgErrNounNombBank-update").text("Debes ingresar un banco");
  ($("#rucAccBank-update").val() != 0) ? $("#msgErrNounNumbRUC-update").text("") : $("#msgErrNounNumbRUC-update").text("Debes ingresar el RUC");
  ($("#n_account-update").val() != 0) ? $("#msgErrNounNumbAccount-update").text("") : $("#msgErrNounNumbAccount-update").text("Debes ingresar una cuenta");

  if($("#SelectedItem-inputfakesel-Update").attr("idtypecurrency") && $("#nameAccBank-update").val() != 0 && $("#rucAccBank-update").val() != 0 && $("#n_account-update").val() != 0){
    
    var formdata = new FormData();
    var filelength = $('.images-update')[0].files.length;
    for (var i = 0;i < filelength; i ++) {
      formdata.append("imagen", $('.images-update')[0].files[i]);
    }
    formdata.append("name", $('#nameAccBank-update').val());
    formdata.append("n_account", $('#n_account-update').val());
    formdata.append("idtypeacc", $("#SelectedItemAccount-inputfakesel-update").attr("idtypeaccount"));
    formdata.append("id_curr", $("#SelectedItem-inputfakesel-Update").attr("idtypecurrency"));
    formdata.append("ruc", $('#rucAccBank-update').val());
    /*
    formdata.append("type_curr", $("#SelectedItem-inputfakesel-Update").attr("typeacc"));
    formdata.append("prefix_curr", $("#selectedItem-fakeSel-Update").text());
    */
    formdata.append("id", $("#idupdate-transferbank").val());

    $.ajax({
      url: domainbyadm.controllers+"c_update-transferbanks.php",
      method: "POST",
      data: formdata,
      contentType: false,
      cache: false,
      processData: false
    }).done((e) => {
      if(e == "true"){
        listTranferBanks();
        $('#updateModal').modal("hide");
      }else{
        console.log('Error, no se pudo actualizar el registro.');
      }
    });
  }else{
    console.log('No hay datos');
  }
});
// ------------ LISTAR ID DEL TRANSFERBANK EN EL MODAL
$(document).on('click', '.btn-delete-transferbank', function(e){
  e.preventDefault();
  var id = $(this).attr('data-id');
  $('#iddelete-transferbank').val(id);
});
// ------------ ELIMINAR TRANSFERBANK
$(document).on('click', '#btndelete-transferbank', function(e){
  e.preventDefault();
	var id = $('#iddelete-transferbank').val();
  $.ajax({
    url: domainbyadm.controllers+"c_delete-transferbanks.php",
    method: "POST",
    data: {id : id},
  }).done((e) => {
    if(e == "true"){
      $("#item-" + id).remove();
      $('#deleteModal').modal("hide");
      listTranferBanks();
    }else{
      console.log("Error, no se pudo eliminar el registro");
    }
  });
});