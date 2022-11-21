
mainPrincipal();

let diccionariodeoperaciones = ['ld', 'add', 'sub', 'sd'];

function divisionDelaFrases(CadenadeEntrada)
{
    let [tipodeOperacion, direcciones] = CadenadeEntrada.split(' ',2);
    return [tipodeOperacion, direcciones];
}

function detectarTipodeOperacpion( tipodeOperacionentrada)
{
    if(tipodeOperacionentrada == 'sub')
    {
        return 1;
    }else if(tipodeOperacionentrada == 'add')
        return 1;
    else if(tipodeOperacionentrada == 'ld')
        return 2;
    else if(tipodeOperacionentrada == 'sd')
        return 3;
}

function mainPrincipal()
{
   
    const CadenadeEntradamain = "sub x23,x24,x25";
    let [tipodeOperacion, direcciones] = divisionDelaFrases(CadenadeEntradamain);
    console.log(CadenadeEntradamain);
    console.log(tipodeOperacion);
    let direccionesporseparadoRecibidas = quitarlasX(direcciones);
    let rs1 = convertToBinary(direccionesporseparadoRecibidas[0])
    let rs2 = convertToBinary(direccionesporseparadoRecibidas[1]);
    let rd = convertToBinary(direccionesporseparadoRecibidas[2]);
    let opcode = asignarOpcode(tipodeOperacion);
    let func7 = asignarfunc7(tipodeOperacion);
    let func3 =asignarfunc3(tipodeOperacion);

    const risc_v_binario = func7 + rs2 + rs1 + func3 + rd + opcode;
    console.log(risc_v_binario);
    let risc_v_hexadecimal = convertidorHexadecimal(risc_v_binario);
    console.log('0x',risc_v_hexadecimal);
    
}
 

function convertidorHexadecimal(valorDeEntrada)
{
    return Number(parseInt(valorDeEntrada,2)).toString(16);
}

function quitarlasX(direccionesRecibidas)
{
    let auxDirecciones = direccionesRecibidas.split('x');
    console.log(auxDirecciones);
    let direccionessinX = auxDirecciones.join('');
    let direccionesporSeparado = direccionessinX.split(',',3); //solo se pueden maximo 3 registros
    console.log(direccionessinX);
    console.log(direccionesporSeparado);
    return direccionesporSeparado;
}

function asignarOpcode (tipodeoperacionRecibida)
{
    let opcode;
    if(tipodeoperacionRecibida == 'sub')
        opcode = '0110011';
    else if(tipodeoperacionRecibida == 'add')
        opcode = '0110011';
    
    return opcode;
}
function asignarfunc3(tipodeOperacionentrada)
{
    let func3;
    if(tipodeOperacionentrada == 'sub')
        func3 = '000';
    else if(tipodeOperacionentrada == 'add')
       func3 = '000';
    return func3;
}

function asignarfunc7(tipodeoperacionRecibida)
{
    let func7;

    if(tipodeoperacionRecibida == 'add')
        func7 = '0000000';
    else if(tipodeoperacionRecibida == 'sub')
        func7 = '0100000';
    

    return func7;
}

function convertToBinary(x) 
{
    let bin = 0;
    let rem, i = 1;
    if(x>31)
    {
        return 'xxxxx';
    }
    while (x != 0) {
        rem = x % 2;
        
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    let binario = String(bin).padStart(5, '0');
    return binario;
}

function obtenerCodigo()
{
    let codigoRecibido = " ";
    codigoRecibido = document.getElementById('codigoensamblador').value;
    mainPrincipal(codigoRecibido);
}