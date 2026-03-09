<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();	
if(!isset($_SESSION['admin_sessmemopay'])){
	header("Location: admin");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Memopay | Tarifario</title>
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
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">TARIFARIO</h2>
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<form action="" method="POST" id="frm-updateval_rates">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody">
							<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
								<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol">
									<h3 class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Tarifario de Cambio Soles - Dólares</h3>
									<div id="valchange_ratesdollars">
										
									</div>
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
				<!-- MODAL - EDITAR PAÍS -->
				<!--
				<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR TARIFA</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-bank" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="idupdate-bank">
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Precio de Compra</label>
					        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="36" placeholder="Ingrese el precio de compra">
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Precio de Venta</label>
					        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="36" placeholder="Ingrese el precio de venta">
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-bank">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>-->
				<!-- FIN MODALS-->
			</div>
		</div>
	</main>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url; ?>js/helper.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/rates.js"></script>
</body>
</html>