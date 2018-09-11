/* Función para Crear elementos base */

function createSB()
{
	var sb_b, sb;

	sb_b = s.line(0,0,125,0).attr({strokeWidth: 4});
	
	sb = s.g(sb_b)
		.attr({id: 'SB'});
	
	sb.toDefs();
}
		
function createDB()
{
	var db_b, db_n, db;

	db_b = s.line(0,0,125,0).attr({strokeWidth: 4});
	db_n = s.line(0,20,125,20).attr({strokeWidth: 4});
	
	db = s.g(db_n, db_b)
		.attr({id: 'DB'});
		
	db.toDefs();
}
		
function createT2d()
{
	var t_lv_c_c, t_lv_c, t_hv_c_c, t_hv_c, t_2d;

	t_hv_c = s.circle(12,20,12);
	t_hv_c_c = s.path('M 12,0 l 0,8');
	t_lv_c = s.circle(12,36,12);
	t_lv_c_c = s.path('M 12,48 l 0,8');
	
	t_2d = s.g(t_lv_c_c, t_lv_c, t_hv_c_c, t_hv_c)
		.attr({id: 'T2d'});
			
	t_2d.toDefs();
	
	return true;
}
		
function createT3d()
{
	var t_lv_c_c, t_lv_c, t_mv_c_c, t_mv_c, t_hv_c_c, t_hv_c, t_3d;

	t_hv_c = s.circle(12,20,12);
	t_hv_c_c = s.path('M 12,0 l 0,8');
	t_lv_c = s.circle(12,36,12);
	t_lv_c_c = s.path('M 12,48 l 0,8');
	t_mv_c = s.circle(26,28,12);
	t_mv_c_c = s.path('M 38,28 l 8,0');
	
	t_3d = s.g(t_lv_c_c, t_lv_c, t_mv_c_c, t_mv_c, t_hv_c_c, t_hv_c)
			.attr({id: 'T3d'});
			
	t_3d.toDefs();
			
	return true;
}
			
function createSec()
{
	var sec_e, sec_s, sec_c, sec;

	sec_c = s.circle(4,20,4);
	sec_s = s.path('M 4,0 l 0,16');
	sec_e = s.path('M 4,24 l 0,16');
	
	sec = s.g(sec_e, sec_s, sec_c)
			.attr({id: 'Sec'});
			
	sec.toDefs();
}
		
function createInt()
{
	var int_e, int_s, int_c, inte;
		
	int_c = s.rect(0,16,8,8);
	int_s = s.path('M 4,0 l 0,16');
	int_e = s.path('M 4,24 l 0,16');
			
	inte = s.g(int_e, int_s, int_c)
			.attr({id: 'Int'});
			
	inte.toDefs();
}
		
function createAlim()
{
	var alim_s, alim_c, alim;

	alim_c = s.path('M 2,24 l 4,0 l -2,3 Z').attr({fill: '#000000'});
	alim_s = s.path('M 4,0 l 0,24');
	
	alim = s.g(alim_s, alim_c)
			.attr({id: 'Alim'});
			
	alim.toDefs();
}

function createRsv()
{
	var alim_s, alim_c, alim;

	alim_c = s.path('M 2,24 l 4,0');
	alim_s = s.path('M 4,0 l 0,24');
	
	alim = s.g(alim_s, alim_c)
			.attr({id: 'Rsv'});
			
	alim.toDefs();
}

function createEsp()
{
	var alim_s, alim_c, alim;

	alim_c = s.path('M 2,24 l 4,0');
	alim_s = s.path('M 4,0 l 0,2 M 4,4 l 0,2 M 4,8 l 0,2 M 4,12 l 0,2 M 4,16 l 0,2 M 4,20 l 0,2');
	
	alim = s.g(alim_s, alim_c)
			.attr({id: 'Esp'});
			
	alim.toDefs();
}

function createCap()
{
	var cap_l, cap_m, cap_a, cap_b, cap;

	cap_a = s.path('M 0,16 l 12,0');
	cap_b = s.path('M 0,20 l 12,0');
	cap_l = s.path('M 6,0 l 0,16');
	cap_m = s.path('M 6,20 l 0,8');
	
	cap = s.g(cap_b, cap_a, cap_l, cap_m)
			.attr({id: 'Cap'});
			
	cap.toDefs();
}

function createMed()
{
	var med_c_a, med_c_b, med_c_c, med_a, med;

	med_c_a = s.circle(10,15,5);
	med_c_b = s.circle(6,20,5);
	med_c_c = s.circle(14,20,5);
	med_a = s.path('M 10,0 l 0,10');	
	
	med = s.g(med_a, med_c_c, med_c_b, med_c_a)
			.attr({id: 'Med'});
			
	med.toDefs();
}

function createSSAA()
{
	var med_c_a, med_c_b, med_a, med;

	med_c_a = s.circle(10,15,6);
	med_c_b = s.circle(10,21,6);
	med_a = s.path('M 10,0 l 0,9');
	
	med = s.g(med_a, med_c_b, med_c_a)
			.attr({id: 'SSAA'});
			
	med.toDefs();
}
		
function createAcopLong()
{
	var al_c, al;

	al_c = s.rect(0,0,8,8);
			
	al = s.g(al_c)
		.attr({id: 'AcopLong'});
			
	al.toDefs();
}
		
function createAcopLongOpen()
{
	var al_c, al_l, al;
		
	al_c = s.rect(0,0,8,8);
	al_l = s.line(4,-4,4,12);
				
	al = s.g(al_c, al_l)
		.attr({id: 'AcopLongOpen'});
					
	al.toDefs();
}