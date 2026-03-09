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
	<title>Memopay | Países</title>
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
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">PAÍSES</h2>
					<button type="button" href="#" id="add-country" class="cDash-adm--containRight--cContain__addtitle--btn-add" data-toggle="modal" data-target="#addcountryModal"><span class="cDash-adm--containRight--cContain__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cardBody">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
							<div class="cDash-adm--containRight--cContain__inputsearch-table">
								<input type="text" class="cDash-adm--containRight--cContain__inputsearch-table--input" name="searchcountries" id="searchcountries" maxlength="100" placeholder="Buscar países...">
							</div>
							<div class="contain-table-responsive">
								<table class="cDash-adm--containRight--cContain__list-results">
									<thead>
										<tr>
											<th>ID</th>
											<th>Nombre</th>
											<th>Prefijo</th>
											<th>Imagen</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody id="tbl_countries"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<!-- MODAL - AGREGAR NUEVO PAÍS -->
				<div class="modal fade bootstrapmodal-custom" id="addcountryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">AGREGAR PAÍS</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="cont-modalbootstrap">
					        <form action="" id="form-add-country" method="POST" class="cont-modalbootstrap__form" autocomplete="false" enctype="multipart/form-data">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="name" class="cont-modalbootstrap__form--control__label">Nombre del país</label>
					        		<input id="name" class="cont-modalbootstrap__form--control__input" name="name" type="text" maxlength="36" required placeholder="Ingrese el nombre del país">
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="prefix" class="cont-modalbootstrap__form--control__label">Prefijo numérico del país</label>
					        		<div class="cont-modalbootstrap__form--control__contIconLeft">
					        			<div class="cont-modalbootstrap__form--control__contIconLeft--icon">+</div>
					        			<input id="prefix" class="cont-modalbootstrap__form--control__input" name="prefix" type="text" required  maxlength="2" placeholder="Ingrese el prefijo numérico del país">
					        		</div>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="imagen">Foto del país</label>
					        		<input id="images" class="cont-modalbootstrap__form--control__input-photo images" name="imagen[]" type="file" accept="img/*" required>
					        	</div>
							      <div class="cont-modalbootstrap__footer">
							        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-country">GUARDAR</button>
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
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR CATEGORÍA</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-country" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="idupdate-country">
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del país</label>
					        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="36" placeholder="Ingrese el nombre del país">
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="prefix-update" class="cont-modalbootstrapupdate__form--control__label complete">Prefijo numérico del país</label>
					        		<div class="cont-modalbootstrapupdate__form--control__contIconLeft">
					        			<div class="cont-modalbootstrapupdate__form--control__contIconLeft--icon">+</div>
					        			<input id="prefix-update" class="cont-modalbootstrapupdate__form--control__input" name="prefix-update" type="text" maxlength="5" placeholder="Ingrese el prefijo numérico del país">
					        		</div>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="imagen">Foto del país</label>
					        		<input id="images" class="cont-modalbootstrap__form--control__input-photo images-update" name="imagen[]" type="file" accept="img/*">
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-country">GUARDAR</button>
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
				        <h5 class="modal-title" id="delete-modal-label">ELIMINAR PAÍS</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
					      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-delete-country" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="iddelete-country">
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-country">ELIMINAR</button>
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
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/countries.js"></script>
</body>
</html>