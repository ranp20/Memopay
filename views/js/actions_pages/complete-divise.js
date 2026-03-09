$(() => {
	// ------------ MOSTRAR/OCULTAR EL FORMULARIO DE AGREGAR CUENTA BANCARIA
	const btn_frmOpenAddAccount = document.querySelector("#btn-addAccountform");
	const btn_frmCloseAddAccount = document.querySelector("#icon_frmbtnClose");
	const c_totalfrmAddAccount = document.querySelector(".cformAddAccountBank");
	const c_containfrmAddAccount = document.querySelector(".cformAddAccountBank--form");

	if(btn_frmOpenAddAccount != null && btn_frmOpenAddAccount != undefined){
		btn_frmOpenAddAccount.addEventListener("click", function(){
			c_totalfrmAddAccount.classList.add("show");
			c_containfrmAddAccount.classList.add("show");

			$("#selListAllBanks--img_CData").find("span").text("Selecciona un banco");
			$("#selListAllBanks--img_CData").find("img").attr("src", "");
			$("#selListallBanks_CData").find("input").removeAttr("idbank");
			$("#selListAllaccountsBanks--img_CData").find("span").text("Selecciona una de tus cuentas");
			$("#selListAllaccountsBanks--img_CData").find("span").css({"margin-right":"0"});
			$("#selListAllaccountsBanks--img_CData").find("img").attr("src", "");
			$("#selListallaccountsBanks_CData").find("input").removeAttr("idaccountbank");
		});
	}
	c_totalfrmAddAccount.addEventListener('click', e => {
		if(e.target === c_totalfrmAddAccount){
			c_totalfrmAddAccount.classList.remove('show');
		}
	});
	btn_frmCloseAddAccount.addEventListener("click", function(){
		c_totalfrmAddAccount.classList.remove("show");
		c_containfrmAddAccount.classList.remove("show");
	});
});
$(document).on("click", "#btn-addAccountform", function(){
	$(".cformAddAccountBank").add($(".cformAddAccountBank--form")).addClass("show");
});
//var idClient = $("#valIdUser_sess").val();
// ------------ VALIDAR LA INTEGRIDAD DEL INPUT[id-client]
var idClient = document.getElementById("valIdUser_sess");
if(idClient != null && idClient != undefined){
	$("#valIdUser_sess").on("change", function(e){
		if($(this).val() == 0 || $(this).val() == ""){
			window.location.href = "signin";		
		}
	});
}else{
	window.location.href = "signin";
}
//console.log(idClient.value);
// ------------ CONVERTIR A MAYÚSCULA LA PRIMERA LETRA DE UN STRING
function firstLetterMayus(string){
 return string.charAt(0).toUpperCase() + string.slice(1); 
}
// ------------ FORMATEAR A SOLO DOS DECIMALES
function twodecimals(n) {
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
// ------------ LISTAR LOS BANCOS JUNTO AL NOMBRE
$(document).on("click", "#selListallBanks", function(e){
	var btnshow = $("#listAllsBanks");
	$.ajax({
		url: "./controllers/c_list-banks.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	}).done( function (res) {
		var template = "";
		if(!btnshow.hasClass("show")){
			btnshow.addClass("show");
			if(res.length <= 0 || res == []){
				template += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks">
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks--desc">No se encontraron resultados</span>
						</li>
					`;
				$("#listAllsBanks").html(template);
			}else{
				res.forEach((e) => {
					var pathimgbank = "./admin/views/assets/img/banks/"+e.photo;
					template += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--item" id="${e.id}">
							<div class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--item--cImg">
								<img src="${pathimgbank}" alt="">
							</div>
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--item--namebank">${e.name}</span>
						</li>
					`;
				});
				$("#listAllsBanks").html(template);
			}
		}else{
			btnshow.removeClass("show");
			$("#listAllsBanks").html("");
		}
	});
});
// ------------ FIJAR EL BANCO
$(document).on("click", ".cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--item", function(e){
	e.preventDefault();
	$("#msgerrorNounSelBank").text("");
	$.each($(this), function(i, v){
		var getinfobanks = {
			bankid: $(this).attr("id"),
			bankname: $(this).find("span").text(),
			bankimg: $(this).find(".cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--item--cImg").find("img").attr("src")
		};
		$("#selListAllBanks--img").find("span").css({"display":"none"});
		$("#selListAllBanks--img").find("img").attr("src", getinfobanks['bankimg']);
		$("#selListallBanks").find("input").attr("idbank", getinfobanks['bankid']);
	});
});
// ------------ LISTAR LOS TIPOS DE CUENTA
$(document).on("click", "#selListallTypeAccouts", function(e){
	var btnshow = $("#listtypesAccount");
	$.ajax({
		url: "./controllers/c_list-type-account-bank.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	}).done( function (res) {
		var ttypeaccount = "";

		if(!btnshow.hasClass("show")){
			btnshow.addClass("show");
			if(res.length <= 0 || res == []){
				ttypeaccount += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks">
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks--desc">No se encontraron resultados</span>
						</li>
					`;
				$("#listtypesAccount").html(ttypeaccount);
			}else{
				res.forEach((e) => {
					ttypeaccount += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListTypeAccounts--item" id="${e.id}">
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListTypeAccounts--item--typeaccount">${e.type}</span>
						</li>
					`;
				});
				$("#listtypesAccount").html(ttypeaccount);
			}
		}else{
			btnshow.removeClass("show");
			$("#listtypesAccount").html("");
		}
	});
});
// ------------ FIJAR EL TIPO DE CUENTA
$(document).on("click", ".cformAddAccountBank--form--cControl--cSelItem--MenuListTypeAccounts--item", function(e){
	e.preventDefault();
	$("#msgerrorNounSelTypeAccount").text("")
	$.each($(this), function(i, v){
		var gettypeaccount = {
			typeaccountid: $(this).attr("id"),
			typeaccountname: $(this).find("span").text(),
		};
		$("#newValTypeAccount").find("span").text(gettypeaccount['typeaccountname']);
		$("#selListallTypeAccouts").find("input").attr("idtypeaccount", gettypeaccount['typeaccountid']);
	});
});
// ------------ LISTAR LOS TIPOS DE MONEDA
$(document).on("click", "#selListallCurrencyTypes_by_tcurrent", function(e){
	var btnshow = $("#listcurrencytypes");
	var tipocambio = $("#typechangecurridcli").val();
	$.ajax({
		url: "./controllers/c_list-currency-by-typecurrent.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { type_currency : tipocambio}
	}).done( function (res) {
		var tcurrencytype = "";

		if(!btnshow.hasClass("show")){
			btnshow.addClass("show");
			if(res.length <= 0 || res == []){
				tcurrencytype += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks">
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListBanks--itemanybanks--desc">No se encontraron resultados</span>
						</li>
					`;
				$("#listcurrencytypes").html(tcurrencytype);
			}else{
				res.forEach((e) => {
					tcurrencytype += `
						<li class="cformAddAccountBank--form--cControl--cSelItem--MenuListCurrencyTypes--item" id="${e.id}">
							<span class="cformAddAccountBank--form--cControl--cSelItem--MenuListCurrencyTypes--item--currencytype">${e.name} (${e.prefix})</span>
						</li>
					`;
				});
				$("#listcurrencytypes").html(tcurrencytype);
			}
		}else{
			btnshow.removeClass("show");
			$("#listcurrencytypes").html("");
		}
	});
});
// ------------ FIJAR EL TIPO DE MONEDA
$(document).on("click", ".cformAddAccountBank--form--cControl--cSelItem--MenuListCurrencyTypes--item", function(e){
	e.preventDefault();
	$("#msgerrorNounSelCurrentType").text("");
	$.each($(this), function(i, v){
		var getcurrencytype = {
			currencytypeid: $(this).attr("id"),
			currencytypename: $(this).find("span").text(),
		};
		$("#newValCurrencyType").find("span").text(getcurrencytype['currencytypename']);
		$("#selListallCurrencyTypes_by_tcurrent").find("input").attr("idcurrencytype", getcurrencytype['currencytypeid']);
	});
});
// ------------ VALIDAR SI EL NÚMERO DE CUENTA ESTÁ VACÍO
$(document).on("keypress keyup", "#numaccount-cli", function(e){
	let charCode = (e.which) ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)){
    $(this).addClass("non-validval");
    $("#msgerrorNounNumAccount").text("Solo se permiten números en este campo")
    return false;
  }else{
  	$(this).removeClass("non-validval");
  	$("#msgerrorNounNumAccount").text("")
  	return true;
  }
});
// ------------ VALIDAR SI EL ALIAS DE LA CUENTA ESTÁ VACÍO
$(document).on("keyup", "#aliasaccount-cli", function(){
	($(this).val() != 0) ? $("#msgerrorNounAliasAccount").text("") : $("#msgerrorNounAliasAccount").text("Debes ingresar un alias");
});
// ------------ VALIDAR SI ESTÁ MARCADO EL CHECKBOX
$(document).on("click", "#checkaccount-cli", function(){
	($(this).is(':checked')) ? $("#msgerrorNouncheckedAccount").text("") : $("#msgerrorNouncheckedAccount").text("Debes declarar que es tu cuenta personal");
});
// ------------ AGREGAR CUENTA BANCARIA DESDE SELECCIÓN DE CUENTAS BANCARIAS
$(document).on("submit", "#form-AddAccountBank", function(e){
	e.preventDefault();
	// ------------ AGREGAR MENSAJE EN LOS SPAN
	($("#selListallBanks--input").attr("idbank")) ? $("#msgerrorNounSelBank").text("") : $("#msgerrorNounSelBank").text("Debes seleccionar un banco");
	($("#numaccount-cli").val() != "") ? $("#msgerrorNounNumAccount").text("") : $("#msgerrorNounNumAccount").text("Debes ingresar tu número de cuenta");
	($("#selListtypeAccount--input").attr("idtypeaccount")) ? $("#msgerrorNounSelTypeAccount").text("") : $("#msgerrorNounSelTypeAccount").text("Debes seleccionar un tipo de cuenta");
	($("#selListcurrencyType--input").attr("idcurrencytype")) ? $("#msgerrorNounSelCurrentType").text("") : $("#msgerrorNounSelCurrentType").text("Debes seleccionar una moneda");
	($("#aliasaccount-cli").val() != "") ? $("#msgerrorNounAliasAccount").text("") : $("#msgerrorNounAliasAccount").text("Debes ingresar un alias");
	($("#checkaccount-cli").is(":checked")) ? $("#msgerrorNouncheckedAccount").text("") : $("#msgerrorNouncheckedAccount").text("Debes declarar que es tu cuenta personal");
	if($("#selListallBanks--input").attr("idbank") != "" && $("#selListallBanks--input").attr("idbank") != undefined && 
	$("#numaccount-cli").val() != "" && $("#numaccount-cli").val() != 0 && $("#numaccount-cli").val() != null && 
	$("#selListtypeAccount--input").attr("idtypeaccount") != "" && $("#selListtypeAccount--input").attr("idtypeaccount") != undefined &&
	$("#selListcurrencyType--input").attr("idcurrencytype") != "" && $("#selListcurrencyType--input").attr("idcurrencytype") != undefined &&
	$("#aliasaccount-cli").val() != "" && $("#aliasaccount-cli").val() != 0 && $("#aliasaccount-cli").val() != null &&
	$("#checkaccount-cli").is(":checked")){
		var obj_form = {
			idclient: idClient.value,
			idbank: $("#selListallBanks--input").attr("idbank"),
			numaccount: $("#numaccount-cli").val(),
			idtypeaccount: $("#selListtypeAccount--input").attr("idtypeaccount"),
			idcurrenttype: $("#selListcurrencyType--input").attr("idcurrencytype"),
			aliasaccount: $("#aliasaccount-cli").val(),
		};
		var formdata = new FormData();
		formdata.append("id_client", obj_form['idclient']);
		formdata.append("id_bank", obj_form['idbank']);
	  formdata.append("numaccount", obj_form['numaccount']);
	  formdata.append("id_typeaccount", obj_form['idtypeaccount']);
	  formdata.append("id_currencytype", obj_form['idcurrenttype']);
	  formdata.append("aliasaccount", obj_form['aliasaccount']);
	  $.ajax({
	    url: "./controllers/c_add-account-banks.php",
	    method: "POST",
	    data: formdata,
	    contentType: false,
	    cache: false,
	    processData: false,
	  }).done((e) => {
	  	if(e != ""){
		  	if(e = "insertado"){
			  	$(".cformAddAccountBank").removeClass("show");
					$(".cformAddAccountBank--form").removeClass("show");
					listAccountsCDivise();
					// ------------ RESETEAR EL FORMULARIO
		     	$("#selListAllBanks--img").find("span").css({"display":"block"});
		     	$("#selListAllBanks--img").find("img").attr("src", "");
		     	$("#selListallBanks--input").attr("idbank", "");
		     	$("#newValTypeAccount").find("span").text("Selecciona el tipo de cuenta");
		     	$("#selListtypeAccount--input").attr("idtypeaccount", "");
		     	$("#newValCurrencyType").find("span").text("Selecciona la moneda");
		     	$("#selListcurrencyType--input").attr("idcurrencytype", "");
		     	$("#checkaccount-cli").attr("checked", false);
		     	$("#numaccount-cli").val("");
		     	$("#aliasaccount-cli").val("")
		     	$('#form-AddAccountBank')[0].reset();
			    Swal.fire({
			      title: 'Éxito!',
			      html: `<span class='font-w-300'>La cuenta ha sido creada.</span>`,
			      icon: 'success',
			      confirmButtonText: 'Aceptar'
			    });
		  	}else{
		  		Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
		  	}
	  	}else{
	  		Swal.fire({
		      title: 'Error!',
		      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
		      icon: 'error',
		      confirmButtonText: 'Aceptar'
		    });
	  	}
	  });
	}else{
		Swal.fire({
      title: 'Atención!',
      html: `<span class='font-w-300'>Debe completar toda la información.</span>`,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
	}
});
// ------------ LISTAR LOS BANCOS JUNTO AL NOMBRE - FORM COMPLETE DIVISE
$(document).on("click", "#selListallBanks_CData", function(e){
	$("#msgerrorNounSelBankSend_CData").text("");
	var btnshow = $("#listAllsBanks_CData");
	var tipocambio = $("#typechangecurridcli").val();
	$.ajax({
		url: "./controllers/c_list-account-platform-byTypeCurrent.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { type_currency : tipocambio}
	}).done((e) => {
		var template = "";
		if(!btnshow.hasClass("show")){
			btnshow.addClass("show");
			if(e.length <= 0 || e == []){
				template += `
						<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--itemanybanks">
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--itemanybanks--desc">No se encontraron resultados</span>
						</li>
					`;
				$("#listAllsBanks_CData").html(template);
			}else{
				e.forEach((e) => {
					var pathimgbank = "./admin/views/assets/img/transferbanks/"+e.photo;
					template += `
						<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--item" id="${e.id}">
							<div class="cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--item--cImg">
								<img src="${pathimgbank}" alt="">
							</div>
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--item--namebank">${e.name}</span>
						</li>
					`;
				});
				$("#listAllsBanks_CData").html(template);
			}
		}else{
			btnshow.removeClass("show");
			$("#listAllsBanks_CData").html("");
		}
	});
});
// ------------ FIJAR EL BANCO
$(document).on("click", ".cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--item", function(e){
	e.preventDefault();
	$("#msgerrorNounSelBank_CData").text("");
	$.each($(this), function(i, v){
		var getinfobanks = {
			bankid: $(this).attr("id"),
			bankname: $(this).find("span").text(),
			bankimg: $(this).find(".cControlP__cont--containDash--c--cCdivise--cF--cControl--cSelItem--MenuListBanks_CData--item--cImg").find("img").attr("src")
		};
		$("#selListAllBanks--img_CData").find("span").text("");
		$("#selListAllBanks--img_CData").find("img").attr("src", getinfobanks['bankimg']);
		$("#selListallBanks_CData").find("input").attr("idbank", getinfobanks['bankid']);
	});
});
// ------------ LISTAR LAS CUENTAS BANCARIAS POR TIPO DE MONEDA A CAMBIAR
$(document).on("click", "#selListallaccountsBanks_CData", function(e){
	$("#msgerrorNounSelAccountBankReceived_CData").text("");
	var btnshowaccounts = $("#listAllsAccountsBanks_CData");
	var tipocambio = $("#typechangecurridcli").val();
	var exchangeTypeCurrent = "";
	if(tipocambio == "Soles"){
		exchangeTypeCurrent = "Dólares";
	}else{
		exchangeTypeCurrent = "Soles";
	}
	$.ajax({
		url: "./controllers/c_list-account-banks_byTypeCurrent.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { id_client : idClient.value, type_currency : exchangeTypeCurrent}
	}).done( function (res) {
		var template = "";
		if(!btnshowaccounts.hasClass("show")){
			btnshowaccounts.addClass("show");
			if(res.length <= 0 || res == []){
				template += `
						<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--itemanybanks_CData">
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--itemanybanks_CData--desc">No se encontraron resultados</span>
						</li>
					`;
				$("#listAllsAccountsBanks_CData").html(template);
			}else{
				res.forEach((e) => {
					var cuentabank = e.cuenta;
      		var limitecuenta = (cuentabank.length >= 4) ? cuentabank.replace(cuentabank.substring(0, 10), "*******") : cuentabank;
      		var alias = e.alias;
      		var limitealias = (alias.length >= 15) ? alias.substring(15, 0) + "..." : alias;
					var pathimgbank = "./admin/views/assets/img/banks/"+e.imgbanco;
					template += `
						<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item" id="${e.id}">
							<input type="hidden" accname="${limitealias}" accnum="${limitecuenta}">
							<div class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank">
								<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--numaccountbank">${limitecuenta}</span>
								<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--guion">-</span>
								<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--aliasccountbank">${limitealias}</span>
							</div>
							<div class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cImg">
								<img src="${pathimgbank}" alt="">
							</div>
						</li>
					`;
				});
				$("#listAllsAccountsBanks_CData").html(template);
			}
		}else{
			btnshowaccounts.removeClass("show");
			$("#listAllsAccountsBanks_CData").html("");
		}
	});
});
// ------------ LISTAR LAS CUENTAS BANCARIAS
function listAccountsCDivise(){
	$.ajax({
		url: "./controllers/c_list-account-banks.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { id_client : idClient.value }
	}).done( function (res) {
		var template = "";
		if(res.length <= 0 || res == []){
			template += `
					<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--itemanybanks">
						<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--itemanybanks--desc">No se encontraron resultados</span>
					</li>
				`;
			$("#listAllsAccountsBanks_CData").html(template);
		}else{
			res.forEach((e) => {
				var cuentabank = e.cuenta;
    		var limitecuenta = (cuentabank.length >= 4) ? cuentabank.replace(cuentabank.substring(0, 10), "*******") : cuentabank;
    		var alias = e.alias;
    		var limitealias = (alias.length >= 15) ? alias.substring(15, 0) + "..." : alias;
				var pathimgbank = "./admin/views/assets/img/banks/"+e.imgbanco;
				template += `
					<li class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item" id="${e.id}">
						<input type="hidden" accname="${limitealias}" accnum="${limitecuenta}">
						<div class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank">
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--numaccountbank">${limitecuenta}</span>
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--guion">-</span>
							<span class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cInfoBank--aliasccountbank">${limitealias}</span>
						</div>
						<div class="cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cImg">
							<img src="${pathimgbank}" alt="">
						</div>
					</li>
				`;
			});
			$("#listAllsAccountsBanks_CData").html(template);
		}
	});
}
// ------------ FIJAR LA CUENTA BANCARIA
$(document).on("click", ".cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item", function(e){
	e.preventDefault();
	$("#msgerrorNounSelAccountBank_CData").text("");
	$.each($(this), function(i, v){
		var getinfoaccountbanks = {
			accountid: $(this).attr("id"),
			accountnum: $(this).find("input").attr("accnum"),
			accountimg: $(this).find(".cControlP__cont--containDash--c--cCdivise--cF--cControl--clistaddBanks--cSelItem--MenuListAccountsBanks_CData--item--cImg").find("img").attr("src")
		};
		$("#selListAllaccountsBanks--img_CData").find("span").text(getinfoaccountbanks['accountnum']);
		$("#selListAllaccountsBanks--img_CData").find("span").css({"margin-right":".5rem"});
		$("#selListAllaccountsBanks--img_CData").find("img").attr("src", getinfoaccountbanks['accountimg']);
		$("#selListallaccountsBanks_CData").find("input").attr("idaccountbank", getinfoaccountbanks['accountid']);
	});
});
// ------------ AGREGAR TRANSACCIÓN
$(document).on("click", "#btn-cCompleteDiviseCli", function(e){
	e.preventDefault();
	$("#btn-cCompleteDiviseCli").attr("type","button");
	$("#btn-cCompleteDiviseCli").attr("disabled","disabled");
	$("#btn-cCompleteDiviseCli").removeClass("completeFrm");
	$("#btn-cCompleteDiviseCli").addClass("send_showToConvertStep");
	$("#btn-cCompleteDiviseCli").find("div").addClass("show");
	$("#cont-complete-divise").addClass("hidd_toNextStepTrans");

	window.onbeforeunload = null;
	($("#selListallBanks_CData").find("input").attr("idbank")) ? $("#msgerrorNounSelBankSend_CData").text("") : $("#msgerrorNounSelBankSend_CData").text("Debes seleccionar el banco donde transferirás");
	($("#selListallaccountsBanks_CData").find("input").attr("idaccountbank")) ? $("#msgerrorNounSelAccountBankReceived_CData").text("") : $("#msgerrorNounSelAccountBankReceived_CData").text("Debes seleccionar tu cuenta para recibir");
	if($("#selListallBanks_CData").find("input").attr("idbank") && $("#selListallaccountsBanks_CData").find("input").attr("idaccountbank")){
		var send = parseFloat($("#quantitycurridcli").val());
		var tasa = parseFloat($("#changecurridcli").val());
		var type = $("#typechangecurridcli").val();
		var cambio;
		if(type == "Soles"){
			cambio = send / tasa;
		}else{
			cambio = send * tasa;
		}
		var getDataTransac = {
			id_client: idClient.value,
			id_bank: $("#selListallBanks_CData").find("input").attr("idbank"),
			id_account_bank: $("#selListallaccountsBanks_CData").find("input").attr("idaccountbank"),
			type_send: type,
			prefix_send: $("#prefixcurridcli").val(),
			amount_send: send,
			type_received: $("#type_receivedcli").val(),
			prefix_received: $("#prefix_receivedcli").val(),
			amount_received: twodecimals(cambio),
			tasa_change: $("#changecurridcli").val(),
		};
		var formdata = new FormData();
		formdata.append("id_client", getDataTransac['id_client']);
		formdata.append("id_bank", getDataTransac['id_bank']);
		formdata.append("id_account_bank", getDataTransac['id_account_bank']);
		formdata.append("type_send", getDataTransac['type_send']);
		formdata.append("prefix_send", getDataTransac['prefix_send']);
		formdata.append("amount_send", getDataTransac['amount_send']);
		formdata.append("type_received", getDataTransac['type_received']);
		formdata.append("prefix_received", getDataTransac['prefix_received']);
		formdata.append("amount_received", getDataTransac['amount_received']);
		formdata.append("tasa_change", getDataTransac['tasa_change']);
		$.ajax({
	    url: "./php/process_add-transaction-client.php",
	    method: "POST",
	    data: formdata,
	    contentType: false,
	    cache: false,
	    processData: false,
	    beforeSend: function(){
	    	//console.log('Insertando la información');
	    },
	  }).done((e) => {
	  	if(e != ""){
	  		let r = JSON.parse(e);
	  		if(r.res == "add" && r.received != undefined && r.received != ""){
	  			//DETENER EL TIMER...
	  			stopTimerConvertion();
	  			var pathbank = "./admin/views/assets/img/transferbanks/"+r.received[0].imgbank;
					var typeacc = r.received[0].tipocuenta;
					var minustype = typeacc.toLowerCase();
					var typecurr = r.received[0].tipomoneda;
					var minuscurr = firstLetterMayus(typecurr.toLowerCase());
					let valOriginal = r.received[0].transferido;
	      	let valOriginalsplit = valOriginal.split(".");
	      	let valOriginalFinal = "";
					let valFormat = "";
					if(valOriginalsplit[1] == undefined || valOriginalsplit[1] == 'undefined' || valOriginalsplit[1] == ""){
						valOriginalFinal = valOriginalsplit[0]+'.00';
					}else	if(valOriginalsplit[1].length < 2){
						valOriginalFinal = valOriginalsplit[0]+"."+valOriginalsplit[1]+'0';
					}else{
						valOriginalFinal = valOriginalsplit[0]+"."+valOriginalsplit[1];
					}
	      	valFormat = valOriginalFinal.toString().replace(/[^\d.]/g, "").replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3').replace(/\.(\d{2})\d+/, '.$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	  			$(this).attr("disabled","disabled");
					$(this).addClass("sendShowComplete");
					$(this).find("div").addClass("show");
					setTimeout(function(){
						$("#cont-complete-divise").addClass("sendTwoStep_Show");
						$("#cont-complete-exchange").addClass("sendShow");
					}, 2000);
					window.onbeforeunload = function(event){
					  event.returnValue = "Es posible que no se guarden los cambios que ha hecho";
					};
					let inputsAll = document.querySelectorAll("input");
					// ------------ PREGUNTAR SI DESEA ABANDONAR LA PÁGINA - INPUTS
					inputsAll.forEach(function(e, i){
						e.addEventListener("input", function(){
							window.onbeforeunload = function(event){
								console.log(event);
								event.preventDefault();
							  event.returnValue = "Es posible que no se guarden los cambios que ha hecho";
							};
						});
					});
					// IMPRIMIR VALORES PARA ACTUALIZAR LA TRANSACCIÓN
					$("#v_transccoderegcurrtime-clisel").val(r.received[0].code_reg);
					$("#v_transccodeordercurrtime-clisel").val(r.received[0].code_order);
					$("#v_transcidcurrtime-clisel").val(r.received[0].id);
					$("#cont-complete-exchange").html(`
						<div class="cControlP__cont--containDash--c--cCFinalDivise">
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cTitle">
								<h2 class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--title">¡Último paso!</h2>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--cIcon">
									<img src="./views/assets/img/svg/transfer-complete-exchange.svg" alt="icon-transf-exchange" width="100" height="100">
								</div>
								<div>
									<input type="hidden" id="vl-idUserSessFinal" class='non-visvalipt h-alternative-shwnon s-fkeynone-step' autocomplete='off' spellcheck='false' value="">
									<input type="hidden" id="vl-idUserSessFinal" class='non-visvalipt h-alternative-shwnon s-fkeynone-step' autocomplete='off' spellcheck='false' value="">
								</div>
								<p class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--textdesc">Transfiere desde tu banca por internet el monto de:</p>
								<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--textvalchange">
									<span id="vl-mountTotalToSend">${r.received[0].prefijo+" "+valFormat}</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
								</h3>
							</div>
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo">
								<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--subtitle">Banco a transferir:</h3>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo b-shadow-light">
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cImg">
										<img src="${pathbank}" alt="img-bank-to-send" id="vl-imgbankTotalToSend">
									</div>
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo">
										<p class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo--top">
											Cuenta <span id="vl-typeaccountTotalToSend">${minustype}</span> en <span id="vl-typecurrTotalToSend">${minuscurr}</span>
										</p>
										<p class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo--bottom">
											<span id="vl-numaccountTotalToSend">${r.received[0].cuentaplatform}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
										</p>
									</div>
								</div>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo b-shadow-light">
									<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--ruc">Memopay SAC - RUC&nbsp; <span id="vl-rucaccountTotalToSend">${r.received[0].ruc}</span></h3>
									<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
								</div>
								<p class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--infoStepInit">Una vez realizado coloque el número de operación <b>emitido por su banco</b> dentro del casillero mostrado debajo darle a enviar.</p>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--showTitleinfo">
									<button type="button" data-showModalHov="transfer_numOpBankExample">
										<span>¿Dónde lo encuentro?</span>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
										</span>
									</button>
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--showTitleinfo__cModalNumOpBankExample">
										
									</div>
								</div>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cisrtTNroOp d-flex justify-content-between mt-1 mb-2">
									<p>Tiempo para completar operación:</p>
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cisrtTNroOp__cfOpTimeout d-flex justify-content-end">
										<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cisrtTNroOp__cfOpTimeout__cIcon">
											<svg class="MuiSvgIcon-root mr-2" width="20" height="20" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
										</div>
										<div id="c_tmoutTransFinalZon">
											<span class="txt-clr-paragraph" id="timeoutChangeDiviseFinal">15:00</span>
										</div>
										<div id="timeoutChangeDiviseFinal_two">
											<span class="txt-clr-paragraph">0:00</span>
										</div>
									</div>
								</div>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac">
									<form method="POST" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form" id="frm-validNroOpeFromUltiStep">
										<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cinputNumOp">
											<input type="text" autocomplete="off" spellcheck="false" class="" placeholder="Ingresa el nro. de operación" id="v-validNumOperationTransc" maxlength="8" required>
											<span></span>
										</div>
										<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--Step">SOLO POSEES 15 MINUTOS PARA ENVIARNOS EL NRO. DE TU OPERACIÓN.</h3>
										<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns">
											<button type="submit" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns--btnTransac" id="btn-subtranscupdvalid">Enviar</button>
										</div>
									</form>
									<button type="button" id="btn-canceltranscclicurrthis" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns--cancelLink">
										<span>Cancelar</span>
									</button>
								</div>
							</div>
						</div>`);
					
					var minTimeoutFinal = 60 * 15;
					countDownFinal(minTimeoutFinal, function(){
						$("#c_tmoutTransFinalZon").addClass("hidden");
					  $("#timeoutChangeDiviseFinal_two").addClass("active");
						Swal.fire({
						  title: '',
						  html: `<div class="alertSwal">
							  			<div class="alertSwal__cIcon">
							  				<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" version="1.1" viewBox="0 0 700 700">
												 <path d="m350 46.668c128.87 0 233.33 104.46 233.33 233.33s-104.46 233.33-233.33 233.33-233.33-104.46-233.33-233.33 104.46-233.33 233.33-233.33zm0 46.664c-103.09 0-186.67 83.574-186.67 186.67s83.574 186.67 186.67 186.67 186.67-83.574 186.67-186.67-83.574-186.67-186.67-186.67zm0 70c11.965 0 21.828 9.0078 23.176 20.613l0.15625 2.7227v83.16l63.234 63.738c8.375 8.4453 8.9688 21.684 1.8164 30.809l-1.9492 2.1914c-8.4453 8.375-21.684 8.9688-30.809 1.8164l-2.1914-1.9492-70-70.562c-3.6133-3.6406-5.9023-8.3516-6.5664-13.383l-0.19922-3.0508v-92.77c0-12.887 10.445-23.336 23.332-23.336z"/>
												</svg>
							  			</div>
							  			<div class="alertSwal__cTitle">
							  				<h3>¡Se acabó el tiempo!</h3>
							  			</div>
							  			<div class="alertSwal__cText">
								  		 	<p>Los 15 minutos de cambio garantizado han finalizado.</p>
											 	<p>El tipo de cambio se actualizará y puede haber variado.</p>
											</div>
											<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">Aceptar</button>
										</div>`,
						  icon: '',
						  showCancelButton: false,
						  showConfirmButton: false,
						  confirmButtonColor: '#3085d6',
						  confirmButtonText: 'Aceptar',
						  allowOutsideClick: false,
						  allowEscapeKey:false,
						  allowEnterKey:true
						});
						$(document).on('click', '.SwalBtn1', function() {
					    swal.clickConfirm();
					    if($("#v_transccodeordercurrtime-clisel").val() != "" && $("#v_transccodeordercurrtime-clisel").val() != null && 
								$("#v_transccodeordercurrtime-clisel").val() != undefined && $("#v_transccodeordercurrtime-clisel").val() != 0){	
								let ipt_codeorder = $("#v_transccodeordercurrtime-clisel").val();
								let ipt_idtransac = $("#v_transcidcurrtime-clisel").val();
								let formdata = new FormData();
								formdata.append("code_order", ipt_codeorder);
								formdata.append("id_transaction", ipt_idtransac);
								formdata.append("id_client", idClient.value);
								$.ajax({
									url: "./php/process_update-cancel-transaction.php",
									method: "POST",
									data: formdata,
									contentType: false,
							    cache: false,
							    processData: false,
							    beforeSend: function(){
							    	//console.log('Insertando la información');
							    },
							    success: function(e){
							    	if(e != ""){
							    		let r = JSON.parse(e);
								    	if(r.res == "true"){
								    		window.onbeforeunload = null;
												window.location.href = "convert-divise";
								    	}else{		    		
								    		Swal.fire({
										      title: 'Error!',
										      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
										      icon: 'error',
										      confirmButtonText: 'Aceptar'
										    });
								    	}
							    	}else{
							    		Swal.fire({
									      title: 'Error!',
									      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
									      icon: 'error',
									      confirmButtonText: 'Aceptar'
									    });
							    	}
							    },
								 	statusCode: {
								    404: function(){
								      console.log('Error 404: La página de consulta no fue encotrada.');
								    }
								  },
								  error:function(x,xs,xt){
								    console.log(JSON.stringify(x));
								  }
								});
							}else{
								console.log('Error, no existe el código del pedido');
							}
					  });
					});
					

					// ------------ HOVER EN EL SVG - EJEMPLO DE NÚMERO DE OPERACIÓN
					$("a[data-showModalHov='transfer_numOpBankExample']").hover(function(e){
						e.preventDefault();
					  var element = $(this);
					  var modalContent = element.next();

					  timeout = setTimeout(function() {
							modalContent.html(`
								<img src="views/assets/img/bank/examples/bank_transfer-interbank.png" alt="example-modal-bankoperation" width="100" height="100">
							`);
					  }, 200);

					}, function(){
					  clearTimeout(timeout);
					  $(this).next().html("");
					});
	  		}else{
	  			$("#btn-cCompleteDiviseCli").attr("type","submit");
					$("#btn-cCompleteDiviseCli").attr("disabled",false);
					$("#btn-cCompleteDiviseCli").removeClass("completeFrm");
					$("#btn-cCompleteDiviseCli").removeClass("send_showToConvertStep");
					$("#btn-cCompleteDiviseCli").find("div").removeClass("show");
					$("#cont-complete-divise").removeClass("hidd_toNextStepTrans");
					$("#cont-complete-divise").removeClass("sendTwoStep_Show");
	  			Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al guardar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });	
	  		}
	  	}else{
	  		$("#btn-cCompleteDiviseCli").attr("type","submit");
				$("#btn-cCompleteDiviseCli").attr("disabled",false);
				$("#btn-cCompleteDiviseCli").removeClass("completeFrm");
				$("#btn-cCompleteDiviseCli").removeClass("send_showToConvertStep");
				$("#btn-cCompleteDiviseCli").find("div").removeClass("show");
				$("#cont-complete-divise").removeClass("hidd_toNextStepTrans");
				$("#cont-complete-divise").removeClass("sendTwoStep_Show");
	  		Swal.fire({
		      title: 'Error!',
		      html: `<span class='font-w-300'>Lo sentimos, hubo un error al guardar la información.</span>`,
		      icon: 'error',
		      confirmButtonText: 'Aceptar'
		    });
	  	}
	  });
	}else{
		$("#btn-cCompleteDiviseCli").attr("type","submit");
		$("#btn-cCompleteDiviseCli").attr("disabled",false);
		$("#btn-cCompleteDiviseCli").removeClass("completeFrm");
		$("#btn-cCompleteDiviseCli").removeClass("send_showToConvertStep");
		$("#btn-cCompleteDiviseCli").find("div").removeClass("show");
		$("#cont-complete-divise").removeClass("hidd_toNextStepTrans");
		$("#cont-complete-divise").removeClass("sendTwoStep_Show");
		Swal.fire({
      title: 'Atención!',
      html: `<span class='font-w-300'>Debe completar toda la información.</span>`,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
	}
});
// ------------ EVENTO KEYPRESS - INPUT DE NÚMERO DE OPERACIÓN
$(document).on("keypress keyup", "#v-validNumOperationTransc", function(e){
	var charCode = (e.which) ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)){
    $(this).addClass("non-validval");
    $(this).next().text("Solo se permiten números en este control *");
    $("#btn-subtranscupdvalid").attr("disabled","disabled");
  	$("#btn-subtranscupdvalid").attr("type","button");
  	$("#btn-subtranscupdvalid").addClass("disab-control-k");
    return false;
  }else{
	  if(e.target.value.length >= 8){
	  	$(this).addClass("non-validval");
	  	$(this).next().text("Solo se permite un máximo de 8 números *");
	  	return false;
	  }else if(e.target.value.length < 6){
	  	$("#btn-subtranscupdvalid").attr("disabled","disabled");
	  	$("#btn-subtranscupdvalid").attr("type","button");
	  	$("#btn-subtranscupdvalid").addClass("disab-control-k");
	  }else{
	  	$("#btn-subtranscupdvalid").attr("disabled", false);
	  	$("#btn-subtranscupdvalid").attr("type","submit");
	  	$("#btn-subtranscupdvalid").removeClass("disab-control-k");
	  	$(this).removeClass("non-validval");
	  	$(this).next().text("");
  		return true;
	  }
  }

});
$(document).on("blur","#v-validNumOperationTransc",function(e){
	if(e.target.value.length < 6){
  	$(this).addClass("non-validval");
  	$(this).next().text("La longitud mínima es de 6 caracteres en números *");
		$("#btn-subtranscupdvalid").attr("disabled","disabled");
  	$("#btn-subtranscupdvalid").attr("type","button");
  	$("#btn-subtranscupdvalid").addClass("disab-control-k");
  }else if(e.target.value == "" || e.target.value.length == 0){
  	$(this).addClass("non-validval");
  	$(this).next().text("El siguiente campo no puede quedar vacío *");
		$("#btn-subtranscupdvalid").attr("disabled","disabled");
  	$("#btn-subtranscupdvalid").attr("type","button");
  	$("#btn-subtranscupdvalid").addClass("disab-control-k");
  }else{	
		$(this).removeClass("non-validval");
	  $(this).next().text("");
	  $("#btn-subtranscupdvalid").attr("disabled", false);
  	$("#btn-subtranscupdvalid").attr("type","submit");
  	$("#btn-subtranscupdvalid").removeClass("disab-control-k");
  }
});
// ------------ ACTUALIZAR EL ESTADO DE LA TRANSACCIÓN A "INREVIEW"
$(document).on("submit","#frm-validNroOpeFromUltiStep",function(e){
	e.preventDefault();
	if($("#v_transccodeordercurrtime-clisel").val() != "" && $("#v_transccodeordercurrtime-clisel").val() != null && 
		$("#v_transccodeordercurrtime-clisel").val() != undefined && $("#v_transccodeordercurrtime-clisel").val() != 0){	
		if($("#v-validNumOperationTransc").val() != "" && $("#v-validNumOperationTransc").val() != null && $("#v-validNumOperationTransc").val() != undefined){
			let ipt_numbOperation = $("#v-validNumOperationTransc").val();
			let ipt_codeorder = $("#v_transccodeordercurrtime-clisel").val();
			let ipt_idtransac = $("#v_transcidcurrtime-clisel").val();
			let formdata = new FormData();
			formdata.append("n_operation", ipt_numbOperation);
			formdata.append("code_order", ipt_codeorder);
			formdata.append("id_transaction", ipt_idtransac);
			formdata.append("id_client", idClient.value);
			$.ajax({
				url: "./php/process_update-transaction.php",
				method: "POST",
				data: formdata,
				contentType: false,
		    cache: false,
		    processData: false,
		    beforeSend: function(){
		    	//console.log('Insertando la información');
		    },
		    success: function(e){
		    	if(e != ""){
		    		let r = JSON.parse(e);
			    	if(r.res == "true"){
			    		Swal.fire({
							  title: '',
							  html: `<div class="alertSwal">
								  			<div class="alertSwal__cIcon">
								  				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="75px" height="75px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m305.76 231.28-19.602-12.883c1.6797-5.6016 2.2383-11.762 2.2383-18.48 0-6.1602-1.1211-12.32-2.2383-18.48l19.602-13.441c6.1602-3.9219 7.8398-11.762 4.4805-18.48l-4.4805-7.8398c-3.3594-6.1602-11.199-8.3984-17.922-5.6016l-21.281 10.641c-8.9609-8.3984-19.602-15.121-31.359-18.48l-1.6797-23.52c-0.55859-7.2812-6.7188-12.879-13.441-12.879h-8.9609c-7.2812 0-13.441 5.6016-13.441 12.879l-1.6797 23.52c-12.32 3.3594-22.961 9.5195-31.922 18.48l-21.281-10.641c-6.7188-3.3594-14.559-0.55859-17.922 5.6016l-4.4805 7.8398c-3.3594 6.1602-1.6797 14 4.4805 18.48l19.602 13.441c-1.6797 5.6016-2.2383 11.762-2.2383 18.48 0 6.1602 1.1211 12.32 2.2383 18.48l-19.602 13.441c-6.1602 3.9219-7.8398 11.762-4.4805 18.48l3.9297 7.2812c3.3594 6.1602 11.199 8.3984 17.922 5.6016l21.281-10.641c8.9609 8.3984 19.602 15.121 31.922 18.48l1.6797 23.52c0.55859 7.2812 6.1602 12.879 13.441 12.879h8.9609c7.2812 0 13.441-5.6016 13.441-12.879l1.6797-23.52c12.32-3.3594 22.961-9.5195 31.359-18.48l21.281 10.641c6.1602 3.3594 14.559 0.55859 17.922-5.6016l4.4805-7.8398c3.9102-6.1602 2.2305-14.562-3.9297-18.48zm-90.723 6.1602c-20.719 0-36.961-16.801-36.961-36.961 0-20.16 16.801-36.961 36.961-36.961 20.719 0 36.961 16.801 36.961 36.961 0 20.16-16.801 36.961-36.961 36.961z"/><path d="m564.48 117.6h-89.602v-5.6016c0-4.4805-3.9219-8.3984-8.3984-8.3984-4.4805 0-8.3984 3.9219-8.3984 8.3984v5.6016h-89.602c-9.5195 0-17.359 7.8398-17.359 17.359v286.16c0 9.5195 7.8398 17.359 17.359 17.359h195.44c9.5195 0 17.359-7.8398 17.359-17.359v-286.16c1.1172-10.082-6.7227-17.359-16.801-17.359zm-172.48 185.92h97.441c4.4805 0 8.3984 3.9219 8.3984 8.3984 0 4.4805-3.9219 8.3984-8.3984 8.3984l-97.441 0.003906c-4.4805 0-8.3984-3.9219-8.3984-8.3984 0-4.4805 3.918-8.4023 8.3984-8.4023zm-8.3984-59.918c0-4.4805 3.9219-8.3984 8.3984-8.3984l64.398-0.003906c4.4805 0 8.3984 3.9219 8.3984 8.3984 0 4.4805-3.9219 8.3984-8.3984 8.3984l-64.398 0.003906c-4.4805 0-8.3984-3.3594-8.3984-8.3984zm157.92 145.04h-149.52c-4.4805 0-8.3984-3.9219-8.3984-8.3984 0-4.4805 3.9219-8.3984 8.3984-8.3984h149.52c4.4805 0 8.3984 3.9219 8.3984 8.3984 0.003906 5.0391-3.3594 8.3984-8.3984 8.3984zm-42.559-145.04c0-4.4805 3.9219-8.3984 8.3984-8.3984h31.359c4.4805 0 8.3984 3.9219 8.3984 8.3984 0 4.4805-3.9219 8.3984-8.3984 8.3984h-31.359c-4.4805 0-8.3984-3.3594-8.3984-8.3984zm42.559-59.922h-149.52c-4.4805 0-8.3984-3.9219-8.3984-8.3984 0-4.4805 3.9219-8.3984 8.3984-8.3984h149.52c4.4805 0 8.3984 3.9219 8.3984 8.3984 0.003906 5.0391-3.3594 8.3984-8.3984 8.3984z"/><path d="m215.04 327.6c-48.16 0-87.359 39.199-87.359 87.359 0 45.359 34.719 82.879 78.961 86.801v18.48c0 4.4805 3.9219 8.3984 8.3984 8.3984 4.4805 0 8.3984-3.9219 8.3984-8.3984v-18.48c44.238-4.4805 78.961-41.441 78.961-86.801 0-48.16-39.199-87.359-87.359-87.359zm51.52 64.398-58.238 58.238c-1.6797 1.6797-3.9219 2.2383-6.1602 2.2383-2.2383 0-4.4805-0.55859-6.1602-2.2383l-33.039-33.039c-3.3594-3.3594-3.3594-8.3984 0-11.762 3.3594-3.3594 8.3984-3.3594 11.762 0l26.879 26.879 52.641-52.641c3.3594-3.3594 8.3984-3.3594 11.762 0 3.918 3.3633 3.918 8.9648 0.55469 12.324z"/><path d="m215.04 85.121c4.4805 0 8.3984-3.9219 8.3984-8.3984v-11.199c0-4.4805-3.9219-8.3984-8.3984-8.3984-4.4805 0-8.3984 3.9219-8.3984 8.3984v11.199c0 4.4766 3.3594 8.3984 8.3984 8.3984z"/><path d="m215.04 47.602c4.4805 0 8.3984-3.9219 8.3984-8.3984l0.003906-2.8047h2.8008c4.4805 0 8.3984-3.9219 8.3984-8.3984 0-4.4805-3.9219-8.3984-8.3984-8.3984h-11.199c-4.4805 0-8.3984 3.9219-8.3984 8.3984v11.199c-0.003906 4.4805 3.3555 8.4023 8.3945 8.4023z"/><path d="m267.68 36.398h20.719c4.4805 0 8.3984-3.9219 8.3984-8.3984 0-4.4805-3.9219-8.3984-8.3984-8.3984h-20.719c-4.4805 0-8.3984 3.9219-8.3984 8.3984 0 4.4805 3.918 8.3984 8.3984 8.3984z"/><path d="m393.12 36.398h20.719c4.4805 0 8.3984-3.9219 8.3984-8.3984 0-4.4805-3.9219-8.3984-8.3984-8.3984h-20.719c-4.4805 0-8.3984 3.9219-8.3984 8.3984-0.003906 4.4805 3.918 8.3984 8.3984 8.3984z"/><path d="m359.52 28c0-4.4805-3.9219-8.3984-8.3984-8.3984h-20.719c-4.4805 0-8.4023 3.918-8.4023 8.3984s3.9219 8.3984 8.3984 8.3984h20.719c5.043 0 8.4023-3.918 8.4023-8.3984z"/><path d="m455.84 36.398h2.8008v2.8008c0 4.4805 3.9219 8.3984 8.3984 8.3984 4.4805 0 8.3984-3.9219 8.3984-8.3984l0.003906-11.199c0-4.4805-3.9219-8.3984-8.3984-8.3984h-11.199c-4.4805 0-8.3984 3.9219-8.3984 8.3984-0.003906 4.4805 3.3555 8.3984 8.3945 8.3984z"/><path d="m467.04 59.922c-4.4805 0-8.3984 3.9219-8.3984 8.3984v14.559c0 4.4805 3.9219 8.3984 8.3984 8.3984 4.4805 0 8.3984-3.9219 8.3984-8.3984v-14.559c0.003906-4.4805-3.918-8.3984-8.3984-8.3984z"/><path d="m467.04 451.36c-4.4805 0-8.3984 3.9219-8.3984 8.3984v22.398c0 4.4805 3.9219 8.3984 8.3984 8.3984 4.4805 0 8.3984-3.9219 8.3984-8.3984v-22.398c0.003906-5.0391-3.918-8.3984-8.3984-8.3984z"/><path d="m270.48 523.6h-22.398c-4.4805 0-8.3984 3.9219-8.3984 8.3984 0 4.4805 3.9219 8.3984 8.3984 8.3984h22.398c4.4805 0 8.3984-3.9219 8.3984-8.3984 0-4.4805-3.918-8.3984-8.3984-8.3984z"/><path d="m467.04 518.56c-3.3594 0-6.7188 2.2383-7.8398 5.0391h-9.5195c-4.4805 0-8.3984 3.9219-8.3984 8.3984 0 4.4805 3.9219 8.3984 8.3984 8.3984h17.359c4.4805 0 8.3984-3.9219 8.3984-8.3984v-5.0391c0.003906-5.0352-3.918-8.3984-8.3984-8.3984z"/><path d="m337.68 523.6h-22.398c-4.4805 0-8.3984 3.9219-8.3984 8.3984 0 4.4805 3.9219 8.3984 8.3984 8.3984h22.398c4.4805 0 8.3984-3.9219 8.3984-8.3984 0-4.4805-3.918-8.3984-8.3984-8.3984z"/><path d="m404.88 523.6h-22.398c-4.4805 0-8.3984 3.9219-8.3984 8.3984 0 4.4805 3.9219 8.3984 8.3984 8.3984h22.398c4.4805 0 8.3984-3.9219 8.3984-8.3984 0.003906-4.4805-3.918-8.3984-8.3984-8.3984z"/></g></svg>
								  			</div>
								  			<div class="alertSwal__cTitle">
								  				<h3>¡Solicitud completada!</h3>
								  			</div>
								  			<div class="alertSwal__cText">
									  		 	<p>Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu tabla de actividades.</p>
												</div>
												<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">Aceptar</button>
											</div>`,
							  icon: '',
							  showCancelButton: false,
							  showConfirmButton: false,
							  confirmButtonColor: '#3085d6',
							  confirmButtonText: 'Aceptar',
							  allowOutsideClick: false,
							  allowEscapeKey:false,
							  allowEnterKey:true
							});
							$(document).on('click', '.SwalBtn1', function() {
						    swal.clickConfirm();
						    window.onbeforeunload = null;
		      			window.location.href = "tablero";
						  });
			    	}else{		    		
			    		Swal.fire({
					      title: 'Error!',
					      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
					      icon: 'error',
					      confirmButtonText: 'Aceptar'
					    });
			    	}
		    	}else{
		    		Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
		    	}
		    },
			 	statusCode: {
			    404: function(){
			      console.log('Error 404: La página de consulta no fue encotrada.');
			    }
			  },
			  error:function(x,xs,xt){
			    console.log(JSON.stringify(x));
			  }
			});
		}else{
			Swal.fire({
	      title: 'Atención!',
	      html: `<span class='font-w-300'>El siguiente campo es obligatorio.</span>`,
	      icon: 'warning',
	      confirmButtonText: 'Aceptar'
	    });
		}
	}else{
		console.log('Error, no existe el código del pedido');
	}
});
$(document).on("click", "#btn-canceltranscclicurrthis", function(e){
	e.preventDefault();
	Swal.fire({
	  title: '',
	  html: `<div class="alertSwal">
		  			<div class="alertSwal__cIcon">
		  				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="75px" height="75px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m350 30.801c-137.62 0-249.2 111.57-249.2 249.2 0 137.63 111.57 249.2 249.2 249.2 137.63 0 249.2-111.57 249.2-249.2 0-137.62-111.57-249.2-249.2-249.2zm0 61.598c39.039 0 75.273 11.934 105.3 32.336l-260.57 260.57c-20.402-30.027-32.336-66.27-32.336-105.31 0-103.61 83.996-187.6 187.6-187.6zm0 375.2c-38.707 0-74.672-11.73-104.55-31.824l260.32-260.32c20.094 29.871 31.828 65.836 31.828 104.54 0 103.61-83.996 187.6-187.6 187.6z"/></g></svg>
		  			</div>
		  			<div class="alertSwal__cTitle">
		  				<h3>¿Cancelar Solicitud?</h3>
		  			</div>
		  			<div class="alertSwal__cText">
			  		 	<p>La solicitud de cambio será <strong class="bold-pricolor">cancelada</strong>.</p>
						</div>
						<div class="alertSwal__cBtnsActions">
							<button type="button" role="button" tabindex="0" class="SwalBtn2 customSwalBtn cust-confirm">Aceptar</button>
							<button type="button" role="button" tabindex="0" class="SwalBtn3 customSwalBtn cust-cancel">Cancelar</button>
						</div>
					</div>`,
	  icon: '',
	  showCancelButton: false,
	  showConfirmButton: false,
	  confirmButtonColor: '#3085d6',
	  confirmButtonText: 'Aceptar',
	  allowOutsideClick: false,
	  allowEscapeKey:false,
	  allowEnterKey:true
	});
  $(document).on('click', '.SwalBtn3', function() {
    swal.close();
  });
	$(document).on('click', '.SwalBtn2', function() {
    swal.clickConfirm();
    if($("#v_transccodeordercurrtime-clisel").val() != "" && $("#v_transccodeordercurrtime-clisel").val() != null && 
			$("#v_transccodeordercurrtime-clisel").val() != undefined && $("#v_transccodeordercurrtime-clisel").val() != 0){	
			let ipt_codeorder = $("#v_transccodeordercurrtime-clisel").val();
			let ipt_idtransac = $("#v_transcidcurrtime-clisel").val();
			let formdata = new FormData();
			formdata.append("code_order", ipt_codeorder);
			formdata.append("id_transaction", ipt_idtransac);
			formdata.append("id_client", idClient.value);
			$.ajax({
				url: "./php/process_update-cancel-transaction.php",
				method: "POST",
				data: formdata,
				contentType: false,
		    cache: false,
		    processData: false,
		    beforeSend: function(){
		    	//console.log('Insertando la información');
		    },
		    success: function(e){
		    	if(e != ""){
		    		let r = JSON.parse(e);
			    	if(r.res == "true"){
			    		window.onbeforeunload = null;
							window.location.href = "convert-divise";
			    	}else{		    		
			    		Swal.fire({
					      title: 'Error!',
					      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
					      icon: 'error',
					      confirmButtonText: 'Aceptar'
					    });
			    	}
		    	}else{
		    		Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar su información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
		    	}
		    },
			 	statusCode: {
			    404: function(){
			      console.log('Error 404: La página de consulta no fue encotrada.');
			    }
			  },
			  error:function(x,xs,xt){
			    console.log(JSON.stringify(x));
			  }
			});
		}else{
			console.log('Error, no existe el código del pedido');
		}
  });
});
// ------------ CUENTA REGRESIVA PARA LA TRANSACCIÓN FINAL
function countDownFinal(i, callback){
  timerfinal = setInterval(function() {
    minutesfinal = parseInt(i / 60, 10);
    secondsfinal = parseInt(i % 60, 10);
    minutesfinal = minutesfinal < 10 ? "" + minutesfinal : minutesfinal;
    secondsfinal = secondsfinal < 10 ? "0" + secondsfinal : secondsfinal;
    document.getElementById("timeoutChangeDiviseFinal").innerHTML = minutesfinal + ":" + secondsfinal;
    if ((i--) > 0){
    }else{
      clearInterval(timerfinal);
      callback();
    }
  }, 1000);
}