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
	<title>Memopay | Bancos de transferencia</title>
	<?php require_once 'includes/header_links.php' ?> 
</head>
<body>
	<main class="cDash-adm">
		<div class="result"></div>
		<?php require_once 'includes/sidebar_left.php';?>
		<div class="cDash-adm--containRight">
			<?php require_once 'includes/headertop.php';?>
			<div class="cDash-adm--containRight--cContain">
				<div class="cDash-adm--containRight--cContain__addtitle">
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">CUENTAS DE TRANSACCIONES</h2>
					<button type="button" href="#" id="add-transferbanks" class="cDash-adm--containRight--cContain__addtitle--btn-add" data-toggle="modal" data-target="#addtransferbanksModal"><span class="cDash-adm--containRight--cContain__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cardBody">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
							<div class="cDash-adm--containRight--cContain__inputsearch-table">
								<input type="text" class="cDash-adm--containRight--cContain__inputsearch-table--input" name="searchtransferbanks" id="searchtransferbanks" maxlength="100" placeholder="Buscar bancos de transferencia...">
							</div>
							<div class="contain-table-responsive">
								<table class="cDash-adm--containRight--cContain__list-results">
									<thead>
										<tr>
											<th>ID</th>
											<th>Nombre</th>
											<th>RUC</th>
											<th>Tipo</th>
											<th>Nº de cuenta</th>
											<th>moneda</th>
											<th>Imagen</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody id="tbl_my-transferbanks"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<!-- MODAL - AGREGAR NUEVO PAÍS -->
				<div class="modal fade bootstrapmodal-custom" id="addtransferbanksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">AGREGAR BANCO DE TRANSACCIONES</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="cont-modalbootstrap">
					        <form action="" id="form-add-transferbank" method="POST" class="cont-modalbootstrap__form" autocomplete="false" enctype="multipart/form-data">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="nameAccBank" class="cont-modalbootstrap__form--control__label">Nombre del Banco</label>
					        		<input id="nameAccBank" class="cont-modalbootstrap__form--control__input" name="nameAccBank" type="text" maxlength="36" required placeholder="Ingrese el nombre del banco">
					        		<span id="msgErrNounNombBank"></span>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="n_account" class="cont-modalbootstrap__form--control__label">Nº de cuenta</label>
					        		<input id="n_account" class="cont-modalbootstrap__form--control__input" name="n_account" type="number" maxlength="14" required placeholder="Ingrese el número de cuenta">
					        		<span id="msgErrNounNumbAccount"></span>
					        		<span>* Entre 13 y 14 caracteres</span>
					        	</div>
					        	<div class="cont-modalbootstrap__form--controlSelect">
					        		<label for="" class="cont-modalbootstrap__form--controlSelect--label">Tipo de cuenta</label>
					        		<div class="cont-modalbootstrap__form--controlSelect--cFakeSelect" id="btn-FakeListTypeAccount">
					        			<span class="cont-modalbootstrap__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItemAccount-fakeSel">Selecciona una cuenta</span>
					        			<input type="text" readonly id="SelectedItemAccount-inputfakesel">
					        			<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
					        		</div>
					        		<ul class="cont-modalbootstrap__form--controlSelect--m" id="c-listitems-typeaccount"></ul>
					        		<span id="msgErrNounTypeAccount"></span>
					        	</div>
					        	<div class="cont-modalbootstrap__form--controlSelect">
					        		<label for="" class="cont-modalbootstrap__form--controlSelect--label">Tipo de moneda</label>
					        		<div class="cont-modalbootstrap__form--controlSelect--cFakeSelect" id="btn-FakeListTypeCurr">
					        			<span class="cont-modalbootstrap__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSel">Selecciona una moneda</span>
					        			<input type="text" readonly id="SelectedItem-inputfakesel">
					        			<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
					        		</div>
					        		<ul class="cont-modalbootstrap__form--controlSelect--m" id="c-listitems-typecurrency"></ul>
					        		<span id="msgErrNounTypeCurr"></span>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="rucAccBank" class="cont-modalbootstrap__form--control__label">RUC</label>
					        		<input id="rucAccBank" class="cont-modalbootstrap__form--control__input" name="rucAccBank" type="number" maxlength="14" required placeholder="Ingrese el RUC de la cuenta">
					        		<span id="msgErrNounNumbRUC"></span>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="imagen">Foto del Banco</label>
					        		<input id="images" class="cont-modalbootstrap__form--control__input-photo images" name="imagen[]" type="file" accept="img/*" required>
					        	</div>
							      <div class="cont-modalbootstrap__footer">
							        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-transferbank">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- MODAL - EDITAR PAÍS -->
				<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR BANCO DE TRANSACCIONES</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-transferbank" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="idupdate-transferbank">
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="nameAccBank-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del Banco</label>
					        		<input id="nameAccBank-update" class="cont-modalbootstrapupdate__form--control__input" name="nameAccBank-update" type="text" maxlength="36" placeholder="Ingrese el nombre del país">
					        		<span id="msgErrNounNombBank-update"></span>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="n_account-update" class="cont-modalbootstrapupdate__form--control__label">Nº de cuenta</label>
					        		<input id="n_account-update" class="cont-modalbootstrapupdate__form--control__input" name="n_account-update" type="number" maxlength="14" required placeholder="Ingrese el número de cuenta">
					        		<span id="msgErrNounNumbAccount-update"></span>
					        		<span>* Entre 13 y 14 caracteres</span>
					        	</div>

					        	<div class="cont-modalbootstrapupdate__form--controlSelect">
					        		<label for="" class="cont-modalbootstrapupdate__form--controlSelect--label">Tipo de cuenta</label>
					        		<div class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect" id="btn-FakeListTypeAccount-Update">
					        			<span class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItemAccount-fakeSel-update">Selecciona una cuenta</span>
					        			<input type="text" readonly id="SelectedItemAccount-inputfakesel-update">
					        			<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
					        		</div>
					        		<ul class="cont-modalbootstrapupdate__form--controlSelect--m" id="c-listitems-typeaccount-Update"></ul>
					        		<span id="msgErrNounTypeAccount-update"></span>
					        	</div>


					        	<div class="cont-modalbootstrapupdate__form--controlSelect">
					        		<label for="" class="cont-modalbootstrapupdate__form--controlSelect--label">Tipo de moneda</label>
					        		<div class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect" id="btn-FakeListTypeCurr-Update">
					        			<span class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSel-Update">Selecciona una moneda</span>
					        			<input type="text" readonly id="SelectedItem-inputfakesel-Update">
					        			<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
					        		</div>
					        		<ul class="cont-modalbootstrapupdate__form--controlSelect--m" id="c-listitems-typecurrency-Update"></ul>
					        		<span id="msgErrNounTypeCurr-update"></span>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="rucAccBank-update" class="cont-modalbootstrapupdate__form--control__label">RUC</label>
					        		<input id="rucAccBank-update" class="cont-modalbootstrapupdate__form--control__input" name="rucAccBank-update" type="number" maxlength="14" required placeholder="Ingrese el RUC de la cuenta">
					        		<span id="msgErrNounNumbRUC-update"></span>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="imagen">Foto del Banco</label>
					        		<input id="images" class="cont-modalbootstrapupdate__form--control__input-photo images-update" name="imagen[]" type="file" accept="img/*">
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-transferbank">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- MODAL - ELIMINAR RESTAURANTE -->
				<div class="modal fade bootstrapmodaldelete-custom" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="delete-modal-label">ELIMINAR BANCO</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
					      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-delete-transferbank" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="iddelete-transferbank">
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-transferbank">ELIMINAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- FIN MODALS-->
			</div>
		</div>
	</main>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url; ?>js/helper.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/transbanks.js"></script>
</body>
</html>