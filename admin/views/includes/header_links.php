<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  // CONFIGURACIÓN - LOCALHOST
  
  // $url =  $actual_link . "/" ."Memopay/admin/views/";
  // $urlCli =  $actual_link . "/" ."Memopay/";

  // CONFIGURACIÓN - SERVIDOR
  
  $url =  $actual_link . "/" ."admin/views/";
  $urlCli =  $actual_link . "/";
  
?>
<meta charset="UTF-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover">
<meta name="description" content="¡Gana cambiando con Memopay! Dale a tu dinero el valor que merece."/>
<meta name="theme-color" content="#FFF394">
<meta name="author" content="R@np-2021"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="twitter.card" content="summary">
<meta property="og:locale" content="es_ES"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Memopay - Panel de Administración"/>
<meta property="og:url" name="twitter.url" content="https://localhost/Memopay/admin">
<meta property="og:title" name="twitter.title" content="Centro de cambio en línea con las mejores tasas | Memopay"/>
<meta property="og:description" name="twitter.description" content="¡Gana cambiando con Memopay! Dale a tu dinero el valor que merece."/>
<meta property="og:image" name="twitter.image" content="views/assets/img/svg/logo.svg"/>
<link rel="icon" type="image/x-icon" href="views/assets/img/svg/logo.svg"/>
<link rel="apple-touch-icon" href="views/assets/img/svg/logo.svg">
<link rel="canonical" href="https://localhost/Memopay/admin">
<!-- JQUERY UNCOMPRESSED -->
<script type="text/javascript" src="<?= $url ?>js/jquery/jquery-3.6.0.min.js"></script>
<!-- BOOTSTRAP DOWNLOADED -->
<link rel="stylesheet" href="<?php echo $url ?>js/bootstrap/css/bootstrap.min.css">
<script type="text/javascript" src="<?php echo $url ?>js/bootstrap/js/bootstrap.min.js"></script>
<!-- STYLESSHEET -->
<link rel="stylesheet" href="<?= $url ?>assets/css/styles.min.css">
<!-- GOOGLE FONTS -->
<!--
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet">
-->