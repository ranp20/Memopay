<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['admin_micambista'])){
	header("Location: admin");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Mi Cambista | Operaciones</title>
	<?php require_once 'includes/header_links.php';?>
	<!-- INCLUIR DATATABLES -->
	<link rel="stylesheet" type="text/css" href="<?= $urlCli; ?>views/js/DataTables/datatables.min.css">
	<script type="text/javascript" charset="utf8" src="<?= $urlCli; ?>views/js/DataTables/datatables.min.js"></script>
	<!-- INCLUIR SWEETALERTS2 -->
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
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">OPERACIONES</h2>
					<!--<button type="button" href="#" id="add-category" class="cDash-adm--containRight--cContain__addtitle--btn-add" data-toggle="modal" data-target="#addcategoryModal"><span class="cDash-adm--containRight--cContain__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>-->
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cardBody">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
							<div class="cDash-adm--containRight--cContain__cTitleBeforeTable">
								<div class="cDash-adm--containRight--cContain__cTitleBeforeTable__title-OptionShort">
									<h3 id="title-shortOption" class="cDash-adm--containRight--cContain__cTitleBeforeTable__title-OptionShort__title processed">Recientes</h3>
								</div>
								<div class="cDash-adm--containRight--cContain__cTitleBeforeTable__cSelOptions">
									<select id="selOpts-OperationsFilter" class="one-hidden">
										<option selected>Seleccione una opción</option>
										<option value="1" data-short="Recents">Recientes</option>
										<option value="1" data-short="Pendings">Pendientes</option>
										<option value="1" data-short="Processed">En Proceso</option>
										<option value="1" data-short="Canceled">Cancelados</option>
										<option value="2" data-short="Completed">Completadas</option>
									</select>
								</div>
							</div>
							<!--<div class="cDash-adm--containRight--cContain__inputsearch-table">
								<input type="text" class="cDash-adm--containRight--cContain__inputsearch-table--input" name="searchclients" id="searchclients" maxlength="100" placeholder="Buscar...">
							</div>-->
							<div class="contain-table-responsive">
								<table id="tbl_operations" class="cDash-adm--containRight--cContain__list-results" cellpadding="0" width="100%">
									<thead>
										<tr>
											<th>Id</th>
											<th>Cod. Orden</th>
											<th>Monto Enviado</th>
											<th>Monto Recibido</th>
											<th class='center'>Tasa de Cambio</th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
				
				<!-- FIN MODALS-->
				<div class="cDash-adm--containRight--cContain__cActionButtonsItems" id="c-action-buttons">
					<div class="cDash-adm--containRight--cContain__cActionButtonsItems__c-actionButtons" id="c-allActionsButtons">
						<button type="button" data-action="in-completed" title="Finalizado">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="29px" height="29px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m131.07 252.54-44.27 44.27 183.59 225.7 342.81-464.17-29.098-20.836-324.58 315.19z" fill-rule="evenodd"/></g></svg>
						</button>
						<button type="button" data-action="in-process" title="En proceso">
							<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" version="1.1" viewBox="0 0 700 700"><g><path d="m350 23.332c-68.07 0-133.36 27.043-181.49 75.176-48.133 48.137-75.176 113.42-75.176 181.49s27.043 133.36 75.176 181.49c48.137 48.133 113.42 75.176 181.49 75.176s133.36-27.043 181.49-75.176c48.133-48.137 75.176-113.42 75.176-181.49s-27.043-133.36-75.176-181.49c-48.137-48.133-113.42-75.176-181.49-75.176zm0 466.67c-55.695 0-109.11-22.125-148.49-61.508-39.383-39.383-61.508-92.797-61.508-148.49s22.125-109.11 61.508-148.49c39.383-39.383 92.797-61.508 148.49-61.508s109.11 22.125 148.49 61.508c39.383 39.383 61.508 92.797 61.508 148.49s-22.125 109.11-61.508 148.49c-39.383 39.383-92.797 61.508-148.49 61.508z"/><path d="m513.33 256.67h-140v-93.336c0-8.3359-4.4453-16.039-11.664-20.207s-16.117-4.168-23.336 0-11.664 11.871-11.664 20.207v116.67c0 6.1875 2.457 12.125 6.832 16.5s10.312 6.832 16.5 6.832h163.33c8.3359 0 16.039-4.4453 20.207-11.664 4.168-7.2188 4.168-16.117 0-23.336-4.168-7.2188-11.871-11.664-20.207-11.664z"/></g></svg>
						</button>
						<button type="button" data-action="in-canceled" title="Cancelado">
							<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" version="1.1" viewBox="0 0 700 700">
							 <path d="m350 0c-154 0-280 126-280 280s126 280 280 280 280-126 280-280-126-280-280-280zm0 70c46.199 0 88.199 14.699 122.5 39.199l-293.3 293.3c-24.5-34.301-39.199-76.301-39.199-122.5 0-116.2 93.801-210 210-210zm170.8 87.5c24.5 34.301 39.199 76.301 39.199 122.5 0 116.2-93.801 210-210 210-46.199 0-88.199-14.699-122.5-39.199z"/></svg>
						</button>
					</div>
					<!--
					<button type="button" data-def="close" id="close-actionButtonsItems" title="cerrar">
						<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" version="1.1" viewBox="0 0 700 700"><path d="m350 305.27-180.14 179.62c-6.8438 6.8242-17.922 6.8086-24.746-0.035156s-6.8086-17.922 0.035156-24.746l180.07-179.56-180.07-179.56c-6.8438-6.8242-6.8594-17.902-0.035156-24.746s17.902-6.8594 24.746-0.035156l180.14 179.62 180.14-179.62c6.8438-6.8242 17.922-6.8086 24.746 0.035156s6.8086 17.922-0.035156 24.746l-180.07 179.56 180.07 179.56c6.8438 6.8242 6.8594 17.902 0.035156 24.746s-17.902 6.8594-24.746 0.035156z"/></svg>
					</button>
					</-->
				</div>
			</div>
		</div>
	</main>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/operations.js"></script>
</body>
</html>