<?php 
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(isset($_SESSION['admin_sessmemopay'])){
	header("Location: dashboard");
}
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
$url =  $actual_link . "/admin/views/";
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Memopay | Login Admin</title>
	<?php require_once 'views/includes/header_links.php' ?> 
</head>
<body class="c_body-loginAdm">
	<div class="cLoginAdm">
		<div class="msgAlertLogin" id="msgAlertLogin"></div>
		<div class="cLoginAdm__cont">
			<div class="cLoginAdm__cont--fLogin box-small">
				<div class="cLoginAdm__cont--fLogin--cLogo">
					<img src="<?= $url; ?>assets/img/logos/logo_principal/Memopay_logo.png" alt="logoLogin_Memopay" width="100" height="100" decoding="async">
				</div>
				<div class="cLoginAdm__cont--fLogin--cTitle">
					<h2 class="cLoginAdm__cont--fLogin--cTitle--title">INICIAR SESIÓN</h2>
				</div>
				<form method="POST" class="cLoginAdm__cont--fLogin--form" id="Login-PInstakash">
					<div class="cLoginAdm__cont--fLogin--form--controls">
						<div class="cLoginAdm__cont--fLogin--form--controls--cIcon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cLoginAdm__cont--fLogin--form--controls--cIcon--email"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
						</div>
						<input type="email" id="email-adm" name="email-adm" class="cLoginAdm__cont--fLogin--form--controls--input" placeholder="Correo electrónico" required>
					</div>
					<div class="cLoginAdm__cont--fLogin--form--controls">
						<div class="cLoginAdm__cont--fLogin--form--controls--cIcon" id="icon-showPassAdm">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cLoginAdm__cont--fLogin--form--controls--cIcon--pass"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/></svg>
						</div>
						<input type="password" id="pass-adm" name="pass-adm" class="cLoginAdm__cont--fLogin--form--controls--input" placeholder="Contraseña" required>
					</div>
					<div class="cLoginAdm__cont--fLogin--form--cBtnsActions">
						<a href="#" class="cLoginAdm__cont--fLogin--form--cBtnsActions--recovPass">¿Olvidaste tu contraseña?</a>
						<button class="cLoginAdm__cont--fLogin--form--cBtnsActions--btnLogin" type="submit">Ingresar</button>
					</div>
				</form>
				<div class="cLoginAdm__cont--fLogin--cBottInfo">
					<small class="cLoginAdm__cont--fLogin--cBottInfo--desc">
						<span>©</span>
						<span>2021 - <?php echo date("Y"); ?></span>
						<span>&nbsp;-&nbsp;</span>
						<span>Versión 1.0</span>
					</small>
				</div>
			</div>
			<div class="cLoginAdm__cont--imgbanner">
				<div class="img-backdrop-dark"></div>
				<img src="<?= $url; ?>assets/img/banners/banner_login/wallpaper_cambista.jpg" alt="" width="100" height="100">
			</div>
		</div>
	</div>
	<script type="text/javascript" src="<?= $url; ?>js/helper.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/login-adm.js"></script>
</body>
</html>