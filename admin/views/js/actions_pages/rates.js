$(function(){
  listRates();
});
// ------------ LISTAR BANCOS
function listRates(){ 
  $.ajax({
    url: "../admin/controllers/c_list-rates.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var response = JSON.parse(res);
    var tmp_rates = "";
    if(response.length == 0){
      console.log("No ha registros");
    }else{
      tmp_rates += `<div class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls dataval-item" id="dataval-item" dataval-id="${response[0].id}">`;

      tmp_rates += `
        <div class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem">
          <label for="" class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem__label">Precio de Compra</label>
          <input type="text" id="buy_at" name="buy_at" class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem__input" value="${response[0].buy_at}" placeholder="precio de compra">
        </div>
        <div class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem">
          <label for="" class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem__label">Precio de Venta</label>
          <input type="text" id="sell_at" name="sell_at" class="cDash-adm--containRight--cContain__cBody__cardBody__contCol__cardGrpControls__ctrlItem__input" value="${response[0].sell_at}" placeholder="precio de venta">
        </div>
      `;

      tmp_rates += `</div>`;
      $("#valchange_ratesdollars").html(tmp_rates);
    }
  });
}
$(document).on("submit", "#frm-updateval_rates", function(e){
  e.preventDefault();
  var frmdata = new FormData();
  frmdata.append("buy_at", $("#buy_at").val());
  frmdata.append("sell_at", $("#sell_at").val());
  frmdata.append("id", $(".dataval-item").attr("dataval-id"));
  $.ajax({
    url: "../admin/controllers/c_update-rates.php",
    method: "POST",
    data: frmdata,
    contentType: false,
    cache: false,
    processData: false,
  }).done((e) => {
    if(e == "true"){
      Swal.fire({
        title: 'Éxito!',
        text: 'El registro ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 3500
      });
      listRates();
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'El formato no es válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
});