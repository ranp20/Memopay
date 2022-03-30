<?php 	
session_start();
	
if(!isset($_SESSION['admin'])){
	header("Location: admin");
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title>Instakash | Dashboard Admin</title>
	<?php require_once 'includes/header_links.php' ?> 
</head>
<body>
	<main class="cDash-adm">
		<?php require_once 'includes/sidebar_left.php';	?>
		<div class="cDash-adm--containRight">
			<?php require_once 'includes/headertop.php';	?>
			<div class="cDash-adm--containRight--cContain">
				<div class="cDash-adm--containRight--cContain--cTpage">
					<h2>Dashboard <?= $_SESSION['admin'][0]['username']; ?></h2>
				</div>
			</div>
		</div>
	</main>
	<script src="<?= $url ?>js/main.js"></script>
</body>
</html>