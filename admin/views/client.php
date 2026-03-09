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
	<title>Memopay | Clientes</title>
	<?php require_once 'includes/header_links.php' ?>
	<!--
	<link href="../vendor/select2/select2/dist/css/select2.min.css" rel="stylesheet"/>
	<script src="../vendor/select2/select2/dist/js/select2.min.js"></script>
	-->
	<!-- INCLUIR SWEETALERTS2 -->
	<link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="../node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
	<!-- INCLUIR DATATABLES -->
	<link rel="stylesheet" type="text/css" href="<?= $urlCli; ?>views/js/DataTables/datatables.min.css">
	<script type="text/javascript" charset="utf8" src="<?= $urlCli; ?>views/js/DataTables/datatables.min.js"></script>
</head>
<body>
	<main class="cDash-adm">
		<div class="result"></div>
		<?php require_once 'includes/sidebar_left.php';?>
		<div class="cDash-adm--containRight">
			<?php require_once 'includes/headertop.php';?>
			<div class="cDash-adm--containRight--cContain">
				<div class="cDash-adm--containRight--cContain__addtitle">
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">CLIENTES</h2>
					<!--<button type="button" href="#" id="add-category" class="cDash-adm--containRight--cContain__addtitle--btn-add" data-toggle="modal" data-target="#addcategoryModal"><span class="cDash-adm--containRight--cContain__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>-->
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cardBody">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
							<div class="cDash-adm--containRight--cContain__cTitleBeforeTable">
								<div class="cDash-adm--containRight--cContain__cTitleBeforeTable__title-OptionShort">
									<h3 id="title-shortOption" class="cDash-adm--containRight--cContain__cTitleBeforeTable__title-OptionShort__title in_review">No validados</h3>
								</div>
								<div class="cDash-adm--containRight--cContain__cTitleBeforeTable__cSelOptions">
									<select id="selOpts-ValidBiometricFilter" class="one-hidden">
										<option selected>Seleccione una opción</option>
										<option value="3" data-short="inreview">En Revisión</option>
										<option value="2" data-short="notvalidated">No validados</option>
										<option value="4" data-short="canceled">Cancelados</option>
										<option value="1" data-short="validated">Validados</option>
									</select>
								</div>
							</div>
							<!--
							<div class="cDash-adm--containRight--cContain__inputsearch-table">
								<input type="text" class="cDash-adm--containRight--cContain__inputsearch-table--input" name="searchclients" id="searchclients" maxlength="100" placeholder="Buscar...">
							</div>
							-->
							<div class="contain-table-responsive">
								<table id="tbl_clients" class="cDash-adm--containRight--cContain__list-results" cellpadding="0" width="100%">
									<thead>
										<tr>
											<th>Id</th>
											<th>Email</th>
											<th>Teléfono</th>
											<th>Nombres</th>
											<th>Apellidos</th>
											<th>T. documento</th>
											<th>Nro. documento</th>
											<th class='center'>Sexo</th>
											<th></th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
<!-- 

				<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR CLIENTE</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-client" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" name="idupdate-client" id="idupdate-client">
					        	<div class="cont-groupbox-controls">
					        		<label for="" class="cont-groupbox-controls__label">Cupones</label>
					        		<div id="cli_listCoupones"></div>
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-coupon-client">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>


				<div class="modal fade bootstrapmodalupdate-custom" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">INFORMACIÓN DEL CLIENTE</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-client" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" name="idupdate-client" id="iddetail-client">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="name-cli_update" class="cont-modalbootstrap__form--control__label">Nombres</label>
					        		<div class="cont-modalbootstrap__form--control__cparagraph"><?php print_r($_GET); ?></div>
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-coupon-client">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>

 -->
			</div>
		</div>
	</main>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url; ?>js/helper.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/clients.js"></script>
</body>
</html>