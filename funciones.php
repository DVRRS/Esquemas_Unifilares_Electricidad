<?php

$set_name = Array(
	'Z' => 'Balnearios',
	'B' => 'Barranco',
	'BJ' => 'Bujama',
	'CL' => 'Chilca',
	'CH' => 'Chorrillos',
	'SR' => 'Chosica',
	'G' => 'Gálvez',
	'HP' => 'Huachipa',
	'IG' => 'Los Ingenieros',
	'C' => 'Limatambo',
	'L' => 'Lurin',
	'MO' => 'Monterrico',
	'NA' => 'Ñaña',
	'U' => 'Neyra',
	'PA' => 'Pachacámac',
	'PL' => 'La Planicie',
	'PR' => 'Las Praderas',
	'A' => 'Puente',
	'SL' => 'Salamanca',
	'S' => 'San Bartolo',
	'SI' => 'San Isidro',
	'SJ' => 'San Juan',
	'SU' => 'Surco',
	'VM' => 'Villa Maria',
	'SA' => 'Villa El Salvador',
	'SC' => 'Santa Clara',
	'ST' => 'Santa Anita',
	'SM' => 'San Mateo',
	'CN' => 'San Vicente',
	'CE' => 'Central',
	'MN' => 'Manchay',
	'VE' => 'Vertientes',
	'MG' => 'San Miguel',
	'LS' => 'Los Sauces',
	'LH' => 'Los Heroes',
	'BV' => 'Benavides',
	'S1' => 'Subestacion 1',
	'LU' => 'San Luis',
	'S2' => 'Subestacion 2',
	'AP' => 'Alto Pradera',
	'S3' => 'Subestacion 3',
	'S4' => 'Subestacion 4',
	'S5' => 'Subestacion 5',
	'RP' => 'Ramiro Priale'
);

function getSheets($fileName) {
    try {
		$fileType = PHPExcel_IOFactory::identify($fileName);
        $objReader = PHPExcel_IOFactory::createReader($fileType);
		$objReader->setReadDataOnly(TRUE);
        $objPHPExcel = $objReader->load($fileName);
        $sheets = [];
        foreach ($objPHPExcel->getAllSheets() as $sheet) {
            $sheets[$sheet->getTitle()] = $sheet->toArray();
        }
        return $sheets;
    } catch (Exception $e) {
         die($e->getMessage());
    }
}