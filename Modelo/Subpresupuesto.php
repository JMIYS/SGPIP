<?php
require_once('Base.php');

class ModeloSubpresupuesto extends ModeloBase
{

    public function ListarTitulos($vars)//listar titulo de la hoja de presupuestos
    {
        $this->consulta = "call sp_listar_titulos_p (".$vars['idsubpresupuesto'].")";
       $this->Consultar(); 

        return $this->Convertir($this->rows,3);  
    }   

    public function ListarTituloCategoria($vars)//lista los titluos segun la categoria
    {
        $this->consulta = "call sp_listar_cat (".$vars['idcategoria'].")";
        $this->Consultar();  
        return $this->rows;       
    }

    public function AgregarTitulo($vars)
    {
        $this->consulta = "call sp_agregar_ttitulo ('".$vars['descripcion']."',".$vars['idcategoria_titulo'].",".$vars['idusuario'].",".$vars['idorganismo'].")";
        return $this->Ejecutar();         
    }     

    public function ActualizarTitulo($vars)
    {
        $this->consulta = "call sp_actualizar_titulo (".$vars['idtitulo'].",'".$vars['descripcion']."',".$vars['idcategoriaTitulo'].",".$vars['idusuario'].",".$vars['idorganismo'].")";
        return $this->Ejecutar();         
    } 

    public function EliminarTitulo($vars)
    {
        $this->consulta = "call sp_eliminar_titulo (".$vars['idtitulo'].")";
        return $this->Ejecutar();         
    } 

    public function ListarCategorias()//lista las 7 catehorias
    {
        $this->consulta = "call sp_listar_titulo_categoria ()";
        $this->Consultar();  
        return $this->rows;      
    } 


    public function ListarCatalogo()//lista todos los titulos para el catalogo
    {
        $this->consulta = "call sp_listar_catalogo ()";
        $this->Consultar();  
        return $this->rows;      
    }

    public function ObtenerDatos($vars)
    {

       $this->consulta = "SELECT * FROM tcatalogo_titulo where idcatalogo_titulo = ".$vars['idcategoria'].";";
       $this->Consultar();  
        return $this->rows;
    }

    public function ValidarSubpres($vars)
    {

       $this->consulta = "call spValidar_Subpresu (".$vars['idsubpresupuesto'].",'".$vars['idusuario']."',".$vars['idorganismo'].")";
       $this->Consultar();  
        return $this->rows;
    } 

    private function Convertir($arrayh  = array(), $pertenece){
        
        $result = array();
        print_r($arrayh);
        for ($i=0; $i < count($arrayh); $i++) { 
            if ($arrayh[$i]["pertenece"]==$pertenece) {
                $result[]= $this->Convertir($arrayh[$i],$arrayh[$i]["idtitulo_presupuesto"]) ;
            }
        }
        return $result;
    }

    function __destruct() {  
    unset($this);
	} 
}
?>