<?php
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  // CONFIGURACIÓN - LOCALHOST
  
  // $url =  $actual_link . "/Memopay/";
  // $url_defaultURL =  $actual_link . "/Memopay";
  // $url_adm_assets =  $actual_link . "/Memopay/admin/";

  // CONFIGURACIÓN - SERVIDOR
  
  $url =  $actual_link . "/";
  $url_defaultURL =  $actual_link . "/";
  $url_adm_assets =  $actual_link . "/admin/";
  
?>
<meta charset="UTF-8"/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=6.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover"/>
<meta name="keywords" content="memopay, Casa de cambio online, Cambiar soles en Perú, Cambiar soles ahora"/>
<meta name="description" content="¡Gana cambiando con Memopay! Dale a tu dinero el valor que merece."/>
<meta name="theme-color" content="#FFF394"/>
<meta name="author" content="R@np-2021"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="twitter.card" content="summary"/>
<meta property="og:locale" content="es_ES"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Memopay"/>
<meta property="og:url" name="twitter.url" content="https://localhost/Memopay"/>
<meta property="og:title" name="twitter.title" content="Centro de cambio en línea con las mejores tasas | Memopay"/>
<meta property="og:description" name="twitter.description" content="¡Gana cambiando con Memopay! Dale a tu dinero el valor que merece."/>
<meta property="og:image" name="twitter.image" content="./admin/views/assets/img/favicon/Memopay_logo.ico"/>
<link rel="icon" type="image/x-icon" href="./admin/views/assets/img/favicon/Memopay_logo.ico"/>
<link rel="apple-touch-icon" href="./admin/views/assets/img/favicon/Memopay_logo.ico"/>
<link rel="canonical" href="https://localhost/Memopay"/>
<!-- PRELOADER FILES -->
<link rel="preload" href="<?= $url ?>views/assets/css/styles.min.css" as="style"/>
<link rel="preload" href="<?= $url ?>views/js/jquery/jquery-3.6.0.min.js" as="script"/>
<!-- JQUERY UNCOMPRESSED -->
<script type="text/javascript" src="<?= $url ?>views/js/jquery/jquery-3.6.0.min.js"></script>
<!-- STYLESSHEET -->
<link rel="stylesheet" href="<?= $url ?>views/assets/css/styles.min.css">
<!-- GOOGLE FONTS -->
<!-- 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet">
 -->