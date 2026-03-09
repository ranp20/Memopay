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

// CONFIGURACIÓN - LOCALHOST
$con = null;
// private $host = "localhost";
$host = "127.0.0.1:3307";
$dbname = "db_memopay";
$username = "root";
$password = "";
$charset = "utf8";

try {
  $con = new PDO("mysql:host={$host}; dbname={$dbname}; charset={$charset}", $username, $password);
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "La conexión ha fallado: " . $e->getMessage();
}