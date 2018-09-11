<?php

if(!isset($_GET['s'])) $s = 1; else $s = $_GET['s'];
if(!isset($_GET['f'])) $f = ""; else $f = $_GET['f'];

/*****************************************/
/*                 PASO 1                */
/*****************************************/

if($s == 1)
{
	if($f == "")
	{
		foreach (glob("*.xlsx") as $data2up)
		{
			echo '<a href="?s=2&f='.str_replace(array(".xlsx","-"),array("",""),$data2up).'">'.$data2up.'</a><br/>';
		}
	}
	else
	{
		header("Location: ?s=2&f=".$f);
	}
}

/*****************************************/
/*                 PASO 2                */
/*****************************************/

if($s == 2)
{
	require_once('PHPExcel.php');
	require_once('funciones.php');
	
	$data = getSheets($f . '.xlsx');
	$hoy = date('d/m/Y');
	$html = '';
	
	/*$set = "S";
	$elm = $data[$set];*/
	
	foreach($data as $set => $elm)
	{
		$txt = "addSET('" . $set . "');\n";
		for($i = 1; $i <= max(array_keys($elm)); $i++)
		{
			$obj = $elm[$i];
			$nivel = $obj[0]; /* trafo: potencia */
			$tipo = $obj[1];
			$barra = $obj[2]; /* trafo: # */
			$bar2 = $obj[3]; /* Int: #Trafo */
			$name = $obj[4]; /* trafo: Rel Transformación | Int: Devanado  */
			$state = $obj[5];
			$extra = $obj[6];
	
			if(in_array($tipo,Array('SB','DB')))
			{
				$state = ($state == 'NEW') ? $state . $bar2 : $state;
				$txt .= "add" . $tipo . "('" . $set . "','" . $nivel . "'," . $state . ");\n";
			}
			elseif(in_array($tipo,Array('Rsv','SSAA')))
			{
				$state = ($state == 'NEW') ? $state . $extra : $state;
				$txt .= "add" . $tipo . "('" . $set . "','" . $nivel . "','" . $barra . "'," . $state;
				if($bar2 != "")
				{
					$txt .= ",'" . $bar2 . "'";
				}
				$txt .= ");\n";
			}
			elseif(in_array($tipo,Array('Alim','Cap','Med','Esp')))
			{
				$state = ($state == 'NEW') ? $state . $bar2 : $state;
				$txt .= "add" . $tipo . "('" . $name . "','" . $set . "','" . $nivel . "','" . $barra . "'," . $state;
				if($bar2 != "")
				{
					$txt .= ",'" . $bar2 . "'";
				}
				$txt .= ");\n";
			}
			elseif(in_array($tipo,Array('AcopLong','AcopExt')))
			{
				$state = ($state == 'NEW') ? $state . $extra : $state;
				$txt .= "add" . $tipo . "('" . $set . "','" . $nivel . "','" . $barra . "','" . $bar2 . "'," . $state . ");\n";
				if($tipo == 'AcopLong' && $name == "O")
				{
					$txt .= "switchAcopLong('" . $set . "','" . $nivel . "','" . $barra . "','" . $bar2 . "'," . $state . ");\n";
				}
			}
			elseif(in_array($tipo,Array('T2d','T3d')))
			{
				$state = ($state == 'NEW') ? $state . $bar2 : $state;
				$txt .= "add" . $tipo . "('" . $set . "','" . $barra . "','" . $name . "','" . $nivel . "'," . $state;
				if($bar2 != "")
				{
					$txt .= ",'" . $bar2 . "'";
				}
				$txt .= ");\n";
			}
			elseif(in_array($tipo,Array('Sec','Int')))
			{
				$state = ($state == 'NEW') ? $state . $extra : $state;
				$txt .= "add" . $tipo . "('" . $set . "','" . $nivel . "','" . $barra . "','" . $bar2 . "','" . $name . "'," . $state . ");\n";
			}
		}
		$html .= str_replace(Array('[SET]','[SETNAME]','[FECHA]','[CODE2EXEC]'),Array($set,$set_name[$set],$hoy,$txt),file_get_contents('set.html'));
	}
	
	print str_replace(Array('[TITLE]','[CANVAS]'),Array($f,$html),file_get_contents('template.html'));
}
	
/*$objWriter=PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter->save("Plan.xlsx");*/