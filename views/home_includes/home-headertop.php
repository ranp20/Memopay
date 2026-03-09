<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  // CONFIGURACIÓN - LOCALHOST
  $url_headassets =  $actual_link . "/Memopay/";
  // CONFIGURACIÓN - SERVIDOR
  /*
  $url_headassets =  $actual_link . "/";
  */
?>
<section class="cMain__cont--infTop" id="headerTop-info">
	<div class="box">
		<div class="cMain__cont--infTop--hTop">
			<div class="cMain__cont--infTop--hTop--citem">
			<div class="cMain__cont--infTop--hTop--citem--cm" id="main-m-htop">
				<span class="cMain__cont--infTop--hTop--citem--cm--Tm">Menú</span>
				<ul class="cMain__cont--infTop--hTop--citem--cm--m">
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item d-non_desk">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">¿Cómo funciona?</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">Nosotros</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item d-non_desk">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">¡Gana con tus referidos!</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item d-non_desk">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">¿Por qué Memopay?</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">Beneficios</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--item">
						<button type="button" class="cMain__cont--infTop--hTop--citem--cm--m--link">FAQ</button>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--rcInfoitem">
						<span class="cMain__cont--infTop--hTop--citem--cm--m--rcInfoitem--Thours">Horario</span>
						<p class="cMain__cont--infTop--hTop--citem--cm--m--rcInfoitem--p">Lunes a Viernes 9 am - 7 pm</p>
						<p class="cMain__cont--infTop--hTop--citem--cm--m--rcInfoitem--p">Sábados y Feriados 9 am - 2.30 pm</p>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--btnSignin">
						<a href="signin" class="cMain__cont--infTop--hTop--citem--cm--m--btnSignin--link">Iniciar Sesión</a>
					</li>
					<li class="cMain__cont--infTop--hTop--citem--cm--m--btnSignup">
						<a href="signup" class="cMain__cont--infTop--hTop--citem--cm--m--btnSignup--link">Registrarse</a>
					</li>
				</ul>
			</div>
			<div class="cMain__cont--infTop--hTop--citem--cLogo">
				<div class="cMain__cont--infTop--hTop--citem--cLogo--logo">
					<a href="./">
						<img src="<?= $url_adm_assets; ?>views/assets/img/logos/logo_principal/Memopay_logo-resize-3.png" alt="logo_Memopay" width="100" height="100" decoding="async">
					</a>
				</div>
			</div>
		</div>
		<div id="m-show-hpage">
			<span></span>
			<span></span>
			<span></span>
		</div>
		</div>
	</div>	
</section>