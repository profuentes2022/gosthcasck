<?php
class cascos{
   private $idcodigo;
   private $medida;
   private $pintura;
   private $fechacreacion;
   private $hora;
   private $descripcion;
   private $atitud;
   private $longitud;


   public function __construct($idc, $med, $pin,$fechcre,$hor,$descrip,$at,$lon){
      $this->idcodigo=$idc;
      $this->medida=$med;
      $this->pintura=$pin;
      $this->fechacreacion=$fechcre;
      $this->hora=$hor;
      $this->descripcion=$descrip;
      $this->atitud=$at;
      $this->longitud=$lon;

   }

   public function insertar(){
    return "INSERT INTO usuarios(idcodigo, medida, pintura, fechacreacion, hora, descripcion, atitud, longitud)values(' $this->idcodigo','$this->medida','$this->pintura','$this->fechacreacion','$this->hora',' $this->descripcion','$this->atitud','$this->longitud')";
   }

   public function eliminar(){
    return "DELETE INTO usuarios where id={$id}"
   }

   public function editar(){
      return "UPDATE INTO usuarios(idcodigo, medida, pintura, fechacreacion, hora, descripcion, atitud, longitud)values(' $this->idcodigo','$this->medida','$this->pintura','$this->fechacreacion','$this->hora',' $this->descripcion','$this->atitud','$this->longitud')"
   }
   public function extraer(){
      return "SELECT * FROM usuarios";
   }
}



?>