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
        $this->consulta = "INSERT INTO tcliente (razonsocial, abreviatura, descripcion, persona, ruc, dni, correo, celular, telefonofijo, direccion, paginaweb) VALUES ('".$vars["txt_razon_social"]."','".$vars["txt_abreviatura"]."','".$vars["txt_descripcion"]."','".$vars["cmb_persona"]."',".$vars["txt_ruc"].",".$vars["txt_dni"].",'".$vars["txt_correo"]."',".$vars["txt_celular"].",".$vars["txt_fijo"].",'".$vars["txt_direccion"]."','".$vars["txt_pagina"]."');";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
    } 
}
?>