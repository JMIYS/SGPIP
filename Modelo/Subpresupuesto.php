<?php
require_once('Base.php');

class ModeloSubpresupuesto extends ModeloBase
{

    public function ListarTitulos($vars)//listar titulo de la hoja de presupuestos
    {
        $this->consulta = "call sp_listar_titulo_p (".$vars['idsubpresupuesto'].")";
       $this->Consultar();  
        return $this->rows;  
    }   

    public function ListarTituloCategoria($vars)//lista los titluos segun la categoria
    {
        $this->consulta = "call sp_listar_cat (".$vars['idcategoria'].")";
        $this->Consultar();  
        return $this->rows;       
    }

    public function FiltrarTitulo($vars)
    {
        $this->consulta = "call sp_filtrar_titulo (".$vars['descripcion'].")";
        $this->Consultar();  
        return $this->rows;         
    }  

    public function AgregarTitulo($vars)
    {
        $this->consulta = "call sp_agregar_titulo (".$vars['descripcion'].",".$vars['idcategoria'].")";
        $this->Consultar();  
        return $this->rows;         
    }     

    public function ActualizarTitulo($vars)
    {
        $this->consulta = "call sp_actualizar_titulo (".$vars['idcatalogo'].",".$vars['descripcion'].")";
        $this->Consultar();  
        return $this->rows;          
    } 

    public function EliminarTitulo($vars)
    {
        $this->consulta = "call sp_eliminar_titulo (".$vars['idcatalogo'].")";
        $this->Consultar();  
        return $this->rows;          
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

    function __destruct() {  
    unset($this);
	} 
}
?>