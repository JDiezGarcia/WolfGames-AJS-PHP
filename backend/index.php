
<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	set_include_path(get_include_path() . ":{$_SERVER['DOCUMENT_ROOT']}/jquery_php");
	
    if ((isset($_GET['page'])) && ($_GET['page']==="controller_user") ){
		include("view/inc/top_page_user.html");
	}else{
		include("view/inc/top_page.html");
	}
	session_start();
?>
<div id="header">
	<?php
		include("view/inc/header.html");
	?>
</div> 
<div id="wrapper">
    <div id="pages">
    	<?php 
		    include("view/inc/pages.php"); 
		?>        
        <br style="clear:both;" />
    </div>
</div>
<div id="footer">   	   
	<?php
		include("view/inc/footer.html");
	?>        
</div>
<?php
    include("view/inc/bottom_page.html");
?>
    