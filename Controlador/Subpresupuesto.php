<?php

require_once('Base.php');

class ControladorSubpresupuesto extends ControladorBase
{
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }
        
    protected function Principal()//La accion por defecto para inicio (si no se envian parametros)
    {
        $this->ComprobarLogin();
       
        if ($this->ID != 0) {

            $arraySub = array('idsubpresupuesto' => $this->ID, 
                            'idorganismo'=>$this->Login->GetOrganismo(),
                            'idusuario'=>$this->Login->GetCodigo()); 

            require_once('Modelo/Subpresupuesto.php');
             $Vali_sub = new ModeloSubpresupuesto();
             $Aux = $Vali_sub->ValidarSubpres($arraySub);
             if (count($Aux) > 0) { 

                  $diccionario_subrpesupuesto = array('{elementoSubpresupuesto}'=>$Aux[0]['descripcion'], '{idsubpresupuesto}'=>$Aux[0]['idsubpresupuesto'] ); 
                 $this->Contenido = str_replace(array_keys($diccionario_subrpesupuesto), array_values($diccionario_subrpesupuesto), file_get_contents("Vista/Contenido/Subpresupuesto/Subpresupuesto.html")); 

             }else{
                $this->Contenido = file_get_contents("Vista/Contenido/Subpresupuesto/Acceso.html"); 
             }
           

        }else{
            $this->Contenido = file_get_contents("Vista/Contenido/Subpresupuesto/Error.html"); 
        }
        
        $this->Header = $this->CargarHeader(file_get_contents("Vista/Secciones/Header.html"));
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  


         $jss = array('jquery.dataTables.min', 'dataTables.responsive.min', 'Subpresupuesto_hoja','toastr','jquery.nestable');
        $csss = array('jquery.dataTables.min', 'dataTables.responsive', 'Nuevo_Tabla', 'Elementos','subpresup','toastr','custom_nestable');

        

        $pagina = $this->MostarElementos($jss, $csss ); 
        print $pagina;
    }
}
?>
