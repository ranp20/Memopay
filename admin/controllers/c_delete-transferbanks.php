<?php 
require_once '../../php/class/connection.php';
class Delete extends Connection{
	function delete_transferbank(){
		$id = $_POST['id'];

		try{
			$sql = "DELETE FROM tbl_accounts_bank_platform WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();

			$data = $stm->fetchAll(PDO::FETCH_ASSOC);
			$response = json_decode($data);
			echo $response;

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$delete = new Delete();
echo $delete->delete_transferbank();