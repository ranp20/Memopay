<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['admin_sessmemopay'])){
	header("Location: admin");
}
require_once '../php/config.php';
$settings = new List_Settings();
$adm_config = $settings->list();
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Memopay | Ajustes Generales</title>
	<?php require_once 'includes/header_links.php' ?>
	<link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="../node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
</head>
<body>
	<main class="cDash-adm">
		<div class="result"></div>
		<?php require_once 'includes/sidebar_left.php';?>
		<div class="cDash-adm--containRight">
			<?php require_once 'includes/headertop.php';?>
			<div class="cDash-adm--containRight--cContain">
				<div class="cDash-adm--containRight--cContain__addtitle">
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">AJUSTES</h2>
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cSettings">
						<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideLinkAnchors">
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideLinkAnchors__cLinks" id="c-Settings_linksAnchors">
								<ul id="c-Settings_linksAnchors-m">
									<li data-target="#anchor_settings_home">Home</li>
									<li data-target="#anchor_settings_convert-divise">Conversiones</li>
									<li data-target="#anchor_settings_banners">Banners</li>
									<li data-target="#anchor_settings_logos">Logos</li>
									<li data-target="#anchor_settings_about-us">Nosotros</li>
								</ul>
							</div>
						</div>
						<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors">
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_home">
								<form action="savesettings?action=SaveChanges" method="POST">
									<div class="cDash-adm--containRight--cContain__cBody__cardBody">
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardTitle">
											<h4>Home</h4>
										</div>
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
												<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Whatsapp</h3>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
												<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem">
								          <label for="whatsapp_phone" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Número de whatsapp</label>
								          <input type="text" id="whatsapp_phone" name="whatsapp_phone" data-valformat="withspacesforthreenumbers" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
								          if(isset($adm_config('whatsapp_phone')['setting_value'])){
								          	echo preg_replace('/(\d{1,3})(?=(\d{3})+$)/', '$1 ', $adm_config('whatsapp_phone')['setting_value']);
								          }else{
								          	echo "";
								          }
								          //echo $config->list("whatsapp_phone")[0]["setting_value"];
								        ?>" placeholder="(+51) 999 999 999" maxlength="11">
								        </div>
								        <div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
								          <label for="whatsapp_phone" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Texto de whatsapp</label>
								          <textarea id="whatsapp_text" name="whatsapp_text" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__textarea" placeholder="Escribe aquí el texto para WhatsApp" maxlength="999"><?php 
								          if(isset($adm_config('whatsapp_phone')['setting_value'])){
								          	echo $adm_config('whatsapp_text')['setting_value']; 
								          }else{
								          	echo "";
								          }
								        	?></textarea>
								        </div>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
												<button name="home_settings" type="submit" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
													<span>Guardar</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_convert-divise">
								<form action="savesettings?action=SaveChanges" method="POST">
									<div class="cDash-adm--containRight--cContain__cBody__cardBody">
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardTitle">
											<h4>Conversiones</h4>
										</div>
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
												<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Conversiones</h3>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
												<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
								          <label for="maxAmountInConvertDivise" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Monto máximo en calculadora</label>
								          <input type="text" id="maxAmountInConvertDivise" name="maxAmountInConvertDivise" data-valformat="withcomedecimal" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input md-w-control" value="<?php
								          if(isset($adm_config('maxamountinconvertdivise_convertion')['setting_value'])){
								          	echo number_format($adm_config('maxamountinconvertdivise_convertion')['setting_value'],2);
								          }else{
								          	echo "";
								          }
								        	?>" placeholder="Ejm: 5,000" maxlength="12">
								        </div>
												<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
								          <label for="maxAmountSendReceived" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Montos mayores para cupón</label>
								          <input type="text" id="maxAmountSendReceived" name="maxAmountSendReceived" data-valformat="withcomedecimal" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input md-w-control" value="<?php
								          if(isset($adm_config('maxamount_convertion')['setting_value'])){
								          	echo number_format($adm_config('maxamount_convertion')['setting_value'],2);
								          }else{
								          	echo "";
								          }
								        	?>" placeholder="Ejm: 5,000" maxlength="12">
								        </div>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
												<button name="convertions_settings" type="submit" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
													<span>Guardar</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_banners">
								<form action="savesettings?action=SaveChanges" method="POST">
									<div class="cDash-adm--containRight--cContain__cBody__cardBody">
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardTitle">
											<h4>Home</h4>
										</div>
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
												<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Banners</h3>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
												<button type="submit" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
													<span>Guardar</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_logos">
								<form action="savesettings?action=SaveChanges" method="POST">
									<div class="cDash-adm--containRight--cContain__cBody__cardBody">
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardTitle">
											<h4>Logo</h4>
										</div>
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
												<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Logo</h3>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
												<button type="submit" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
													<span>Guardar</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="cDash-adm--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_about-us">
								<form action="savesettings?action=SaveChanges" method="POST">
									<div class="cDash-adm--containRight--cContain__cBody__cardBody">
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardTitle">
											<h4>Nosotros</h4>
										</div>
										<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
												<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Nosotros</h3>
											</div>
											<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
												<button type="submit" class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
													<span>Guardar</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url; ?>js/helper.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/settings.js"></script>
</body>
</html>
