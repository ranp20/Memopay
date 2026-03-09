<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['cli_sessmemopay'])){
	header("Location: signin");
}
require_once '../php/process_data-list.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Memopay | Completar operación </title>
	<?php require_once 'includes/header_links.php'; ?>
</head>
<body>
	<div class="cControlP">
		<div class="cControlP__cont">
			<?php require_once 'includes/dashboard-header-top.php'; ?>
			<?php require_once 'includes/dashboard-sidebarleft.php'; ?>
			<?php require_once 'includes/dashboard-sidebarright.php'; ?>
			<section class="cControlP__cont--containDash">
				<!-- 
				<div class="cControlP__cont--containDash--c pt-3rem" id="cont-complete-exchange">
					<div class="cControlP__cont--containDash--c--cCFinalDivise">
						<div class="cControlP__cont--containDash--c--cCFinalDivise--cTitle">
							<h2 class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--title">¡Último paso!</h2>
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--cIcon">
								<img src="<?= $url; ?>views/assets/img/svg/transfer-complete-exchange.svg" alt="icon-transf-exchange" width="100" height="100">
							</div>
							<input type="hidden" id="vl-idUserSessFinal" class='non-visvalipt h-alternative-shwnon s-fkeynone-step' autocomplete='off' spellcheck='false' value="<?= $idclient; ?>">
							<p class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--textdesc">Transfiere desde tu banca por internet el monto de:</p>
							<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cTitle--textvalchange">
								<span id="vl-mountTotalToSend"></span>
								<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
							</h3>
						</div>
						<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo">
							<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--subtitle">Banco a transferir:</h3>
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo b-shadow-light">
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cImg">
									<img src="" alt="" id="vl-imgbankTotalToSend">
								</div>
								<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo">
									<p class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo--top">
										Cuenta <span id="vl-typeaccountTotalToSend"></span> en <span id="vl-typecurrTotalToSend"></span>
									</p>
									<p class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--cinfo--bottom">
										<span id="vl-numaccountTotalToSend"></span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
									</p>
								</div>
							</div>
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo b-shadow-light">
								<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cTopbankMemopayinfo--ruc">Memopay SAC - RUC&nbsp; <span id="vl-rucaccountTotalToSend"></span></h3>
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
							<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac">
								<form method="POST" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form">
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cinputNumOp">
										<input type="text" autocomplete="off" spellcheck="false" class="" placeholder="Ingresa el nro. de operación" id="v-validNumOperationTransc" maxlength="8">
										<span></span>
									</div>
									<h3 class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--Step">SOLO POSEES 15 MINUTOS PARA ENVIARNOS EL NRO. DE TU OPERACIÓN.</h3>
									<div class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns">
										<button type="submit" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns--btnTransac">Enviar</button>
										<button type="button" class="cControlP__cont--containDash--c--cCFinalDivise--cContInfo--cFormSendtransac--form--cBtns--cancelLink" id="ipt_tOperCancel">
											<span>Cancelar</span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				 -->
				<?php require_once 'includes/dashboard-contain-footer.php'; ?>
			</section>
			<?php require_once 'includes/dashboard-formaddaccountbank.php'; ?>
		</div>
	</div>		
	<script type="text/javascript" src="<?= $url; ?>views/js/actions_pages/dashboard-client.js"></script>
	<script type="text/javascript" src="<?= $url; ?>views/js/actions_pages/complete-exchange.js"></script>
</body>
</html>