/* Creación de Elementos base, definición de constantes y arrays iterativos */
			
function initSnap()
{
	OLD = {stroke_color: '#000000'};
	REP = {stroke_color: '#696969'};
	/*NEW = {stroke_color: '#0000FF'};*/
	/*NEW2017 = {stroke_color: '#0000FF'};	
	NEW2018 = {stroke_color: '#B6294D'};
	NEW2019 = {stroke_color: '#80AD39'};
	NEW2020 = {stroke_color: '#CB6F30'};
	NEW2021 = {stroke_color: '#00A5E6'};*/
	NEW2017 = {stroke_color: '#0000FF'};	
	NEW2018 = {stroke_color: '#0000FF'};
	NEW2019 = {stroke_color: '#0000FF'};
	NEW2020 = {stroke_color: '#0000FF'};
	NEW2021 = {stroke_color: '#0000FF'};
	CELDA = {width: 40};
	OFFSET = {
		txt: 42, txt2: 52,
		tx: -5, tx3: -5,
		ty: 20, ty2: 30, ty3: 40, ty4: 50
	};
	POTTRF = {
		'220060010': '220/60/10 kV',
		'220060023': '220/60/22,9 kV',
		'220060': '220/60 kV',
		'220010': '220/10 kV',
		'220023': '220/22,9 kV',
		'060023010': '60/22,9/10 kV',
		'060023': '60/22,9 kV',
		'060010': '60/10 kV'
	};
	
	devs = ['hv', 'mv', 'lv'];
	axes = ['x', 'y'];
	//offset_nivel = {10: 310, 23: 460, 60: 160, 220: 10};
	offset_nivel = {10: 210, 23: 20};
	
	createSB();
	createDB();
	createT2d();
	createT3d();
	createSec();
	createInt();
	createAlim();
	createRsv();
	createEsp();
	createMed();
	createSSAA();
	createCap();
	createAcopLong();
	createAcopLongOpen();
	
	return true;
}