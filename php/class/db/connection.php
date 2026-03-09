<?php 
	class Connection{

		// CREDENCIALES - MEMOPAY (HOSTING FINAL)
    /*
    protected $con = null;
    private $host = "207.7.82.106";
    private $dbname = "memopay_db";
    private $username = "memopay_user";
    private $password = "XM@?E,@^@[DL";
    private $charset = "utf8";

		// CONFIGURACIÓN - SERVIDOR (SERVIDOR TEMPORAL)
		
		protected $con = null;
		private $host = "158.106.132.103";
		private $dbname = "micambis_db_micambista";
		private $username = "micambis_use_micambista";
		private $password = "D^_~M)O%[K&#";
		private $charset = "utf8";
		*/

		// CONFIGURACIÓN - LOCALHOST
		protected $con = null;
		// private $host = "localhost";
		private $host = "127.0.0.1:3307";
		private $dbname = "db_memopay";
		private $username = "root";
		private $password = "";
		private $charset = "utf8";

		public function __construct(){
			try{

				$this->con = new PDO("mysql:host={$this->host}; dbname={$this->dbname}; charset={$this->charset}", $this->username, $this->password);
				$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			}catch(PDOException $err){
				echo "Error al conectar con la base de datos: ".$this->$dbname;
				die($err->getMessage());
			}
		}
		public function close(){
			if($this->con != null) $this->con = null;
		}
	}