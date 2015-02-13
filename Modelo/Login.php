<?php
require_once('Base.php');

class ModeloLogin extends ModeloBase
{
	function __construct() 
	{
		@session_start();
	}	

	public function ValidarLogin($user='', $pass='')
	{
		$this->consulta="SELECT * FROM tusuario WHERE usuario='$user' AND password='$pass' ";	 	

	 	if ($this->Consultar()) 
		{
			if(count($this->rows)>0)
			{
				$_SESSION['xafrhyjo']=array('usuario'=>$this->rows[0]['usuario'],
									   'codigo'=>$this->rows[0]['idusuario'],
									   'organismo'=>$this->rows[0]['idorganismo']);
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	public function EstadoLogin()
	{
		if(!isset($_SESSION['xafrhyjo'])) return false;
        if(!is_array($_SESSION['xafrhyjo'])) return false;
        if(empty($_SESSION['xafrhyjo']['usuario'])) return false;
        return true;
	}

	public function ListarPrivilegios()
	{
	 	$this->consulta="Call spListar_Privilegios(".$_SESSION['xafrhyjo']['organismo'].")";	
	 	$this->Consultar();
	 	return $this->rows;
	}

	public function GetNombre()
	{
	 	return $_SESSION['xafrhyjo']['usuario'];
	}

	public function GetOrganismo()
	{
	 	return $_SESSION['xafrhyjo']['organismo'];
	}

	public function GetCodigo()
	{
	 	return $_SESSION['xafrhyjo']['codigo'];
	}

	public function Salir()
	{
		unset($_SESSION['xafrhyjo']);
        session_write_close();
	}

	function __destruct() { 
        unset($this); 
    } 
}

?>