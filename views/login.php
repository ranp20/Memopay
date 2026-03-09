<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
//require_once '../php/process_session_complete_register.php';
require_once '../php/class/settings.php';
$call_config = new Settings_all();
$g_setting = $call_config->get_config();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Memopay | Login </title>
  <?php require_once 'includes/header_links.php'; ?>
  <!-- INCLUIR SWEET ALERT 2 -->
  <link rel="stylesheet" href="node_modules/sweetalert2/dist/sweetalert2.min.css">
  <script type="text/javascript" src="node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
</head>
<?php
$themeClass = '';
$themeClassBtn = '';
if(!empty($_COOKIE['prjMemopay-theme'])){
	if($_COOKIE['prjMemopay-theme'] == 'dark'){
		$themeClass = 'dark-theme';
		$themeClassBtn = 'checked';
	}else if($_COOKIE['prjMemopay-theme'] == 'light'){
		$themeClass = 'light-theme';
		$themeClassBtn = '';
	}
}
?>
<body class="<?= $themeClass;?>">
  <div class="cLogin">
    <div class="msgAlertLogin" id="msgAlertLogin"></div>
    <div class="cLogin__cont">
      <!-- 
      <div class="cLogin__cont--imgbanner">
        <img src="" alt="">
      </div>
       -->
      <div class="cLogin__cont--fLogin box">
        <!-- 
        <div class="cLogin__cont--fLogin--cLogo">
          <img src="<?= $url_adm_assets; ?>views/assets/img/logos/logo_principal/Memopay_logo.png" alt="logo_Memopay" width="100" height="100" decoding="async">
        </div>
        -->
        <div class="cLogin__cont--fLogin--cTitle">
          <div class="cLogin__cont--fLogin--cTitle--cLogo">
            <a href="./" class="cLogin__cont--fLogin--cTitle--cLogo--link">
              <img src="<?= $url_adm_assets; ?>views/assets/img/logos/logo_principal/Memopay_logo.png" alt="logo_Memopay" width="100" height="100" decoding="async">
            </a>
          </div>
          <p class="cLogin__cont--fLogin--cTitle--desc">Gana siempre con nosotros.</br>Mejores tasas, mayor ahorro.</p>
        </div>
        <form method="POST" class="cLogin__cont--fLogin--form" id="Login-PInstakash">
          <div class="cLogin__cont--fLogin--form--controls">
            <div class="cLogin__cont--fLogin--form--controls--cIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cLogin__cont--fLogin--form--controls--cIcon--email"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
            </div>
            <input type="email" id="email-instk" name="u-email" class="cLogin__cont--fLogin--form--controls--input" placeholder="Correo electrónico" autocomplete='on' spellcheck='true' required>
          </div>
          <div class="cLogin__cont--fLogin--form--controls">
            <div class="cLogin__cont--fLogin--form--controls--cIcon" id="icon-loginPassControl">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cLogin__cont--fLogin--form--controls--cIcon--pass"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/></svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cLogin__cont--fLogin--form--controls--cIcon--pass"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
            </div>
            <input type="password" id="pass-instk" name="u-password" class="cLogin__cont--fLogin--form--controls--input" placeholder="Contraseña" autocomplete='on' spellcheck='true' required>
          </div>
          <div class="cLogin__cont--fLogin--form--cBtnsActions">
            <a href="recover-password" class="cLogin__cont--fLogin--form--cBtnsActions--recovPass">¿Olvidaste tu contraseña?</a>
            <button class="cLogin__cont--fLogin--form--cBtnsActions--btnLogin" id="btn-loginCliMemopay" type="submit">Ingresar</button>
            <!-- 
            <button type="button" id="btnLognWithGoogleAuth" class="cLogin__cont--fLogin--form--cBtnsActions--btnLoginWithGoogle">
              <span class="cLogin__cont--fLogin--form--cBtnsActions--btnLoginWithGoogle__cIcon">
                <img src="<?= $url; ?>views/assets/img/svg/google_icon-Instakash.svg" alt="logo_google">
              </span>
              <span class="cLogin__cont--fLogin--form--cBtnsActions--btnLoginWithGoogle__cTxt">
                <span>Acceder con Google</span>
              </span>
            </button>
             -->
            <p class="cLogin__cont--fLogin--form--cBtnsActions--btnAccount">¿Eres nuevo en Memopay?<a href="signup" class="cLogin__cont--fLogin--form--cBtnsActions--btnAccount--link">Regístrate</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="<?= $url ?>views/js/actions_pages/login.js"></script>
</body>
</html>