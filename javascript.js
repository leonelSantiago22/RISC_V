
mainPrincipal();

function divisionDelaFrases(CadenadeEntrada)
{
    let [tipodeOperacion, direcciones] = CadenadeEntrada.split(' ');
    console.log(tipodeOperacion);
    console.log(direcciones);
    let direccionesSeparadas = direcciones.split(',');
    console.log(direccionesSeparadas);
    //detectarTipodeOperacpion(tipodeOperacion[0])
}

function detectarTipodeOperacpion( tipodeOperacionentrada)
{
    console.log(tipodeOperacionentrada == 'ld');
}

function mainPrincipal()
{
    const CadenadeEntradamain = 'add x29,x30,x10';
    divisionDelaFrases(CadenadeEntradamain);
}