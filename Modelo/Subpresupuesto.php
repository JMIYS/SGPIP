<?php
require_once('Base.php');

class ModeloSubpresupuesto extends ModeloBase
{

    public function ListarTitulos($vars)//listar titulo de la hoja de presupuestos
    {
        $this->consulta = "call sp_listar_titulos_p (".$vars['idsubpresupuesto'].")";
       $this->Consultar(); 
        return $this->Convertir($this->rows,"");  
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
        foreach ($arrayh as $key => $value) {
            if ($arrayh[$key]["pertenece"]==$pertenece) {
               $aux= $arrayh[$key];
               $aux2=$this->Convertir($arrayh,$arrayh[$key]["idtitulo_presupuesto"]) ;
               if (count($aux2)>0) {
                   $aux["hijos"]=$aux2;
               }
                $result[]= $aux;
            }
        }
        return $result;
    }

    public function GuardarHojaPre($vars){
        $prueba = true;
        $subpresupuesto = $vars['idsubpresupuesto'];
        $titulos = $vars["titulos"];
        if (is_array($titulos)) {
            $this->consulta = "call sp_limpiar_hojapresu ($subpresupuesto)";//limpia los titulos sin partidas 
            $this->Ejecutar();

            $arrayaux = array();

            foreach ($titulos as $key => $value) {
                //Si es nuevo ingreso 
                if ($titulos[$key]["idtitulo_presupuesto"] == "0") {
                   
                    if ($titulos[$key]["pertenece"]=="") {
                        $per = "null";
                    }else {
                        
                        $per = $arrayaux[$titulos[$key]["pertenece"]] ;
                        
                    }

                    if ($titulos[$key]["origen"]=="1") {//del tcatalogo
                        
                       $this->consulta = "INSERT INTO ttitulo (descripcion, idcategoria_titulo, idusuario, idorganismo) VALUES ('".$titulos[$key]["descripcion"]."',".$titulos[$key]["idcategoria_titulo"].",".$vars["idusuario"].",".$vars["idorganismo"].")";//limpia los titulos sin partidas 
                       $idt = $this->Agregar();
                       

                    }else {//del ttitulo
                        
                        $idt = $titulos[$key]["idd"];
                    }

                    $this->consulta = "INSERT INTO ttitulo_presupuesto (idsubpresupuesto,idtitulo, descripcion, orden, pertenece, idusuario, idorganismo) VALUES ($subpresupuesto,".$idt.",'".$titulos[$key]["descripcion"]."',".$titulos[$key]["orden"].",".$per.",".$vars["idusuario"].",".$vars["idorganismo"].") ";//limpia los titulos sin partidas 

                    $idaux = $this->Agregar();


                    $arrayaux[$titulos[$key]["idaux"]] = $idaux;
                    
                }else { //cuando se modifica
                    
                    if ($titulos[$key]["pertenece"]=="") {
                        $per = "null";
                    }else {  
                        $per = $arrayaux[$titulos[$key]["pertenece"]] ;
                    }

                    if ((int)$titulos[$key]["partidas"] > 0) {

                        $this->consulta = "call sp_actualizar_titulospresu (".$titulos[$key]["idtitulo_presupuesto"].",".$titulos[$key]["orden"].",".$per.")";
                        $this->Ejecutar();
                        $arrayaux[$titulos[$key]["idaux"]] = $titulos[$key]["idtitulo_presupuesto"];
                       

                    }else {
                        
                        $idt = $titulos[$key]["idd"];
                        $this->consulta = "INSERT INTO ttitulo_presupuesto (idsubpresupuesto,idtitulo, descripcion, orden, pertenece, idusuario, idorganismo) VALUES ($subpresupuesto,".$idt.",'".$titulos[$key]["descripcion"]."',".$titulos[$key]["orden"].",".$per.",".$vars["idusuario"].",".$vars["idorganismo"].") ";//limpia los titulos sin partidas    
                        $idaux = $this->Agregar();
                        $arrayaux[$titulos[$key]["idaux"]]= $idaux;
                        
                    }     

                }
            }

        } 

        return $prueba;
    }



    function __destruct() {  
    unset($this);
	} 
}
?>