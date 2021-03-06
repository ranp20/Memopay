<?php 
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['cli_sessmemopay'])){
	header("Location: signin");
}else{
	if($_SESSION['cli_sessmemopay'][0]['complete_account'] <= 16){
		header("Location: complete-register");
	}
}
require_once '../php/process_data-list.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Memopay | Mis cuentas </title>
	<?php require_once 'includes/header_links.php'; ?>
	<link rel="stylesheet" href="node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
</head>
<body>
	<div class="cControlP">
		<div class="cControlP__cont">
			<?php require_once 'includes/dashboard-header-top.php'; ?>
			<?php require_once 'includes/dashboard-sidebarleft.php'; ?>
			<?php require_once 'includes/dashboard-sidebarright.php'; ?>
			<section class="cControlP__cont--containDash">
				<div class="cControlP__cont--containDash--c" id="cont-my-accounts">
					<div class="cControlP__cont--containDash--c--myAccounts">
					<!-- 
						<div class="cControlP__cont--containDash--c--myAccounts--msgCKash">
							<img src="<?= $url ?>views/assets/img/svg/kash-my-accounts.svg" alt="">
							<div class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle">
								<h2 class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle--title">No posees ningún KASH</h2>
								<p class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle--descDesktop">Puedes <b>retirar</b> tus <b>KASH</b> o usarlos en tus próximas <b>operaciones</b> de tus cambios de divisas.</p>
								<p class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle--descMobile"><b>Retíralos</b> o úsalos en tus proximas <b>operaciones.</b></p>
								<h3 class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle--equalskash"><b>1 KASH = 1$ USD</b></h3>
								<a href="#" class="cControlP__cont--containDash--c--myAccounts--msgCKash--cTitle--link">¿Cómo ganar kash?</a>
							</div>
						</div>
						 -->
						<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList" id="listAccountByThisUser">
							<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cAddAccount">
								<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cAddAccount--cTitle">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
									<h2>Mis cuentas</h2>
								</div>
								<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cAddAccount--cbtnDesc">
									<button type="button" id="btn-addAccountform" class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cAddAccount--cbtnDesc--link">Agregar cuenta</button>
									<p class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cAddAccount--cbtnDesc--desc">Las cuentas que agregues deberás ser <strong class="bold-pricolor">tuyas o de tu empresa.</strong> Puedes tener hasta <strong class="bold-pricolor">20 cuentas agregadas,</strong> 10 tuyas en soles y 10 en dólares.</p>
								</div>
							</div>
							<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts">
								<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts--cTitle b-shadow-light">
									<h3>Cuentas Dólares $</h3>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
								</div>
								<ul class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts--m" id="accounts-DollarsList"></ul>
								<div class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts--cTitle b-shadow-light">
									<h3>Cuentas Soles S/.</h3>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
								</div>
								<ul class="cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts--m" id="accounts-SolesList"></ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<?php require_once 'includes/dashboard-formaddaccountbank.php'; ?>
			<?php require_once 'includes/dashboard-details-accountbanks.php'; ?>
		</div>
	</div>		
	<script type="text/javascript" src="<?= $url ?>views/js/actions_pages/dashboard-client.js"></script>
	<script type="text/javascript" src="<?= $url ?>views/js/actions_pages/add-account-bank.js"></script>
	<script type="text/javascript">
		$(".cControlP__cont--containDash--c--myAccounts--cAddAccountList--cListAccounts--cTitle").on("click", function(){
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		});
	</script>
</body>
</html>