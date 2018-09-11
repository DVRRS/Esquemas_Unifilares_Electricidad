/* Funciones comunes para manipulación y checkeo */

function regenBarra(barra)
{
	var i, m, txt, ref, ancho, hijos, temp, ids, id_int, paso, cldancho, temp, numalim;

	ref = checkDev(barra, 'hv');
	if(!ref) return false;
	ancho = getData(barra, 'width');
				
	hijos = s.select('#' + barra + '-GRP').children();
	numalim = 0;
	id_int = 0;
	ids = [];
	for(i in hijos)
	{
		if(s.select('#' + hijos[i].node.id).attr('class') == 'celda')
		{
			ids.push(i);
			if($('#' + hijos[i].node.id + '-ELM').attr('href') == '#Alim') numalim = numalim + 1;
		}
	}
	$('#' + barra + '-TXT-2').html(numalim);
	if(ids.length > 0)
	{
		cldancho = CELDA.width;
		paso = ancho / (ids.length + 1);
		if(paso < cldancho)
		{
			paso = cldancho;
			temp = paso * (ids.length + 1);
			//s.circle(temp + ref.x,ref.y,2).attr({fill: '#FF0000'});
			setData(barra,'width',temp);
			temp = temp / ancho;
			m = new Snap.Matrix().scale(temp, 1, 0, 0).toTransformString();
			txt = s.select('#' + barra).transform().localMatrix.toTransformString() + m;
			s.select('#' + barra).transform(txt);
		}
		for(i = 0; i < ids.length; i++)
		{
			moveAlone(hijos[ids[i]].node.id, 'hv', ref.x + (i + 1) * paso, ref.y, false, false);
		}					
	}
	
	//console.log('Barras regeneradas con éxito');				
}
			
function acomodarBarras(set, nivel)
{
	var i, ref, nbars;
	
	nbars = getData(set, 'b' + nivel);
	for(i = 1; i <= nbars; i++)
	{
		ref = getNewBarCoords(nivel, set, i);
		move(set + '-' + nivel + '-' + i, 'hv', ref.x, ref.y);
	}
	
	//console.log('Barras reacomodadas con éxito');				
}
				
function getNewBarCoords(nivel, set, para)
{
	var nx, ny, ancho, ancho2, nbars, cadena, temp, tname;
	
	ancho = s.select('#AcopLong').getBBox().width; // ancho de un acoplamiento longitudinal
	cadena = set + '-' + nivel + '-';
	if(para == undefined)
	{
		nbars = getData(set, 'b' + nivel) - 1;
		if(nbars > 0)
		{
			temp = nbars - 1;
			tname = cadena + 'ACOP-' + temp + '-' + nbars;
			ancho2 = (checkRef(tname)) ? getData(tname, 'width') : (ancho * 3);
			nx = getData(cadena + nbars, 'hv_p_x') + getData(cadena + nbars, 'width') + ancho2;
			ny = getData(cadena + nbars, 'hv_p_y');
		}
		else
		{
			nx = 8;
			ny = offset_nivel[nivel];
		}
	}
	else
	{
		if(para > 1)
		{
			temp = para - 1;
			tname = cadena + 'ACOP-' + temp + '-' + para;
			ancho2 = (checkRef(tname)) ? getData(tname, 'width') : (ancho * 3);
			para = para - 1;
			nx = getData(cadena + para, 'hv_p_x') + getData(cadena + para, 'width') + ancho2;
			ny = getData(cadena + para, 'hv_p_y');
		}
		else
		{
			nx = getData(cadena + para, 'hv_p_x');
			ny = getData(cadena + para, 'hv_p_y');
		}
	}
				
	return {x: nx, y: ny};
}
			
function acomodarTrafos(set)
{
	var nivel, dev, num, barra, trafo, ancho, ref, ntr, ancho_base, ntr_prev;
	
	ancho_base = s.select('#SB').getBBox().width; // ancho de una barra simple
	ntr_prev = 0;
	$('#' + set + ' use.trafo').each(function() {
		trafo = $(this).attr('id');
		ntr = getData(trafo, 'n');
		dev = getData(trafo, 'b_code');
		nivel = getData(trafo, 'b_niv');
		num = getData(trafo, 'b_num');
		barra = set + '-' + nivel + '-' + num;
		
		ref = checkDev(barra, 'hv');
		if(!ref)
		{
			ancho = ancho_base;
			if(ntr_prev > 0)
			{
				ref = checkDev(set + '-TR-' + ntr_prev, 'hv');
			}
			else
			{
				ref = {x: -ancho * 0.5,y: (offset_nivel[10] - s.select('#T2d').getBBox().height - s.select('#Int').getBBox().height)};
			}
			moveAlone(trafo, 'hv', ref.x + ancho * 1.5, ref.y, true, false, '#Int');
		}
		else
		{
			ancho = ref.x  + getData(barra, 'width') / 2;
			if(ntr_prev > 0 && ancho < (getData(set + '-TR-' + ntr_prev, 'hv_p_x') + ancho_base * 1.5))
			{
				ancho = (getData(set + '-TR-' + ntr_prev, 'hv_p_x') + ancho_base * 1.5);
				moveAlone(trafo + '-' + dev, dev, ancho, ref.y, true, false);
				move(barra, 'hv', ancho - getData(barra, 'width') / 2, ref.y);
			}
			else
			{
				moveAlone(trafo + '-' + dev, dev, ancho, ref.y, true, false);
			}
		}
		
		ntr_prev = ntr;
	});
}
			
function move(cual, dev, x, y)
{
	var i, ref, diff;

	ref = checkDev(cual, dev);
	if(!ref) return false;
	diff = {x: x - ref.x, y: y - ref.y};
	//s.circle(x,y,2).attr({fill: '#FF0000'});
	
	updatexy(cual, diff, true, true);	//ver arriba y mover hemanosm, tambien ver abajo y mover hijos
	
	return true;
}
			
function moveAlone(cual, dev, x, y, aloneup, alonedown, href)
{
	var ref, diff, hijos;

	ref = checkDev(cual, dev);
	if(!ref) return false;
	diff = {x: x - ref.x, y: y - ref.y};
	
	aloneup = (aloneup == undefined || aloneup == false) ? false : true;		//ver arriba y mover hermanos
	alonedown = (alonedown == undefined || alonedown == false) ? false : true;	//ver abajo y mover hijos

	updatexy(cual, diff, aloneup, alonedown, href);
				
	return true;
}
			
function updatexy(cual, diff, aloneup, alonedown, href)
{
	var i, j, txt, hijos;
	
	aloneup = (aloneup == undefined || aloneup == false) ? false : true;		//ver arriba y mover hermanos
	alonedown = (alonedown == undefined || alonedown == false) ? false : true;	//ver abajo y mover hijos
	
	if(s.select('#' + cual).parent().type == 'g' && aloneup)
	{
		hijos = s.select('#' + cual).parent().children();
		for(i in hijos)
		{
			if(href == undefined)
			{
				updatexy(hijos[i].node.id, diff, false, false);	//solo un nivel arriba, una iteración
			}
			else
			{
				if(hijos[i].attr('href') != href)
				{
					updatexy(hijos[i].node.id, diff, false, false);	//solo un nivel arriba, una iteración
				}
			}
		}
	}
	else if(s.select('#' + cual).type == 'g' && alonedown)
	{
		hijos = s.select('#' + cual).children();
		for(i in hijos)
		{
			updatexy(hijos[i].node.id, diff, false, true);	//todos los niveles abajo, multi iteración
		}
	}
	else
	{
		for(i in devs)
		{
			for(j in axes)
			{
				temp = getData(cual, devs[i] + '_p_' + axes[j]);
				if(temp >= 0)
				{
					setData(cual, devs[i] + '_p_' + axes[j], temp + diff[axes[j]]);
				}
			}
		}
		txt = 't ' + diff.x + ',' + diff.y + ' ' + s.select('#' + cual).transform().localMatrix.toTransformString();
		s.select('#' + cual).transform(txt);
	}
				
	return true;
}

function addConexion(set, nivel, elm0, dev0, elm1, dev1, tipo)
{
	var id, temp, alto, alto2, num, ind, temp, temp2, temp3;
	
	if(isNaN(tipo)) num = installNewCnx(nivel, set);
	else num = tipo;
	if(!num) return false;
	id = set + '-' + nivel + '-CNX-' + num;
	
	alto = Math.abs(getData(elm0,'hv_p_y') - getData(elm0,'lv_p_y'));
	alto2 = Math.abs(getData(elm1,'hv_p_y') - getData(elm1,'lv_p_y'));
	alto = Math.max(alto, alto2) * 0.5;
	
	if(dev0 == 'mv' || dev1 == 'mv')
	{
		if(dev0 == 'mv')
		{
			txt = 'M ' + getData(elm0,dev0 + '_p_x') + ',' + getData(elm0,dev0 + '_p_y')
					+ ' l ' + alto + ',0'
					+ ' l 0,' + (getData(elm1,dev1 + '_p_y') - getData(elm0,dev0 + '_p_y') + alto)
					+ ' l ' + (getData(elm1,dev1 + '_p_x') - getData(elm0,dev0 + '_p_x') - alto) + ',0'
					+ ' l 0,-' + alto;
		}
		else
		{
			txt = 'M ' + getData(elm1,dev1 + '_p_x') + ',' + getData(elm1,dev1 + '_p_y')
					+ ' l ' + alto + ',0'
					+ ' l 0,' + (getData(elm0,dev0 + '_p_y') - getData(elm1,dev1 + '_p_y') - alto)
					+ ' l ' + (getData(elm0,dev0 + '_p_x') - getData(elm1,dev1 + '_p_x') - alto) + ',0'
					+ ' l 0,' + alto;
		}
	}
	else
	{
		if($('#' + elm0).attr('class') == 'trafo')
		{
			temp = -77;
			temp2 = -80;
			temp3 = 0.5;
			txt = 'M ' + getData(elm0,dev0 + '_p_x') + ',' + getData(elm0,dev0 + '_p_y')
				+ ' l 0,' + temp3 * alto
				+ ' l ' + temp + ',0'
				+ ' l 0,' + temp2
				+ ' l ' + (getData(elm1,dev1 + '_p_x') - getData(elm0,dev0 + '_p_x') - temp) + ',0'
				+ ' l 0,' + (getData(elm1,dev1 + '_p_y') - getData(elm0,dev0 + '_p_y') - temp3 * alto - temp2);
		}
		else
		{
			txt = 'M ' + getData(elm0,dev0 + '_p_x') + ',' + getData(elm0,dev0 + '_p_y')
				+ ' l 0,' + alto
				+ ' l ' + (getData(elm1,dev1 + '_p_x') - getData(elm0,dev0 + '_p_x')) + ',0'
				+ ' l 0,' + (getData(elm1,dev1 + '_p_y') - getData(elm0,dev0 + '_p_y') - alto);
		}
	}
	
	if(!checkRef(id))
	{
		temp = s.path(txt).attr({id: id, stroke: tipo.stroke_color})
		.addClass('conex')
		.data('nivel',nivel).data('num',num)
		.data('elm0',elm0).data('dev0',dev0)
		.data('elm1',elm1).data('dev1',dev1);
		
		s.select('#' + set + '-CNX').add(temp);
	}
	else
	{
		s.select('#' + id).attr({d: txt});
	}
	
	return true;
}

function refreshConexion(set)
{
	var id, nivel, num, elm0, elm1, dev0, dev1;
	
	$('#' + set + ' path.conex').each(function() {
		id = $(this).attr('id');
		nivel = getData(id, 'nivel');
		num = getData(id, 'num');
		elm0 = getData(id, 'elm0');
		elm1 = getData(id, 'elm1');
		dev0 = getData(id, 'dev0');
		dev1 = getData(id, 'dev1');
		
		addConexion(set, nivel, elm0, dev0, elm1, dev1, num);
	});
	
	return true;
}
			
function checkDev(cual, dev)
{
	var ref;

	if(checkRef(cual))
	{
		ref = {x: s.select('#' + cual).data(dev + '_p_x'), y: s.select('#' + cual).data(dev + '_p_y')};
		if(ref.x == undefined || ref.y == undefined)
		{
			//console.log('El devanado \'' + dev + '\' no existe en el elemento \'' + cual + '\'.');
			ref = false;
		}
	}
			
	return ref;
}
			
function getData(cual, valor)
{
	var ref;

	ref = s.select('#' + cual).data(valor);
	if(ref == undefined)
	{
		//console.log('El dato \'' + valor + '\' no existe en el elemento \'' + cual + '\'.');
		ref = -1;
	}
			
	return ref;
}
			
function setData(cual, valor, nuevo)
{
	var ref;

	ref = s.select('#' + cual).data(valor);
	if(ref == undefined)
	{
		//console.log('El dato \'' + valor + '\' no existe en el elemento \'' + cual + '\'.');
	}
	s.select('#' + cual).data(valor, nuevo);
	ref = nuevo;
				
	return ref;
}
			
function checkRef(cual)
{
	var ref;
			
	ref = false;
	if(s.select('#' + cual))
	{
		ref = true;
	}
	else
	{
		//console.log('El elemento \'' + cual + '\' no existe.');
	}
		
	return ref;
}

function installNewBar(nivel, set)
{
	return installNewElement(nivel, set, 'b');
}

function installNewTrafo(nivs, set)
{
	return installNewElement(nivs, set, 't');
}
			
function installNewInt(nivel, set)
{
	return installNewElement(nivel, set, 'i');
}

function installNewSec(nivel, set)
{
	return installNewElement(nivel, set, 's');
}

function installNewCap(nivel, set)
{
	return installNewElement(nivel, set, 'cp');
}

function installNewAcop(nivel, set)
{
	return installNewElement(nivel, set, 'ac');
}

function installNewAlim(nivel, set)
{
	return installNewElement(nivel, set, 'a');
}

function installNewMed(nivel, set)
{
	return installNewElement(nivel, set, 'm');
}

function installNewSSAA(nivel, set)
{
	return installNewElement(nivel, set, 'ax');
}

function installNewRsv(nivel, set)
{
	return installNewElement(nivel, set, 'rv');
}

function installNewEsp(nivel, set)
{
	return installNewElement(nivel, set, 'es');
}

function installNewCnx(nivel, set)
{
	return installNewElement(nivel, set, 'cx');
}
			
function installNewElement(nivel, set, letra)
{
	var prev;
	
	prev = getData(set, letra + nivel);
	return setData(set, letra + nivel, prev + 1);
}
			
function switchAcopLong(set, nivel, num1, num2, tipo)
{
	var ref, lado, temp;

	if(num2 < num1)
	{
		temp = num1;
		num1 = num2;
		num2 = temp;
	}
	if(num1 == num2 || (num2 - num1) > 1) return false;				
	al_name = set + '-' + nivel + '-ACOP-' + num1 + '-' + num2;
	if(!checkRef(al_name)) return false;
	
	if(s.select('#' + al_name).attr('href') == '#AcopLong')
	{
		temp = '#AcopLongOpen';
	}
	else
	{
		temp = '#AcopLong';
	}
	
	s.select('#' + al_name).attr({stroke: tipo.stroke_color, href: temp})

	return true;
}