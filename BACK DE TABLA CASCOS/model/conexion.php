<?php
class conexion{

   private $servidor;
   private $usuario;
   private $clave;
   private $con;
   private $db;


   public function __construct(){
    $this->servidor="localhost";
    $this->usuario="root";
    $this->clave="";
    $this->db="samsung";
   }

   public function conectar(){
    $this->con=mysql.connect(
        $this->$servidor,
        $this->$usuario,
        $this->clave,
        $this->db
    );
    
   };
   public function envio($sql){
    echo $sql;
    mysqlyi_query($this->con,$sql);
   }

   public function consulta($sql){
    $tabla=mysql_query($this->con,$sql);
    return $tabla;
   }
   public function desconectar(){
    mysqli_close($this->con);
   }
};

?>