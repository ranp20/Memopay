// ------------ LISTAR LOS PAÍSES JUNTO AL NOMBRE Y PREFIJO
$(document).on("click", ".cAccount__cont--fAccount--form--controls--g-Listprefix--fakeselect", function(e){
	var btnshow = $("#list-prefixtocountryflags");
	$.ajax({
		url: "./controllers/c_list-countries.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	}).done((e) => {
		var template = "";
		if(!btnshow.hasClass("show")){
			btnshow.addClass("show");
			$.each(e, function(i,v){
				var pathimgflag = "./admin/views/assets/img/flags/"+v.photo;
				template += `
					<li class="list-prefixtocountryflags__m__item" id="${v.id}">
            <div class="list-prefixtocountryflags__m__item--contImg">
              <img src="${pathimgflag}" alt="flag-country-${i}" width="100" height="100">
            </div>
            <span class="list-prefixtocountryflags__m__item--namecountry">${v.name}</span>
            <span class="list-prefixtocountryflags__m__item--prefixcountry">${v.prefix}</span>                     
          </li>
				`;
			});
			$("#list-prefixtocountryflags").html(template);
		}else{
			btnshow.removeClass("show");
			$("#list-prefixtocountryflags").html("");
		}
	});
});
// ------------ FORMATO - SEPARADOR DE NÚMERO TELEFÓNICO (+51)
$(document).on("keyup", "input[data-valformat=withspacesforthreenumbers]", function(e){
	let val = e.target.value;
  $(this).val(val.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'));
});
// ------------ MOSTRAR/OCULTAR EL LISTADO DE PAÍSES
$(document).on("click", ".list-prefixtocountryflags__m__item", function(e){
	e.preventDefault();
	var getinfocountries = {};
	$.each($(this), function(i, v){
		getinfocountries = {
			countryid: $(this).attr("id"),
			countryprefix: $(this).find(".list-prefixtocountryflags__m__item--prefixcountry").text(),
			countryflag: $(this).find(".list-prefixtocountryflags__m__item--contImg").find("img").attr("src")
		};
		$("#flag--numbercountryselect").find("img").attr("id", getinfocountries['countryid']);
		$("#flag--numbercountryselect").find("img").attr("src", getinfocountries['countryflag']);
		$("#iptcountryPrefixSel").text(getinfocountries['countryprefix']);
	});
});
// ------------ VERIFICAR SI LAS CONTRASEÑAS COINCIDEN
$(document).on('keyup', '#pass-repeatinstkreg', function() {
  if($(this).val().length <= 0 || $(this).val() == ""){
  	$(this).removeClass("success");
  	$(this).addClass("error");
  	$("#msgalertinputpass").removeClass("success");
  	$("#msgalertinputpass").addClass("error");
    $("#msgalertinputpass").text('Los campos no deben quedar vacíos');
  }else if($(this).val() != $("#pass-instkreg").val()){
  	$(this).removeClass("success");
  	$(this).addClass("error");
  	$("#msgalertinputpass").removeClass("success");
    $("#msgalertinputpass").addClass("error");
    $("#msgalertinputpass").text('Las contraseñas no coinciden');
  }else{
  	$(this).removeClass("error");
  	$(this).addClass("success");
  	$("#msgalertinputpass").removeClass("error");
    $("#msgalertinputpass").addClass("success");
    $("#msgalertinputpass").text('Las contraseñas son correctas');
  }
  $(this).blur(function (){$("#msgalertinputpass").text('');});
});
// ------------ VALIDAR SI SE ECRIBIÓ EN EMAIL 
$(document).on("keyup", "#email-instkreg", function(){
	($(this).val() != 0) ? $("#errorNounEmailAcc").text("") : $("#errorNounEmailAcc").text("Debes colocar un correo electrónico");
});
// ------------ VALIDAR SI SE ECRIBIÓ EN TELÉFONO 
$(document).on("keyup", "#telephone-instkreg", function(){
	($(this).val() != 0) ? $("#errorNounTelephoneAcc").text("") : $("#errorNounTelephoneAcc").text("Debes colocar un teléfono válido");
});
// ------------ VALIDAR SI SE ECRIBIÓ EN PASSWORD 
$(document).on("keyup", "#pass-instkreg", function(){
	($(this).val() != 0) ? $("#errorNounPasswordAcc").text("") : $("#errorNounPasswordAcc").text("Debes colocar una contraseña");
});
// ------------ MOSTRAR/OCULTAR LA CONTRASEÑA DEL INPUT DE PASSWORD 1 
$(document).on("click", "#icon-firstPassControl", function(){
	var inputTypeControlPass1 = $(this).parent().find("input").attr("type");
	if(inputTypeControlPass1 == "password" && $(this).parent().find("input").val() != ""){
		$(this).parent().find("input").attr("type", "text");
		$(this).html(`
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cAccount__cont--fAccount--form--controls--cIcon--pass"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
		`);
	}else{
		$(this).parent().find("input").attr("type", "password");
		$(this).html(`
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        class="cAccount__cont--fAccount--form--controls--cIcon--pass">
        <path
            d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
    	</svg>
		`);
	}
});
// ------------ MOSTRAR/OCULTAR LA CONTRASEÑA DEL INPUT DE PASSWORD 2 
$(document).on("click", "#icon-secondPassControl", function(){
	var inputTypeControlPass2 = $(this).parent().find("input").attr("type");
	if(inputTypeControlPass2 == "password" && $(this).parent().find("input").val() != ""){
		$(this).parent().find("input").attr("type", "text");
		$(this).html(`
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cAccount__cont--fAccount--form--controls--cIcon--pass"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
		`);
	}else{
		$(this).parent().find("input").attr("type", "password");
		$(this).html(`
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        class="cAccount__cont--fAccount--form--controls--cIcon--pass">
        <path
            d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
    	</svg>
		`);
	}
});
// ------------ REGISTRO DE CLIENTE 
$(document).on("submit", "#frm-accountRegCli", function(e){
	e.preventDefault();

	($("#email-instkreg").val() != "") ? $("#errorNounEmailAcc").text("") : $("#errorNounEmailAcc").text("Debes colocar un correo electrónico");
	($("#telephone-instkreg").val().length > 0 || $("#telephone-instkreg").val() != "") ? $("#errorNounTelephoneAcc").text("") : $("#errorNounTelephoneAcc").text("Debes colocar un teléfono válido");
	($("#pass-instkreg").val() != "") ? $("#errorNounPasswordAcc").text("") : $("#errorNounPasswordAcc").text("Debes colocar una contraseña");

	if($("#email-instkreg").val() != "" && $("#pass-instkreg").val() != ""){
		if($("#pass-instkreg").val() == $("#pass-repeatinstkreg").val()){
			let formData = new FormData();
			let telephone = $("#telephone-instkreg").val();
			let prefixCel = $("#iptcountryPrefixSel").text();
			let prefixwithoutspace = prefixCel.replace(/ /g, "");
			let telwithoutspace = telephone.replace(/ /g, "");
			let telephoneSend = prefixCel+telwithoutspace;
		  formData.append("u-email", $("#email-instkreg").val());
		  formData.append("u-id_country", $("#flag--numbercountryselect").find("img").attr("id"));
		  formData.append("u-telephone", telephoneSend);
		  formData.append("u-password", $("#pass-instkreg").val());
		  $.ajax({
		  	url: "./php/process_register-client.php",
		    method: "POST",
		    data: formData,
		    contentType: false,
		    cache: false,
		    processData: false,
		  }).done(function(e){
		  	var r = JSON.parse(e);
		  	if(r.response == "true"){
		  		Swal.fire({
			      title: 'Éxito!',
			      html: `<span class='font-w-300'>El usuario fue registrado correctamente.</span>`,
			      icon: 'success',
			      confirmButtonText: 'Aceptar'
			    });
					setTimeout(function(){
						location.replace("complete-register");
					}, 500);
		  	}else if(r.response == "err_equals"){
		  		Swal.fire({
			      title: 'Atención!',
			      html: `<span class='font-w-300'>El usuario ya existe. Por favor inicie sesión o registre un nuevos datos.</span>`,
			      icon: 'warning',
			      confirmButtonText: 'Aceptar'
			    });
		  	}else if(r.response == "error_email"){
		  		Swal.fire({
			      title: 'Atención!',
			      html: `<span class='font-w-300'>El email ingresado no es válido, asegúrate de colocar al menos @ o .com.</span>`,
			      icon: 'warning',
			      confirmButtonText: 'Aceptar'
			    });
		  	}else if(r.response == "error_pass"){
		  		Swal.fire({
			      title: 'Atención!',
			      html: `<span class='font-w-300'>La contraseña debe tener por lo menos 4 o 15 caracteres, debe contener al menos un número y un solo guión o guión bajo.</span>`,
			      icon: 'warning',
			      confirmButtonText: 'Aceptar'
			    });
		  	}else{
		  		Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un problema al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
		  	}
		  });
		}else{
			Swal.fire({
	      title: 'Atención!',
	      html: `<span class='font-w-300'>Los campos de contraseña deben coincidir.</span>`,
	      icon: 'warning',
	      confirmButtonText: 'Aceptar'
	    });
		}
	}else{
		Swal.fire({
      title: 'Atención!',
      html: `<span class='font-w-300'>Debe rellenar los campos requeridos.</span>`,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
	}
});