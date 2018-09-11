/* Funciones para Agregar al Canvas elementos */

function addSET(set_name)
{
	var temp;
	
	s.g().attr({id: set_name}).attr({fill: 'none', strokeWidth: 2})
	.data('b10',0).data('b23',0).data('b60',0).data('b220',0)
	.data('ac10',0).data('ac23',0).data('ac60',0).data('ac220',0)
	.data('t060010',0).data('t060023',0).data('t060023010',0)	
	.data('t220060',0).data('t220010',0).data('t220023',0)
	.data('t220060010',0).data('t220060023',0)
	.data('i10',0).data('i23',0).data('i60',0).data('i220',0)
	.data('s10',0).data('s23',0).data('s60',0).data('s220',0)
	.data('m10',0).data('m23',0).data('m60',0).data('m220',0)
	.data('a10',0).data('a23',0)
	.data('es10',0).data('es23',0)
	.data('cp10',0).data('cp23',0)
	.data('ax10',0).data('ax23',0)
	.data('rv10',0).data('rv23',0)
	.data('cx10',0).data('cx23',0).data('cx60',0).data('cx220',0);
	
	temp = s.g().attr({id: set_name + '-CNX'});
	s.select('#' + set_name).add(temp);
	
	return true;
}

function addSB(set, nivel, tipo)
{
	var sb_name, num, newpos, temp, niveltxt;
	
	if(!checkRef(set)) return false;
	num = installNewBar(nivel, set);
	if(!num) return false;
	
	sb_name = set + '-' + nivel + '-' + num;

	s.use('SB').attr({id: sb_name, stroke: tipo.stroke_color})
	.data('volt',nivel).data('width',125)
	.data('hv_p_x',0).data('hv_p_y',0);
	
	s.g(s.select('#' + sb_name))
	.attr({id: sb_name + '-GRP'});
	
	newpos = getNewBarCoords(nivel, set);
	move(sb_name, 'hv', newpos.x, newpos.y);
	
	if(num == 1)
	{
		niveltxt = (nivel == 23) ? '22.9' : '10';
		temp = s.text(newpos.x + 5, newpos.y - 5, niveltxt + ' kV').attr({id: sb_name + '-TXT-1', fill: OLD.stroke_color, textAnchor: 'start'});
		s.select('#' + sb_name + '-GRP').add(temp);
	}
	
	temp = s.text(newpos.x + 5, newpos.y + 11, '0').attr({id: sb_name + '-TXT-2', fill: OLD.stroke_color, textAnchor: 'start'})
	.addClass('second');
	s.select('#' + sb_name + '-GRP').add(temp);
	
	s.select('#' + set).add(s.select('#' + sb_name + '-GRP'));
	
	return true;
}

function addDB(set, nivel, tipo)
{
	var db_name, num, newpos;
	
	if(!checkRef(set)) return false;
	num = installNewBar(nivel, set);
	if(!num) return false;
	
	db_name = set + '-' + nivel + '-' + num;

	s.use('DB').attr({id: db_name, stroke: tipo.stroke_color})
	.data('volt',nivel).data('width',125)
	.data('offN',20)
	.data('hv_p_x',0).data('hv_p_y',0);
	
	s.g(s.select('#' + db_name))
	.attr({id: db_name + '-GRP'});
	
	s.select('#' + set).add(s.select('#' + db_name + '-GRP'));
	
	return true;
}

function addT2d(set, numt, t_nivs, poten, tipo, extra)
{
	var t_name, temp;
	
	if(!checkRef(set)) return false;
	t_name = set + '-TR-' + numt;
	if(checkRef(t_name)) return false;
	if(!installNewTrafo(t_nivs, set)) return false;

	s.use('T2d').attr({id: t_name, stroke: tipo.stroke_color})
	.addClass('trafo')
	.data('n',numt)
	.data('hv_p_x',12).data('hv_p_y',0)
	.data('lv_p_x',12).data('lv_p_y',56);
	
	s.g(s.select('#' + t_name))
	.attr({id: t_name + '-GRP'});
	
	if(!checkRef(t_name + '-TXT-1'))
	{
		temp = s.text(OFFSET.tx, OFFSET.ty, 'TR ' + numt).attr({id: t_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt')
				.data('hv_p_x',OFFSET.tx).data('hv_p_y',OFFSET.ty);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(!checkRef(t_name + '-TXT-2'))
	{
		temp = s.text(OFFSET.tx, OFFSET.ty2, poten + ' MVA').attr({id: t_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx).data('hv_p_y',OFFSET.ty2);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(!checkRef(t_name + '-TXT-3'))
	{
		temp = s.text(OFFSET.tx, OFFSET.ty3, POTTRF[t_nivs]).attr({id: t_name + '-TXT-3', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx).data('hv_p_y',OFFSET.ty3);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(extra != undefined)
	{
		if(!checkRef(t_name + '-TXT-4'))
		{
			temp = s.text(OFFSET.tx, OFFSET.ty4, extra).attr({id: t_name + '-TXT-4', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx).data('hv_p_y',OFFSET.ty4);
			
			s.select('#' + t_name + '-GRP').add(temp);
		}
	}

	s.select('#' + set).add(s.select('#' + t_name + '-GRP'));
	
	return true;
}

function addT3d(set, numt, t_nivs, poten, tipo, extra)
{
	var t_name;

	if(!checkRef(set)) return false;
	t_name = set + '-TR-' + numt;
	if(checkRef(t_name)) return false;
	if(!installNewTrafo(t_nivs, set)) return false;

	s.use('T3d').attr({id: t_name, stroke: tipo.stroke_color})
	.addClass('trafo')
	.data('n',numt)
	.data('hv_p_x',12).data('hv_p_y',0)
	.data('lv_p_x',12).data('lv_p_y',56)
	.data('mv_p_x',46).data('mv_p_y',28);
	
	s.g(s.select('#' + t_name))
	.attr({id: t_name + '-GRP'});
	
	if(!checkRef(t_name + '-TXT'))
	{
		temp = s.text(OFFSET.tx3, OFFSET.ty, 'TR ' + numt).attr({id: t_name + '-TXT', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt')
				.data('hv_p_x',OFFSET.tx3).data('hv_p_y',OFFSET.ty);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(!checkRef(t_name + '-TXT-2'))
	{
		temp = s.text(OFFSET.tx3, OFFSET.ty2, poten + ' MVA').attr({id: t_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx3).data('hv_p_y',OFFSET.ty2);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(!checkRef(t_name + '-TXT-3'))
	{
		temp = s.text(OFFSET.tx3, OFFSET.ty3, POTTRF[t_nivs]).attr({id: t_name + '-TXT-3', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx3).data('hv_p_y',OFFSET.ty3);
		s.select('#' + t_name + '-GRP').add(temp);
	}
	
	if(extra != undefined)
	{
		if(!checkRef(t_name + '-TXT-4'))
		{
			temp = s.text(OFFSET.tx3, OFFSET.ty4, extra).attr({id: t_name + '-TXT-4', fill: tipo.stroke_color, textAnchor: 'end'})
				.addClass('txt').addClass('second')
				.data('hv_p_x',OFFSET.tx3).data('hv_p_y',OFFSET.ty4);
			
			s.select('#' + t_name + '-GRP').add(temp);
		}
	}
	
	s.select('#' + set).add(s.select('#' + t_name + '-GRP'));
	
	return true;
}

function addInt(set, nivel, numb, numt, dev, tipo, extra)
{
	var ref, barra, trafo, i_name;

	barra = set + '-' + nivel + '-' + numb;
	if(!checkRef(barra)) return false;
	trafo = set + '-TR-' + numt;
	ref = checkDev(trafo, dev);
	if(!ref) return false;
	if(!installNewInt(nivel, set)) return false;
	i_name = trafo + '-' + dev;
	if(checkRef(i_name)) return false;
	
	s.use('Int').attr({id: i_name, stroke: tipo.stroke_color})
		.data('hv_p_x',4).data('hv_p_y',0)
		.data('lv_p_x',4).data('lv_p_y',40);

	if(nivel != 23)
	{
		setData(trafo,'b_code',dev);
		setData(trafo,'b_niv',nivel);
		setData(trafo,'b_num',numb);
		move(i_name, 'hv', ref.x, ref.y);
		s.select('#' + trafo + '-GRP').add(s.select('#' + i_name));
	}
	else
	{
		$('#' + i_name).addClass('celda');
		addConexion(set, nivel, trafo, dev, i_name, 'lv', tipo)
		s.select('#' + barra + '-GRP').add(s.select('#' + i_name));
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addSec(set, nivel, numb, numt, dev, tipo)
{
	var ref, barra, trafo, s_name;

	barra = set + '-' + nivel + '-' + numb;
	if(!checkRef(barra)) return false;
	trafo = set + '-TR-' + numt;
	ref = checkDev(trafo, dev);
	if(!ref) return false;
	if(!installNewInt(nivel, set)) return false;
	s_name = trafo + '-' + dev;
	if(checkRef(s_name)) return false;
	
	s.use('Sec').attr({id: s_name, stroke: tipo.stroke_color})
	.data('hv_p_x',4).data('hv_p_y',0)
	.data('lv_p_x',4).data('lv_p_y',40);

	if(nivel != 23)
	{
		setData(trafo,'b_code',dev);
		setData(trafo,'b_niv',nivel);
		setData(trafo,'b_num',numb);
		move(s_name, 'hv', ref.x, ref.y);
	}
	else
	{
		ref = checkDev(barra, 'hv');
		ref.x = ref.x + getData(barra,'width') / 2;
		move(s_name, 'lv', ref.x, ref.y);
		addConexion(set, nivel, trafo, dev, s_name, 'hv', tipo)
	}
	
	s.select('#' + trafo + '-GRP').add(s.select('#' + s_name));
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addAlim(a_name, set, nivel, num, tipo, extra)
{
	var ref, barra, elm, txt, txt2, anm, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	if(!installNewAlim(nivel, set)) return false;
	anm = a_name;
	a_name = barra + '-' + a_name;
	if(checkRef(a_name)) return false;
	
	elm = s.use('Alim').attr({id: a_name + '-ELM', stroke: tipo.stroke_color});
	
	txt = s.text(4, OFFSET.txt, anm).attr({id: a_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt);
	
	temp = s.g(elm,txt).attr({id: a_name})
			.data('width',CELDA.width)
			.addClass('celda')
			.data('hv_p_x',4).data('hv_p_y',0);
	
	s.select('#' + barra + '-GRP').add(temp);
	
	if(extra != undefined)
	{
		txt2 = s.text(4, OFFSET.txt2, extra).attr({id: a_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt2);
		
		s.select('#' + a_name).add(txt2);
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addCap(c_name, set, nivel, num, tipo, extra)
{
	var ref, barra, cnm, elm, txt, txt2, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	if(!installNewCap(nivel, set)) return false;
	cnm = c_name;
	c_name = barra + '-' + c_name;
	if(checkRef(c_name)) return false;
	
	elm = s.use('Cap').attr({id: c_name + '-ELM', stroke: tipo.stroke_color})
	txt = s.text(6, OFFSET.txt, cnm).attr({id: c_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',6).data('hv_p_y',OFFSET.txt);
	
	temp = s.g(elm,txt).attr({id: c_name})
			.addClass('celda')
			.data('width',CELDA.width)
			.data('hv_p_x',6).data('hv_p_y',0);
	
	s.select('#' + barra + '-GRP').add(temp);
	
	if(extra != undefined)
	{
		txt2 = s.text(6, OFFSET.txt2, extra).attr({id: c_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',6).data('hv_p_y',OFFSET.txt2);
		
		s.select('#' + c_name).add(txt2);
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addMed(anm, set, nivel, num, tipo, extra)
{
	var ref, barra, numd, elm, txt, txt2, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	if(!installNewMed(nivel, set)) return false;
	a_name = barra + '-' + anm;
	
	elm = s.use('Med').attr({id: a_name + '-ELM', stroke: tipo.stroke_color})
	txt = s.text(10, OFFSET.txt, anm).attr({id: a_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',10).data('hv_p_y', OFFSET.txt);
	
	temp = s.g(elm,txt).attr({id: a_name})
			.addClass('celda')
			.data('width',CELDA.width)
			.data('hv_p_x',10).data('hv_p_y',0);
	
	s.select('#' + barra + '-GRP').add(temp);
	
	if(extra != undefined)
	{
		txt2 = s.text(10, OFFSET.txt2, extra).attr({id: a_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',10).data('hv_p_y',OFFSET.txt2);
		
		s.select('#' + a_name).add(txt2);
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addSSAA(set, nivel, num, tipo, extra)
{
	var ref, barra, numd, elm, txt, txt2, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	numd = installNewSSAA(nivel, set);
	if(!numd) return false;
	a_name = barra + '-SSAA-' + numd;
	
	elm = s.use('SSAA').attr({id: a_name + '-ELM', stroke: tipo.stroke_color});
	
	txt = s.text(10,OFFSET.txt,'SS.AA.').attr({id: a_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',10).data('hv_p_y',OFFSET.txt);
	
	temp = s.g(elm,txt).attr({id: a_name})
			.addClass('celda')
			.data('width',CELDA.width)
			.data('hv_p_x',10).data('hv_p_y',0);
	
	s.select('#' + barra + '-GRP').add(temp);
	
	if(extra != undefined)
	{
		txt2 = s.text(10, OFFSET.txt2, extra).attr({id: a_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',10).data('hv_p_y',OFFSET.txt2);
		
		s.select('#' + a_name).add(txt2);
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addRsv(set, nivel, num, tipo, extra)
{
	var ref, barra, numd, elm, txt, txt2, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	numd = installNewRsv(nivel, set);
	if(!numd) return false;
	a_name = barra + '-RSV-' + numd;
	
	elm = s.use('Rsv').attr({id: a_name + '-ELM', stroke: tipo.stroke_color})
	
	txt = s.text(4, OFFSET.txt, 'Rsv').attr({id: a_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt);
	
	temp = s.g(elm,txt).attr({id: a_name})
		.addClass('celda')
		.data('width',CELDA.width)
		.data('hv_p_x',4).data('hv_p_y',0);
		
	s.select('#' + barra + '-GRP').add(temp);
	
	if(extra != undefined)
	{
		txt2 = s.text(4, OFFSET.txt2, extra).attr({id: a_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt2);
		
		s.select('#' + a_name).add(txt2);
	}
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addEsp(a_name, set, nivel, num, tipo, extra)
{
	var ref, barra, elm, txt, txt2, anm, temp;

	barra = set + '-' + nivel + '-' + num;
	if(!checkRef(barra)) return false;
	if(!installNewEsp(nivel, set)) return false;
	anm = a_name;
	a_name = barra + '-' + a_name;
	if(checkRef(a_name)) return false;
	
	elm = s.use('Esp').attr({id: a_name + '-ELM', stroke: tipo.stroke_color});
	
	txt = s.text(4,OFFSET.txt,anm).attr({id: a_name + '-TXT-1', fill: tipo.stroke_color, textAnchor: 'middle'})
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt);
	
	txt2 = s.text(4,OFFSET.txt2,'F/S').attr({id: a_name + '-TXT-2', fill: tipo.stroke_color, textAnchor: 'middle'})
			.addClass('second')
			.data('hv_p_x',4).data('hv_p_y',OFFSET.txt2);
	
	temp = s.g(elm,txt,txt2).attr({id: a_name})
			.addClass('celda')
			.data('width',CELDA.width)
			.data('hv_p_x',4).data('hv_p_y',0);
	
	s.select('#' + barra + '-GRP').add(temp);
	
	regenBarra(barra);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	return true;
}

function addAcopLong(set, nivel, num1, num2, tipo)
{
	var ref, temp, al_name, barra1, barra2;

	if(num2 < num1)
	{
		temp = num1;
		num1 = num2;
		num2 = temp;
	}
	if(num1 == num2 || (num2 - num1) > 1) return false;
	barra1 = set + '-' + nivel + '-' + num1;
	barra2 = set + '-' + nivel + '-' + num2;
	ref = checkDev(barra1, 'hv');
	if(!ref) return false;
	if(!checkRef(barra2)) return false;
	if(getData(barra1,'volt') != getData(barra2,'volt')) return false;
	
	temp = getData(barra1, 'width');
	if(!installNewAcop(nivel, set)) return false;
	
	al_name = set + '-' + nivel + '-ACOP-' + num1 + '-' + num2;
	s.use('AcopLong').attr({id: al_name, stroke: tipo.stroke_color})
	.data('width',8)
	.data('hv_p_x',0).data('hv_p_y',4)
	.data('lv_p_x',8).data('lv_p_y',4);
	
	move(al_name, 'hv', ref.x + temp, ref.y);
	
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	s.select('#' + set + '-' + nivel + '-' + num2 + '-GRP').add(s.select('#' + al_name));
	
	return true;
}

function addAcopExt(set, nivel, num1, num2, tipo)
{
	var i, al_name, num, temp, temp2, barra1, barra2;

	if(num2 < num1)
	{
		temp = num1;
		num1 = num2;
		num2 = temp;
	}
	barra1 = set + '-' + nivel + '-' + num1;
	barra2 = set + '-' + nivel + '-' + num2;
	if(!checkRef(barra1)) return false;
	if(!checkRef(barra2)) return false;
	
	temp = [barra1,barra2];
	temp2 = {elm0: '', dev0: 'lv', elm1: '', dev1: 'lv'};
	for(i in temp)
	{
		num = installNewAcop(nivel, set);
		if(!num) return false;
		
		al_name = temp[i] + '-ACOP-' + num;
		temp2['elm' + i] = al_name;
		
		s.use('Int').attr({id: al_name, stroke: tipo.stroke_color})
		.addClass('celda')
		.data('hv_p_x',4).data('hv_p_y',0)
		.data('lv_p_x',4).data('lv_p_y',40);
		
		s.select('#' + temp[i] + '-GRP').add(s.select('#' + al_name));
	}
	
	regenBarra(barra1);
	regenBarra(barra2);
	acomodarTrafos(set);
	acomodarBarras(set, nivel);
	refreshConexion(set);
	
	addConexion(set, nivel, temp2.elm0, temp2.dev0, temp2.elm1, temp2.dev1, tipo);
	
	return true;
}