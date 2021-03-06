<?php 
require_once '../../php/class/db/connection.php';
class Coupons extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_coupon ORDER BY id DESC";
			if(isset($_POST['searchList'])){
				//$search = $this->con->real_escape_string($_POST['searchList']);
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT * FROM tbl_coupon 
								WHERE id LIKE '%".$search."%' OR
											code_coupon LIKE '%".$search."%' OR
											buy_percent_desc LIKE '%".$search."%'
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
$coupons = new Coupons();
echo $coupons->list();