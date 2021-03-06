<?php 
require_once '../../php/class/db/connection.php';
class Add_Transfer_Bank extends Connection{	
	function add(){
		$arr_tranferbank = [
			"name" => $_POST['name'],
			"n_account" => $_POST['n_account'],
			"id_type_account" => $_POST['id_type_account'],
			"id_currency" => $_POST['id_curr'],
			"ruc" => $_POST['ruc'],
			/*
			"type_currency" => $_POST['type_curr'],
			"prefix_currency" => $_POST['prefix_curr'],
			*/
			"imagen" => strtolower($_FILES['imagen']['name']),
		];
		try{
			$file_origin = $_FILES['imagen']['name'];
			$file_lowercase = strtolower($file_origin);
			$file_temp = $_FILES['imagen']['tmp_name'];
			$file_folder = "../views/assets/img/transferbanks/";

			if(move_uploaded_file($file_temp, $file_folder . $file_lowercase)){
				$sql = "CALL sp_add_transferbank (:name, :n_account, :id_type_account, :id_currency, :ruc, :imagen)";
				$stm = $this->con->prepare($sql);
				foreach ($arr_tranferbank as $key => $value) {
					$stm->bindValue($key, $value);
				}
				$stm->execute();
				return $stm->rowCount() > 0 ? "true" : "false";
			}else{
				echo "error fatal";
			}

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$add = new Add_Transfer_Bank();
echo $add->add();