<?php 
require_once '../php/process_data-list.php';
require_once '../php/class/settings.php';
$call_config = new Settings_all();
$g_setting = $call_config->get_config();
?>
<section class="cControlP__cont--hTop">
	<div id="m-show-hpagepanel">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div class="cControlP__cont--hTop--c">
		<div class="cControlP__cont--hTop--c--cLogHorario">
			<div class="cControlP__cont--hTop--c--cLogHorario--cLogo">
				<img src="<?= $url ?>views/assets/img/svg/logo.svg" alt="">
			</div>
			<div class="cControlP__cont--hTop--c--cLogHorario--cHorario">
				<p>Lunes a Viernes: 9am a 7:00pm </br> Sábados y Feriados: 9am a 2:30pm</p>
			</div>
		</div>
		<div class="cControlP__cont--hTop--c--cWpsNameCli">
			<a href="https://api.whatsapp.com/send?phone=51<?= $g_setting("whatsapp_phone")['setting_value']; ?>&text=<?= $g_setting("whatsapp_text")['setting_value']; ?>" class="cControlP__cont--hTop--c--cWpsNameCli--wpsMobile" target="_blank">
				<img src="<?= $url ?>views/assets/img/svg/whatsapp-green.svg" alt="" width="100" height="100">
			</a>
			<a href="https://api.whatsapp.com/send?phone=51<?= $g_setting("whatsapp_phone")['setting_value']; ?>&text=<?= $g_setting("whatsapp_text")['setting_value']; ?>" class="cControlP__cont--hTop--c--cWpsNameCli--wpsWeb" target="_blank">
				<p><?= preg_replace('/(\d{1,3})(?=(\d{3})+$)/', '$1 ', $g_setting('whatsapp_phone')['setting_value']); ?></p>
				<div class="cControlP__cont--hTop--c--cWpsNameCli--wpsWeb--cIcon">
					<img src="<?= $url ?>views/assets/img/svg/whatsapp-green.svg" alt="" width="100" height="100">
				</div>
			</a>
			<div class="cControlP__cont--hTop--c--cWpsNameCli--ndataCli">
				<div class="cControlP__cont--hTop--c--cWpsNameCli--ndataCli--cIcon">
					<img src="<?= $url ?>views/assets/img/svg/user-male.svg" alt="">
				</div>
				<div class="cControlP__cont--hTop--c--cWpsNameCli--ndataCli--cNamecli">
					<p>
						<span>Hola,</br></span>
						<span><?= $name; ?></span>
					</p>
				</div>
				<button type="button" class="cControlP__cont--hTop--c--cWpsNameCli--ndataCli--cIconArrow" id="btnShowSideRight">
					<img src="<?= $url ?>views/assets/img/svg/arrow-bottom-dashboard.svg" alt="">
				</button>
			</div>
		</div>
	</div>
</section>