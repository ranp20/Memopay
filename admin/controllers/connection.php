<?php
/*
// CREDENCIALES - MEMOPAY (HOSTING FINAL)
$servidor = "207.7.82.106";
$dbname = "memopay_db";
$usuario = "memopay_user";
$password = "XM@?E,@^@[DL";
//CONFIGURACIÓN - SERVIDOR (SERVIDOR TEMPORAL)
$servidor = "158.106.132.103";
$dbname = "micambis_db_micambista";
$usuario = "micambis_use_micambista";
$password = "D^_~M)O%[K&#";
*/
//CONFIGURACIÓN - LOCALHOST

$servidor = "localhost";
$dbname = "db_memopay";
$usuario = "root";
$password = "";

try {
  $con = new PDO("mysql:host=$servidor;dbname=$dbname",$usuario,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "La conexión ha fallado: " . $e->getMessage();
}