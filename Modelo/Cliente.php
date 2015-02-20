<?php
require_once('Base.php');

class ModeloCliente extends ModeloBase
{
    //------------usuario--------
    public function Mostrar_clientes()
    {
        $this->consulta = "SELECT *from tcliente";
        $this->consultar();        
        return $this->rows;       
    }   

    public function InsertarCliente($vars)
    {
        $this->consulta = "INSERT INTO tcliente (razonsocial, abreviatura, descripcion, persona, ruc, dni, correo, celular, telefonofijo, direccion, paginaweb) VALUES (VALUES ('Razon Social numero 3', 'RS3', 'descripcion razon social 3', 'Natural', '234532321', 'tres@hotmail.com', '987787659', '235465', 'ejemplo', 'www.otro.com');";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
    } 
}
?>