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
	<title>Memopay | Cupones</title>
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
					<h2 class="cDash-adm--containRight--cContain__addtitle--title">CUPONES</h2>
					<button type="button" href="#" id="add-coupon" class="cDash-adm--containRight--cContain__addtitle--btn-add" data-toggle="modal" data-target="#addcouponModal"><span class="cDash-adm--containRight--cContain__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>
				</div>
				<div class="cDash-adm--containRight--cContain__cBody">
					<div class="cDash-adm--containRight--cContain__cBody__cardBody">
						<div class="cDash-adm--containRight--cContain__cBody__cardBody__cCardBody">
							<div class="cDash-adm--containRight--cContain__inputsearch-table">
								<input type="text" class="cDash-adm--containRight--cContain__inputsearch-table--input" name="searchcoupons" id="searchcoupons" maxlength="100" placeholder="Buscar cupones...">
							</div>
							<div class="contain-table-responsive">
								<table class="cDash-adm--containRight--cContain__list-results">
									<thead>
										<tr>
											<th>id</th>
											<th>Activado</th>
											<th>Código</th>
											<th>M. mayores a</th>
											<th>Desc. de tarifa (Compra)</th>
											<th>Tarifa Final (Compra)</th>
											<th>Desc. de tarifa (Venta)</th>
											<th>Tarifa Final (Venta)</th>
											<th>Ámbito</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody id="tbl_coupons"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<!-- MODAL - AGREGAR NUEVO PAÍS -->
				<div class="modal fade bootstrapmodal-custom" id="addcouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">AGREGAR CUPÓN</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="cont-modalbootstrap">
					        <form action="" id="form-add-coupon" method="POST" class="cont-modalbootstrap__form" autocomplete="false">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="code_coupon" class="cont-modalbootstrap__form--control__label">Estado de activación</label>
					        		<div class="cont-modalbootstrap__form--control__cSwith">
												<div class="cont-modalbootstrap__form--control__cSwith__c">
													<div class="cont-modalbootstrap__form--control__cSwith__c__chckCont">
														<input type="checkbox" id="chck_stactivactioncoupon" class="cont-modalbootstrap__form--control__cSwith__c__chckCont__input" name="activation" value="inactive">
														<label for="chck_stactivactioncoupon" class="cont-modalbootstrap__form--control__cSwith__c__chckCont__label"></label>
													</div>
												</div>
												<label for="" class="cont-modalbootstrap__form--control__cSwith__label" id="txt-stactivaction">Desactivado</label>
											</div>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="code_coupon" class="cont-modalbootstrap__form--control__label">Tipo de Ámbito</label>
					        		<div class="cont-modalbootstrap__form--control__cSwith">
												<div class="cont-modalbootstrap__form--control__cSwith__c">
													<div class="cont-modalbootstrap__form--control__cSwith__c__chckCont">
														<input type="checkbox" id="chck_typescopecoupon" class="cont-modalbootstrap__form--control__cSwith__c__chckCont__input" name="type_scope" value="addable">
														<label for="chck_typescopecoupon" class="cont-modalbootstrap__form--control__cSwith__c__chckCont__label"></label>
													</div>
												</div>
												<label for="" class="cont-modalbootstrap__form--control__cSwith__label" id="txt-scopeCoupon">Agregable</label>
											</div>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="code_coupon" class="cont-modalbootstrap__form--control__label">Código del cupón</label>
					        		<input id="code_coupon" class="cont-modalbootstrap__form--control__input" name="code_coupon" type="text" maxlength="100" required placeholder="Ingrese el código del cupón" autocomplete='off' spellcheck='false'>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="larger_amounts" class="cont-modalbootstrap__form--control__label">Montos mayores a:</label>
					        		<input id="larger_amounts" class="cont-modalbootstrap__form--control__input" name="larger_amounts" type="number" maxlength="100" required placeholder="Ingrese el monto">
					        	</div>
					        	<div class="cont-groupbox-controls">
					        		<label for="" class="cont-groupbox-controls__label">Precio de compra</label>
						        	<div class="cont-group-form-controls w-100">
							        	<div class="cont-modalbootstrap__form--control md-col-2-44">
							        		<label for="buy_price_original" class="cont-modalbootstrap__form--control__label">Precio Original</label>
							        		<input id="buy_price_original" class="cont-modalbootstrap__form--control__input readonly" type="text" required placeholder="" readonly>
							        	</div>
							        	<span class="cont-modalbootstrap__form--cMediumIcon">
							        		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m409.59 50.398c-4.0898-4.0352-9.6602-6.2031-15.402-5.9922-5.6484-0.16016-11.113 2.0078-15.121 5.9922-4.0781 3.9492-6.3633 9.3906-6.3281 15.066v128.8h-302.73v171.47h302.73v128.8c0.058594 5.6562 2.332 11.062 6.332 15.062s9.4062 6.2734 15.062 6.332c6-0.22656 11.719-2.5898 16.129-6.6641l213.7-214.54c3.9805-3.8516 6.1719-9.1875 6.0469-14.727 0.20312-5.75-1.9883-11.324-6.0469-15.398z"/></g></svg>
							        	</span>	
							        	<div class="cont-modalbootstrap__form--control md-col-2-44">
							        		<label for="buy_price_dismiss" class="cont-modalbootstrap__form--control__label">Precio Rebajado</label>
							        		<input id="buy_price_dismiss" class="cont-modalbootstrap__form--control__input readonly" name="buy_price_dismiss" type="text" data-format="fourdecimals" required placeholder="" readonly>
							        	</div>
						        	</div>
						        	<div class="cont-modalbootstrap__form--control w-100">
						        		<label for="buy_percent_desc" class="cont-modalbootstrap__form--control__label">Descuento</label>
						        		<input id="buy_percent_desc" class="cont-modalbootstrap__form--control__input" name="buy_percent_desc" type="text" data-format="fourdecimals" required placeholder="Ingrese el descuento del cupón" autocomplete='off' spellcheck='false'>
						        	</div>
					        	</div>
					        	<div class="cont-groupbox-controls">
					        		<label for="" class="cont-groupbox-controls__label">Precio de venta</label>
						        	<div class="cont-group-form-controls w-100">
							        	<div class="cont-modalbootstrap__form--control md-col-2-44">
							        		<label for="sell_price_original" class="cont-modalbootstrap__form--control__label">Precio Original</label>
							        		<input id="sell_price_original" class="cont-modalbootstrap__form--control__input readonly" type="text" required placeholder="" readonly>
							        	</div>
							        	<span class="cont-modalbootstrap__form--cMediumIcon">
							        		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m409.59 50.398c-4.0898-4.0352-9.6602-6.2031-15.402-5.9922-5.6484-0.16016-11.113 2.0078-15.121 5.9922-4.0781 3.9492-6.3633 9.3906-6.3281 15.066v128.8h-302.73v171.47h302.73v128.8c0.058594 5.6562 2.332 11.062 6.332 15.062s9.4062 6.2734 15.062 6.332c6-0.22656 11.719-2.5898 16.129-6.6641l213.7-214.54c3.9805-3.8516 6.1719-9.1875 6.0469-14.727 0.20312-5.75-1.9883-11.324-6.0469-15.398z"/></g></svg>
							        	</span>	
							        	<div class="cont-modalbootstrap__form--control md-col-2-44">
							        		<label for="sell_price_dismiss" class="cont-modalbootstrap__form--control__label">Precio Rebajado</label>
							        		<input id="sell_price_dismiss" class="cont-modalbootstrap__form--control__input readonly" name="sell_price_dismiss" type="text" data-format="fourdecimals" required placeholder="" readonly>
							        	</div>
						        	</div>
						        	<div class="cont-modalbootstrap__form--control w-100">
						        		<label for="sell_percent_desc" class="cont-modalbootstrap__form--control__label">Descuento</label>
						        		<input id="sell_percent_desc" class="cont-modalbootstrap__form--control__input" name="sell_percent_desc" type="text" data-format="fourdecimals" required placeholder="Ingrese el descuento del cupón" autocomplete='off' spellcheck='false'>
						        	</div>
					        	</div>
							      <div class="cont-modalbootstrap__footer">
							        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-coupon">GUARDAR</button>
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
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR CUPÓN</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-coupon" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="idupdate-coupon">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="code_coupon-update" class="cont-modalbootstrapupdate__form--control__label complete">Estado de activación</label>
					        		<div class="cont-modalbootstrapupdate__form--control__cSwith" id="c-SwitchUpdItem-activation"></div>
					        	</div>
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="code_coupon-update" class="cont-modalbootstrapupdate__form--control__label complete">Tipo de Ámbito</label>
					        		<div class="cont-modalbootstrapupdate__form--control__cSwith" id="c-SwitchUpdItem"></div>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="code_coupon-update" class="cont-modalbootstrapupdate__form--control__label complete">Código del cupón</label>
					        		<input id="code_coupon-update" class="cont-modalbootstrapupdate__form--control__input" name="code_coupon-update" type="text" maxlength="100" placeholder="Ingrese el código del cupón" autocomplete='off' spellcheck='false'>
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="larger_amounts-update" class="cont-modalbootstrapupdate__form--control__label">Montos mayores a:</label>
					        		<input id="larger_amounts-update" class="cont-modalbootstrapupdate__form--control__input" name="larger_amounts-update" type="number" maxlength="100" required placeholder="Ingrese el monto">
					        	</div>
					        	<div class="cont-groupbox-controls">
					        		<label for="" class="cont-groupbox-controls__label">Precio de compra</label>
						        	<div class="cont-group-form-controls w-100">
							        	<div class="cont-modalbootstrapupdate__form--control md-col-2-44">
							        		<label for="buy_price_original-update" class="cont-modalbootstrapupdate__form--control__label">Precio Original</label>
							        		<input id="buy_price_original-update" class="cont-modalbootstrapupdate__form--control__input readonly" type="text" required placeholder="" readonly>
							        	</div>
							        	<span class="cont-modalbootstrapupdate__form--cMediumIcon">
							        		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m409.59 50.398c-4.0898-4.0352-9.6602-6.2031-15.402-5.9922-5.6484-0.16016-11.113 2.0078-15.121 5.9922-4.0781 3.9492-6.3633 9.3906-6.3281 15.066v128.8h-302.73v171.47h302.73v128.8c0.058594 5.6562 2.332 11.062 6.332 15.062s9.4062 6.2734 15.062 6.332c6-0.22656 11.719-2.5898 16.129-6.6641l213.7-214.54c3.9805-3.8516 6.1719-9.1875 6.0469-14.727 0.20312-5.75-1.9883-11.324-6.0469-15.398z"/></g></svg>
							        	</span>	
							        	<div class="cont-modalbootstrapupdate__form--control md-col-2-44">
							        		<label for="buy_price_dismiss-update" class="cont-modalbootstrapupdate__form--control__label">Precio Rebajado</label>
							        		<input id="buy_price_dismiss-update" class="cont-modalbootstrapupdate__form--control__input readonly" name="buy_price_dismiss-update" type="text" data-format="fourdecimals" required placeholder="" readonly>
							        	</div>
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form--control w-100">
						        		<label for="buy_percent_desc-update" class="cont-modalbootstrapupdate__form--control__label">Descuento</label>
						        		<input id="buy_percent_desc-update" class="cont-modalbootstrapupdate__form--control__input" name="buy_percent_desc-update" type="text" data-format="fourdecimals" required placeholder="Ingrese el descuento del cupón" autocomplete='off' spellcheck='false'>
						        	</div>
					        	</div>
					        	<div class="cont-groupbox-controls">
					        		<label for="" class="cont-groupbox-controls__label">Precio de venta</label>
						        	<div class="cont-group-form-controls w-100">
							        	<div class="cont-modalbootstrapupdate__form--control md-col-2-44">
							        		<label for="sell_price_original-update" class="cont-modalbootstrapupdate__form--control__label">Precio Original</label>
							        		<input id="sell_price_original-update" class="cont-modalbootstrapupdate__form--control__input readonly" type="text" required placeholder="" readonly>
							        	</div>
							        	<span class="cont-modalbootstrapupdate__form--cMediumIcon">
							        		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m409.59 50.398c-4.0898-4.0352-9.6602-6.2031-15.402-5.9922-5.6484-0.16016-11.113 2.0078-15.121 5.9922-4.0781 3.9492-6.3633 9.3906-6.3281 15.066v128.8h-302.73v171.47h302.73v128.8c0.058594 5.6562 2.332 11.062 6.332 15.062s9.4062 6.2734 15.062 6.332c6-0.22656 11.719-2.5898 16.129-6.6641l213.7-214.54c3.9805-3.8516 6.1719-9.1875 6.0469-14.727 0.20312-5.75-1.9883-11.324-6.0469-15.398z"/></g></svg>
							        	</span>	
							        	<div class="cont-modalbootstrapupdate__form--control md-col-2-44">
							        		<label for="sell_price_dismiss-update" class="cont-modalbootstrapupdate__form--control__label">Precio Rebajado</label>
							        		<input id="sell_price_dismiss-update" class="cont-modalbootstrapupdate__form--control__input readonly" name="sell_price_dismiss-update" type="text" data-format="fourdecimals" required placeholder="" readonly>
							        	</div>
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form--control w-100">
						        		<label for="sell_percent_desc-update" class="cont-modalbootstrapupdate__form--control__label">Descuento</label>
						        		<input id="sell_percent_desc-update" class="cont-modalbootstrapupdate__form--control__input" name="sell_percent_desc-update" type="text" data-format="fourdecimals" required placeholder="Ingrese el descuento del cupón" autocomplete='off' spellcheck='false'>
						        	</div>
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-coupon">GUARDAR</button>
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
				        <h5 class="modal-title" id="delete-modal-label">ELIMINAR CUPÓN</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
					      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-delete-coupon" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="iddelete-coupon">
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-coupon">ELIMINAR</button>
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
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/coupons.js"></script>
</body>
</html>