<?php
require_once('Base.php');

class ModeloCliente extends ModeloBase
{
    public function Mostrar_clientes($vars)
    {
        //$this->consulta = "SELECT * FROM tcliente WHERE idorganismo=".$vars["idorganismo"]." AND idusuario=".$vars["idusuario"].";";
        $this->consulta = "call spMostrarClientes(".$vars["idorganismo"].",".$vars["idusuario"].");";
        $this->consultar();         
        return $this->rows;       
    }   

    public function InsertarCliente($vars)
    {
        $conf = array(
            'txt_razon_social' => array(
                'tipo' => 'texto',
                'null' => false ),
            'txt_abreviatura' => array(
                'tipo' => 'texto',
                'null' => true ),
            'txt_descripcion' => array(
                'tipo' => 'texto',
                'null' => true ),            
            'cmb_persona' => array(
                'tipo' => 'texto',
                'null' => false ),
            'txt_ruc' => array(
                'tipo' => 'numero',
                'null' => true ),
            'txt_dni' => array(
                'tipo' => 'numero',
                'null' => true ),  
            'txt_correo' => array(
                'tipo' => 'texto',
                'null' => true ),
            'txt_celular' => array(
                'tipo' => 'numero',
                'null' => true ), 
            'txt_fijo' => array(
                'tipo' => 'numero',
                'null' => true ),
            'txt_direccion' => array(
                'tipo' => 'texto',
                'null' => true ),             
            'txt_pagina' => array(
                'tipo' => 'texto',
                'null' => true ),
            'idusuario' => array(
                'tipo' => 'numero',
                'null' => false ),
            'idorganismo' => array(
                'tipo' => 'numero',
                'null' => false ));

        $this->consulta = "call spInsertarCliente(".$this->Tratar($conf, $vars).");";
        return $this->Ejecutar();
       
    }   

    function __destruct() {  
    unset($this);
    } 
}
?>