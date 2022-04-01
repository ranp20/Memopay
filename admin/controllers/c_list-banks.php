<?php 
require_once '../../php/class/db/connection.php';
class Banks extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_bank ORDER BY id DESC";
			if(isset($_POST['searchList'])){
				//$search = $this->con->real_escape_string($_POST['searchList']);
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT * FROM tbl_bank 
								WHERE id LIKE '%".$search."%' OR
											name LIKE '%".$search."%' OR
											photo LIKE '%".$search."%'
								ORDER BY id DESC";
			}
			$stm = $this->con->query($sql);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$banks = new Banks();
echo $banks->list();