<?php
require("..\model\cascos.php");
require("..\model\conexion.php");



function nuevocasco($idc, $med, $pin,$fechcre,$hor,$descrip,$at,$lon){
    $con= new conexion();
    $cascos= new casco($idc, $med, $pin,$fechcre,$hor,$descrip,$at,$lon);
   $con->conectar();
   $con->envio($cascos->insertar());
   $con->desconectar(); 
}

function Extraercasco(){
    $con= new conexion();
    $cascos= new casco('','','','','','','','');
    $con->conectar();
    $tabla=$con->consulta($cascos->extraer());
    $datos='';
    $registros=array();
    while($fila=mysqli_fetch_array($tabla)){
        extract($fila);
        $datos=array("idcodigo" =>$fila['idcodigo'],
                     "medida" => $fila['medida'],
                     "pintura"=>$fila['pintura'],
                     "fechacreacion"=>$fila['fechacreacion'],
                     "hora"=>$fila['hora'],
                     "descripcion"=>$fila['descripcion'],
                     "atitud"=>$fila['atitud'],
                     "longitud"=>$fila['longitud']        
    );
    array_push($registros, $datos);
    }
    return $registros;
}

?>