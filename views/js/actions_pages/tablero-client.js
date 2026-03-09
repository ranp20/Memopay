$(function(){
	listTransactionsByIdClient_tablero();
})
var idClient = $("#ipt-idClientValListTransac").val();
// ------------ TROZO DE VANILLA JS
((d) => {
	// ------------ CERRAR LA VENTANA - DETALLE DE TRANSACCIÓN
	d.querySelector("#btnCloseTransacRight").addEventListener("click", function(){
		d.querySelector(".cListDetailsTransactions").classList.remove("show");
		d.querySelector(".cListDetailsTransactions--contDetails").classList.remove("show");
	});
	d.querySelector(".cListDetailsTransactions--contDetails--c--btnclose").addEventListener("click",function(){
		d.querySelector(".cListDetailsTransactions").classList.remove("show");
		d.querySelector(".cListDetailsTransactions--contDetails").classList.remove("show");
	});
	let contsidebarRight = document.querySelector('.cListDetailsTransactions');
	contsidebarRight.addEventListener('click', e => {
		if(e.target === contsidebarRight)	contsidebarRight.classList.remove('show');
	});
})(document);
// ------------ LISTADO DE TRANSACCIONES
function listTransactionsByIdClient_tablero(){
	$.ajax({
		url: "controllers/c_list-all-transactions-byIdClient-tablero.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { id_client : idClient }
	}).done((e) => {
		var template = "";
		if(e.length <= 0 || e == []){ 
			template += ` <li class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--itemanybanks">
											<span	class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--itemanybanks--desc">No se encontraron resultados</span> 
											</li> `; 
		
			$("#c-listAlls_Transacs").html(template); 
		}else{
			//var countItems = e.length + 1;
			$.each(e, function(i,v){
				//countItems--;
				var statusSend = "";
				if(v.estado == "Pending"){
					statusSend = `<span class="process"></span>`;
				}else if(v.estado == "Completed"){
					statusSend = `<span class="complete"></span>`;
				}else if(v.estado == "Inreview"){
					statusSend = `<span class="in_review"></span>`;
				}else if(v.estado == "Cancel"){
					statusSend = `<span class="cancel"></span>`;
				}else{
					statusSend = `<span class="cancel"></span>`;
				}

				let valOriginal = v.solicitado;
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

				template += `
					<li class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item" id="${i}" data-id="${v.id}">
						<div class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--cLeft">
							<div class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--cLeft--status">
								${statusSend}
							</div>
							<div class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--cLeft--codemount">
								<p>${v.codigo}</p>
								<p>${v.prefijorequest} ${valFormat}</p>
							</div>
						</div>
						<button type="button" class="cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--showDetail">Ver más</button>
					</li>
				`;
			});
			$("#c-listAlls_Transacs").html(template);
		}
	});
}
// ------------ LISTADO DE DETALLES DE LA TRANSACCIÓN - SIDEBARLEFT
$(document).on("click", ".cControlP__cont--containDash--c--cCDashboard--cLeftBoxsLandscape--cLastChange--cList--m--item--showDetail", function(e){
	e.preventDefault();
	$(".cListDetailsTransactions").addClass("show");
	$(".cListDetailsTransactions--contDetails").addClass("show");
	var idTransac = $(this).parent().attr("data-id");
	$.ajax({
		url: "controllers/c_list-details-transac-byIdTrans.php",
		method: "POST",
		dataType: "JSON",
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: { id_transaction : idTransac }
	}).done((e) => {
		if(e.length != "" && e.length > 0){
			var tmpDetailTrans = "";
			$.each(e, function(i,v){
				var estado;
				var cuentarequest = v.cuentarequest;
				var limitecuenta = (cuentarequest.length >= 4) ? cuentarequest.replace(cuentarequest.substring(0, 10), "*******") : cuentarequest;
				var pathimgbank = "./admin/views/assets/img/banks/"+v.imgbanksolicitado;
				var pathimgtransferbank = "./admin/views/assets/img/transferbanks/"+v.imgbankplatform;
				// VALOR - SOLICITADO
				let valOriginal = v.solicitado;
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
      	// VALOR - TRANSFERIDO
				let valOriginal_trans = v.transferido;
      	let valOriginal_transsplit = valOriginal_trans.split(".");
      	let valOriginal_transFinal = "";
				let valFormat_trans = "";
				if(valOriginal_transsplit[1] == undefined || valOriginal_transsplit[1] == 'undefined' || valOriginal_transsplit[1] == ""){
					valOriginal_transFinal = valOriginal_transsplit[0]+'.00';
				}else	if(valOriginal_transsplit[1].length < 2){
					valOriginal_transFinal = valOriginal_transsplit[0]+"."+valOriginal_transsplit[1]+'0';
				}else{
					valOriginal_transFinal = valOriginal_transsplit[0]+"."+valOriginal_transsplit[1];
				}
      	valFormat_trans = valOriginal_transFinal.toString().replace(/[^\d.]/g, "").replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3').replace(/\.(\d{2})\d+/, '.$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");

				if(v.estado == "Pending"){
					estado = `<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cStatus process">
											<span id="t-statusTransCli">espera de pago</span>
										</div>`;
					tmpDetailTrans = `
						<div class="cListDetailsTransactions--contDetails--c--DetailOP">
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cTitle">
								<h3>Detalles de la operación</h3>
							</div>
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m">
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Estado:</p>
										${estado}
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Pedido:</p>
										<span id="t-codigoTransCli">${v.codigo}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Solicitado:</p>
										<p id="t-solicitedTransCli">${v.prefijorequest+" "+valFormat}</p>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Tasa de cambio:</p>
										<span id="t-tasaTransCli">${v.tasa}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Cuenta que recibe:</p>
										<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cAccBank">
											<img src="${pathimgbank}" alt="" id="t-imgbankTransCli">
											<span id="t-naccountTransCli">${limitecuenta}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="cListDetailsTransactions--contDetails--c--CompleteOP">
							<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cTitle">
								<h3>Completa tu operación</h3>
								<input type="hidden" id="t-idTransferBank" value="${v.id_transferbank}">
								<input type="hidden" class='non-visvalipt h-alternative-shwnon s-fkeynone-step' autocomplete='off' spellcheck='false' id="ipt-codTransacOrder-id" value="${e[0].id}">
							</div>
							<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m">
									<li class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item">
										<p>Cuenta a transferir:</p>
										<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank">
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<img src="${pathimgtransferbank}" alt="" id="t-imgbankPlatformtransfer">
												<p>
													<span id="t-numbankPlatformtransfer">${v.naccplatform}</span>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
												</p>
											</div>
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<p>Memopay S.A.C - RUC <span id="t-rucbankPlatformtransfer">${v.rucplatform}</span></p>
											</div>
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<p>Monto a enviar:</p>
												<p>
													<span id="t-transferedTransCli">${v.prefijosend+" "+valFormat_trans}</span>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
												</p>
											</div>
										</div>
									</li>
								</ul>
								<form method="POST" class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--form" id="frm-validNroOperFromDash">
									<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--form--control">
										<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--form--control__cIpt">
											<input type="text" class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--form--control__cIpt--input" id="v-validNumOperationFromDashboard" name="" maxlength="8" placeholder="Número de operación">
											<button type="submit" class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--form--control__cIpt--btnCTransac">Agregar</button>
										</div>
										<span id="mssg_iptValidOperationFromDashboard"></span>
									</div>
								</form>
							</div>
						</div>`;
				}else if(v.estado == "Inreview"){
					estado = `<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cStatus in_review">
											<span id="t-statusTransCli">en revisión</span>
										</div>`;
					tmpDetailTrans = `
						<div class="cListDetailsTransactions--contDetails--c--DetailOP">
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cTitle">
								<h3>Detalles de la operación</h3>
							</div>
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m">
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Estado:</p>
										${estado}
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Pedido:</p>
										<span id="t-codigoTransCli">${v.codigo}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Solicitado:</p>
										<p id="t-solicitedTransCli">${v.prefijorequest+" "+valFormat}</p>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Tasa de cambio:</p>
										<span id="t-tasaTransCli">${v.tasa}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Cuenta que recibe:</p>
										<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cAccBank">
											<img src="${pathimgbank}" alt="" id="t-imgbankTransCli">
											<span id="t-naccountTransCli">${limitecuenta}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="cListDetailsTransactions--contDetails--c--CompleteOP">
							<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cTitle">
								<h3>Completa tu operación</h3>
								<input type="hidden" id="t-idTransferBank" value="${v.id_transferbank}">
								<input type="hidden" class='non-visvalipt h-alternative-shwnon s-fkeynone-step' autocomplete='off' spellcheck='false' id="ipt-codTransacOrder-id" value="${e[0].id}">
							</div>
							<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m mb-2_5rem">
									<li class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item">
										<p>Cuenta a transferir:</p>
										<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank">
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<img src="${pathimgtransferbank}" alt="" id="t-imgbankPlatformtransfer">
												<p>
													<span id="t-numbankPlatformtransfer">${v.naccplatform}</span>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
												</p>
											</div>
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<p>Memopay S.A.C - RUC <span id="t-rucbankPlatformtransfer">${v.rucplatform}</span></p>
											</div>
											<div class="cListDetailsTransactions--contDetails--c--CompleteOP--cDetails--m--item--cAccBank--item">
												<p>Monto a enviar:</p>
												<p>
													<span id="t-transferedTransCli">${v.prefijosend+" "+valFormat_trans}</span>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>`;
				}else if(v.estado == "Cancel"){
					estado = `<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cStatus cancel">
											<span id="t-statusTransCli">cancelada</span>
										</div>`;
					tmpDetailTrans = `
						<div class="cListDetailsTransactions--contDetails--c--DetailOP">
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cTitle">
								<h3>Detalles de la operación</h3>
							</div>
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m">
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Estado:</p>
										${estado}
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Pedido:</p>
										<span id="t-codigoTransCli">${v.codigo}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Solicitado:</p>
										<p id="t-solicitedTransCli">${v.prefijorequest+" "+valFormat}</p>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Tasa de cambio:</p>
										<span id="t-tasaTransCli">${v.tasa}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Cuenta que recibe:</p>
										<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cAccBank">
											<img src="${pathimgbank}" alt="" id="t-imgbankTransCli">
											<span id="t-naccountTransCli">${limitecuenta}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>`;
				}else if(v.estado == "Completed"){
					estado = `<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cStatus complete">
											<span id="t-statusTransCli">finalizada</span>
										</div>`;
					tmpDetailTrans = `
						<div class="cListDetailsTransactions--contDetails--c--DetailOP">
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cTitle">
								<h3>Detalles de la operación</h3>
							</div>
							<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails">
								<ul class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m">
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Estado:</p>
										${estado}
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Pedido:</p>
										<span id="t-codigoTransCli">${v.codigo}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Solicitado:</p>
										<p id="t-solicitedTransCli">${v.prefijorequest+" "+valFormat_trans}</p>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Tasa de cambio:</p>
										<span id="t-tasaTransCli">${v.tasa}</span>
									</li>
									<li class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item">
										<p>Cuenta que recibe:</p>
										<div class="cListDetailsTransactions--contDetails--c--DetailOP--cDetails--m--item--cAccBank">
											<img src="${pathimgbank}" alt="" id="t-imgbankTransCli">
											<span id="t-naccountTransCli">${limitecuenta}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>`;
				}else{
					estado = "ERROR!";
					tmpDetailTrans = ``;
				}
			});
			$("#c-detailTransacCli").html(tmpDetailTrans);
		}else{
			console.log('No se envió la respuesta');
		}
	});
});
$(document).on("keypress keyup","#v-validNumOperationFromDashboard",function(e){
	var charCode = (e.which) ? e.which : e.keyCode;
  if(e.target.value.length >= 8){
  	$(this).addClass("non-validval");
  	$("#mssg_iptValidOperationFromDashboard").text("Solo se permite un máximo de 8 números *");
  	return false;
  }
  if (charCode > 31 && (charCode < 48 || charCode > 57)){
    $(this).addClass("non-validval");
    $("#mssg_iptValidOperationFromDashboard").text("Solo se permiten números en este control *");
    return false;
  }else{
  	$(this).removeClass("non-validval");
  	$("#mssg_iptValidOperationFromDashboard").text("");
  	return true;
  }
});
$(document).on("blur","#v-validNumOperationFromDashboard",function(){
	$("#mssg_iptValidOperationFromDashboard").text("");
	$(this).removeClass("non-validval");
});
$(document).on("submit","#frm-validNroOperFromDash",function(e){
	e.preventDefault();
	if($("#t-codigoTransCli").text() != "" && $("#t-codigoTransCli").text() != null && $("#t-codigoTransCli").text() != undefined && $("#t-codigoTransCli").text() != 0){	
		if($("#v-validNumOperationFromDashboard").val() != "" && $("#v-validNumOperationFromDashboard").val() != null && $("#v-validNumOperationFromDashboard").val() != undefined){
			let ipt_numbOperation = $("#v-validNumOperationFromDashboard").val();
			let ipt_codeorder = $("#t-codigoTransCli").text();
			let ipt_idtransac = $("#ipt-codTransacOrder-id").val();
			let formdata = new FormData();
			formdata.append("n_operation", ipt_numbOperation);
			formdata.append("code_order", ipt_codeorder);
			formdata.append("id_transaction",ipt_idtransac);
			formdata.append("id_client", idClient);
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
			    		$(".cListDetailsTransactions").add($(".cListDetailsTransactions--contDetails")).removeClass("show");
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