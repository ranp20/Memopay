<form action="" method="POST" id="form-dataUserGenerals">
	<div class="cControlP__cont--containDash--c--myProfile--cDataUser">
		<div>
			<span>
				<span>
					<span>
						<span>
							<span>
								<span>
									<span>
										<input type="hidden" id="ipt-idCliValUpdateMyProfile" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" autocomplete='off' spellcheck='false' name="p_idclient" value="<?= $_SESSION['cli_sessmemopay'][0]['id'];?>" oncontextmenu="return false;">
									</span>
								</span>
							</span>
						</span>
					</span>
				</span>
			</span>
		</div>
	<div class="c-DataUser__item" id="c__userData-iptsProfile"></div>
	<div class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate">
		<div class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m">
			<!--  
			<div class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item">
				<button type="button" class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link">
					<span class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link--cIcon">
						<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" width="30px" height="30px" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><switch><foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1"/><g i:extraneous="self"><g><path d="M5273.1,2400.1v-2c0-2.8-5-4-9.7-4s-9.7,1.3-9.7,4v2c0,1.8,0.7,3.6,2,4.9l5,4.9c0.3,0.3,0.4,0.6,0.4,1v6.4     c0,0.4,0.2,0.7,0.6,0.8l2.9,0.9c0.5,0.1,1-0.2,1-0.8v-7.2c0-0.4,0.2-0.7,0.4-1l5.1-5C5272.4,2403.7,5273.1,2401.9,5273.1,2400.1z      M5263.4,2400c-4.8,0-7.4-1.3-7.5-1.8v0c0.1-0.5,2.7-1.8,7.5-1.8c4.8,0,7.3,1.3,7.5,1.8C5270.7,2398.7,5268.2,2400,5263.4,2400z"/><path d="M5268.4,2410.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1H5268.4z"/><path d="M5272.7,2413.7h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2414.1,5273.3,2413.7,5272.7,2413.7z"/><path d="M5272.7,2417h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2417.5,5273.3,2417,5272.7,2417z"/></g><g><circle cx="50" cy="64.6" r="6.6"/><circle cx="31.6" cy="64.6" r="6.6"/><circle cx="68.4" cy="64.6" r="6.6"/><path d="M77.4,31.7h-3.2v-5.1C74.1,13.3,63.3,2.5,50,2.5c-13.3,0-24.1,10.8-24.1,24.1v5.1h-3.2c-7.4,0-13.4,6-13.4,13.4v38.9     c0,7.4,6,13.4,13.4,13.4h54.7c7.4,0,13.4-6,13.4-13.4V45.2C90.8,37.8,84.8,31.7,77.4,31.7z M34.1,26.6c0-8.8,7.1-15.9,15.9-15.9     c8.8,0,15.9,7.1,15.9,15.9v5.1H34.1V26.6z M82.6,84.1c0,2.9-2.3,5.2-5.2,5.2H22.6c-2.9,0-5.2-2.3-5.2-5.2V45.2     c0-2.9,2.3-5.2,5.2-5.2h54.7c2.9,0,5.2,2.3,5.2,5.2V84.1z"/></g></g></switch></svg>
					</span>
					<span>Cambiar Contraseña</span>
				</button>
			</div>
			 -->	
			<div class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item">
				<div class="cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c">
					<?php
						$tmp_stateprofile = "";
						if(isset($list_stvalidation[0]['validation_status'])){
							if($list_stvalidation[0]['validation_status'] == "inreview"){
								$tmp_stateprofile .= "<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link non-linktocursor'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link--cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='30px' xml:space='preserve' version='1.1' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;' viewBox='0 0 846.66 1058.325' x='0px' y='0px' fill-rule='evenodd' clip-rule='evenodd'><defs></defs><g><path class='fil0' d='M423.33 227.01c157.51,0 292.93,62.38 378.95,196.33 -86.02,133.95 -221.44,196.33 -378.95,196.33 -157.49,0 -292.96,-62.38 -378.95,-196.33 85.99,-133.95 221.46,-196.33 378.95,-196.33zm-392.52 -38.1l0 -158.09 158.09 0 0 54.28 -103.81 0 0 103.81 -54.28 0zm626.95 -158.09l158.09 0 0 158.09 -54.28 0 0 -103.81 -103.81 0 0 -54.28zm158.09 626.95l0 158.09 -158.09 0 0 -54.28 103.81 0 0 -103.81 54.28 0zm-626.95 158.09l-158.09 0 0 -158.09 54.28 0 0 103.81 103.81 0 0 54.28zm234.43 -519.13c69.93,0 126.61,56.68 126.61,126.61 0,69.93 -56.68,126.61 -126.61,126.61 -69.93,0 -126.61,-56.68 -126.61,-126.61 0,-69.93 56.68,-126.61 126.61,-126.61zm0 74.04c29.03,0 52.57,23.54 52.57,52.57 0,29.03 -23.54,52.57 -52.57,52.57 -29.03,0 -52.57,-23.54 -52.57,-52.57 0,-29.03 23.54,-52.57 52.57,-52.57zm-313.8 52.57c71.42,97.53 196.04,141.95 313.8,141.95 117.75,0 242.37,-44.42 313.79,-141.95 -71.42,-97.53 -196.04,-141.95 -313.79,-141.95 -117.76,0 -242.38,44.42 -313.8,141.95z'/></g></svg>
																				</span>
																				<span>Verificación Biométrica</span>
																			</div>
																			<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt c-colormssg-process'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='30px' version='1.1' viewBox='0 0 700 700'><g xmlns='http://www.w3.org/2000/svg'><path d='m286.44 386.21c35.934 0 70.094-11.293 98.652-31.828l18.48 19.039-3.9219 3.9219c-1.7734 1.7734-2.8008 4.1055-2.8008 6.625 0 2.4258 1.0273 4.8516 2.8008 6.5352l110.13 110.23c8.3984 8.3984 19.508 12.602 30.52 12.602 11.012 0 22.027-4.1992 30.426-12.602 16.801-16.801 16.801-44.148 0-60.945l-110.13-110.13c-3.7344-3.7344-9.6133-3.7344-13.254 0l-4.1992 4.1992-18.477-19.137c47.133-66.266 41.16-158.95-18.199-218.31-32.016-32.102-74.668-49.742-120.03-49.742s-87.922 17.641-120.03 49.746c-32.016 32.012-49.746 74.664-49.746 120.03 0 45.359 17.734 88.012 49.746 120.03 32.105 32.105 74.664 49.746 120.03 49.746zm-106.77-276.64c28.465-28.469 66.453-44.242 106.77-44.242 40.414 0 78.309 15.773 106.87 44.238 58.895 58.988 58.895 154.84 0 213.73-28.559 28.465-66.453 44.238-106.87 44.238-40.32 0-78.309-15.773-106.77-44.238-28.562-28.559-44.336-66.543-44.336-106.86 0-40.32 15.773-78.309 44.336-106.87z'/><path d='m403.48 222.32c2.8008-3.4531 2.8008-8.3086 0-11.762-2.0547-2.6133-52.641-64.027-117.04-64.027-64.309 0-114.89 61.414-117.04 64.027-2.8008 3.4531-2.8008 8.3086 0 11.762 2.1484 2.6133 52.734 64.027 117.04 64.027 64.398 0 114.98-61.414 117.04-64.027zm-150.64-5.8789c0-18.574 15.027-33.691 33.602-33.691 18.574 0 33.691 15.121 33.691 33.691 0 18.574-15.121 33.691-33.691 33.691-18.574 0-33.602-15.121-33.602-33.691z'/></g></svg>
																				</span>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cTxt'>
																					<span>En revisión, se esta validando la información subida.</span>
																				</span>
																			</div>";
							}else if($list_stvalidation[0]['validation_status'] == "accepted"){
								$tmp_stateprofile .= "<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link non-linktocursor'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link--cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='30px' xml:space='preserve' version='1.1' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;' viewBox='0 0 846.66 1058.325' x='0px' y='0px' fill-rule='evenodd' clip-rule='evenodd'><defs></defs><g><path class='fil0' d='M423.33 227.01c157.51,0 292.93,62.38 378.95,196.33 -86.02,133.95 -221.44,196.33 -378.95,196.33 -157.49,0 -292.96,-62.38 -378.95,-196.33 85.99,-133.95 221.46,-196.33 378.95,-196.33zm-392.52 -38.1l0 -158.09 158.09 0 0 54.28 -103.81 0 0 103.81 -54.28 0zm626.95 -158.09l158.09 0 0 158.09 -54.28 0 0 -103.81 -103.81 0 0 -54.28zm158.09 626.95l0 158.09 -158.09 0 0 -54.28 103.81 0 0 -103.81 54.28 0zm-626.95 158.09l-158.09 0 0 -158.09 54.28 0 0 103.81 103.81 0 0 54.28zm234.43 -519.13c69.93,0 126.61,56.68 126.61,126.61 0,69.93 -56.68,126.61 -126.61,126.61 -69.93,0 -126.61,-56.68 -126.61,-126.61 0,-69.93 56.68,-126.61 126.61,-126.61zm0 74.04c29.03,0 52.57,23.54 52.57,52.57 0,29.03 -23.54,52.57 -52.57,52.57 -29.03,0 -52.57,-23.54 -52.57,-52.57 0,-29.03 23.54,-52.57 52.57,-52.57zm-313.8 52.57c71.42,97.53 196.04,141.95 313.8,141.95 117.75,0 242.37,-44.42 313.79,-141.95 -71.42,-97.53 -196.04,-141.95 -313.79,-141.95 -117.76,0 -242.38,44.42 -313.8,141.95z'/></g></svg>
																				</span>
																				<span>Verificación Biométrica</span>
																			</div>
																			<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt c-colormssg-success'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='28px' height='28px' version='1.1' viewBox='0 0 700 700'><g xmlns='http://www.w3.org/2000/svg'><path d='m124.28 346.64c-18.781-18.781-18.781-49.242 0-68.008 18.781-18.781 49.242-18.781 68.023 0l92.234 92.234 219.34-283.7c16.18-20.965 46.301-24.832 67.27-8.6523 20.965 16.18 24.832 46.301 8.6523 67.27l-250.47 323.97c-1.7812 2.7031-3.8633 5.2734-6.2344 7.6602-18.781 18.781-49.242 18.781-68.023 0l-130.77-130.77z'/></g></svg>
																				</span>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cTxt'>
																					<span>Completado. Datos verificados.</span>
																				</span>
																			</div>";
							}else if($list_stvalidation[0]['validation_status'] == "rejected"){
								$tmp_stateprofile .= "<button type='button' class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link' id='link-SValidModalAccBiometric'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link--cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='30px' xml:space='preserve' version='1.1' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;' viewBox='0 0 846.66 1058.325' x='0px' y='0px' fill-rule='evenodd' clip-rule='evenodd'><defs></defs><g><path class='fil0' d='M423.33 227.01c157.51,0 292.93,62.38 378.95,196.33 -86.02,133.95 -221.44,196.33 -378.95,196.33 -157.49,0 -292.96,-62.38 -378.95,-196.33 85.99,-133.95 221.46,-196.33 378.95,-196.33zm-392.52 -38.1l0 -158.09 158.09 0 0 54.28 -103.81 0 0 103.81 -54.28 0zm626.95 -158.09l158.09 0 0 158.09 -54.28 0 0 -103.81 -103.81 0 0 -54.28zm158.09 626.95l0 158.09 -158.09 0 0 -54.28 103.81 0 0 -103.81 54.28 0zm-626.95 158.09l-158.09 0 0 -158.09 54.28 0 0 103.81 103.81 0 0 54.28zm234.43 -519.13c69.93,0 126.61,56.68 126.61,126.61 0,69.93 -56.68,126.61 -126.61,126.61 -69.93,0 -126.61,-56.68 -126.61,-126.61 0,-69.93 56.68,-126.61 126.61,-126.61zm0 74.04c29.03,0 52.57,23.54 52.57,52.57 0,29.03 -23.54,52.57 -52.57,52.57 -29.03,0 -52.57,-23.54 -52.57,-52.57 0,-29.03 23.54,-52.57 52.57,-52.57zm-313.8 52.57c71.42,97.53 196.04,141.95 313.8,141.95 117.75,0 242.37,-44.42 313.79,-141.95 -71.42,-97.53 -196.04,-141.95 -313.79,-141.95 -117.76,0 -242.38,44.42 -313.8,141.95z'/></g></svg>
																				</span>
																				<span>Verificación Biométrica</span>
																			</button>
																			<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt c-colormssg-danger'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' version='1.1' viewBox='0 0 700 700'>
																					 <path d='m350 35c-135.1 0-245 109.9-245 245s109.9 245 245 245 245-109.9 245-245-109.9-245-245-245zm210 245c0 51.609-18.797 98.859-49.789 135.45l-295.68-295.64c36.609-31.008 83.859-49.805 135.47-49.805 115.8 0 210 94.203 210 210zm-420 0c0-51.609 18.797-98.859 49.789-135.45l295.68 295.66c-36.609 30.988-83.859 49.785-135.47 49.785-115.8 0-210-94.203-210-210z'/>
																					</svg>
																				</span>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cTxt'>
																					<span>No aceptado. Por favor, vuelva a subir la información requerida.</span>
																				</span>
																			</div>";
							}else{
								$tmp_stateprofile .= "<button type='button' class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link' id='link-SValidModalAccBiometric'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--link--cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='30px' xml:space='preserve' version='1.1' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;' viewBox='0 0 846.66 1058.325' x='0px' y='0px' fill-rule='evenodd' clip-rule='evenodd'><defs></defs><g><path class='fil0' d='M423.33 227.01c157.51,0 292.93,62.38 378.95,196.33 -86.02,133.95 -221.44,196.33 -378.95,196.33 -157.49,0 -292.96,-62.38 -378.95,-196.33 85.99,-133.95 221.46,-196.33 378.95,-196.33zm-392.52 -38.1l0 -158.09 158.09 0 0 54.28 -103.81 0 0 103.81 -54.28 0zm626.95 -158.09l158.09 0 0 158.09 -54.28 0 0 -103.81 -103.81 0 0 -54.28zm158.09 626.95l0 158.09 -158.09 0 0 -54.28 103.81 0 0 -103.81 54.28 0zm-626.95 158.09l-158.09 0 0 -158.09 54.28 0 0 103.81 103.81 0 0 54.28zm234.43 -519.13c69.93,0 126.61,56.68 126.61,126.61 0,69.93 -56.68,126.61 -126.61,126.61 -69.93,0 -126.61,-56.68 -126.61,-126.61 0,-69.93 56.68,-126.61 126.61,-126.61zm0 74.04c29.03,0 52.57,23.54 52.57,52.57 0,29.03 -23.54,52.57 -52.57,52.57 -29.03,0 -52.57,-23.54 -52.57,-52.57 0,-29.03 23.54,-52.57 52.57,-52.57zm-313.8 52.57c71.42,97.53 196.04,141.95 313.8,141.95 117.75,0 242.37,-44.42 313.79,-141.95 -71.42,-97.53 -196.04,-141.95 -313.79,-141.95 -117.76,0 -242.38,44.42 -313.8,141.95z'/></g></svg>
																				</span>
																				<span>Verificación Biométrica</span>
																			</button>
																			<div class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt c-colormssg-danger'>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cIcon'>
																					<svg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' version='1.1' viewBox='0 0 700 700'>
																					 <path d='m350 35c-135.1 0-245 109.9-245 245s109.9 245 245 245 245-109.9 245-245-109.9-245-245-245zm210 245c0 51.609-18.797 98.859-49.789 135.45l-295.68-295.64c36.609-31.008 83.859-49.805 135.47-49.805 115.8 0 210 94.203 210 210zm-420 0c0-51.609 18.797-98.859 49.789-135.45l295.68 295.66c-36.609 30.988-83.859 49.785-135.47 49.785-115.8 0-210-94.203-210-210z'/>
																					</svg>
																				</span>
																				<span class='cControlP__cont--containDash--c--myProfile--cDataUser--cDataValidate--m--item__c__mssgValidOpt__cTxt'>
																					<span>Nada subido aún.</span>
																				</span>
																			</div>";
							}
						}else{
							$tmp_stateprofile .= "<div style='color:red;'>
																			<p style='color:red;'>Error 404.</p>
																			<p style='color:red;'>El valor no existe. Hubo un error al procesar la información.</p>
																		</div>";
						}
						echo $tmp_stateprofile;
					?>
				</div>
			</div>
		</div>
	</div>
</form>