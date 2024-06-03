<?php
 require("..\controller\c_cascos.php");

 header("HTTP//1.1 200");
 header("Content-type:aplication/json; charset:UFT-8");

 if($_SERVER['REQUEST_METHOD']=="POST"){
    nuevacasco($_POST['idc'], $_POST['med'], $_POST['pin'], $_POST['fechcre'], $_POST['hor'], $_POST['descrip'], $_POST['at'], $_POST['lon']);
 }

if($_SERVER['REQUEST_METHOD']=="GET"){
    echo json_encode(());
}

?>