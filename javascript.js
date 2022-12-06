const etiquetaArreglo = [];
let contador = 0;
//let diccionariodeoperaciones = ['ld', 'add', 'sub', 'sd'];
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
        return 2;
    else if (tipodeOperacionentrada == 'jal')
        return 3;
    else if (tipodeOperacionentrada == 'jalr')
        return 2;
    else if (tipodeOperacionentrada == 'bne')
        return 5;
    else if (tipodeOperacionentrada == 'beq')
        return 5;
    return -1;
}
function probarRegex(CadenadeEntradamain)
{
    var regEx =     /(add|sd|ld|sub|jalr|bne|beq) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,[a-z]*)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\$)/.test(CadenadeEntradamain);
    console.log(regEx);
    return regEx;
}

function probarRegex2(CadenadeEntradamain)
{   
    let etiqueta, operacion, direcciones;
    let regEx;
    if((/([a-z]*): (add|sd|ld|sub|jalr|bne|beq|jal) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,sum)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\n)/.test(CadenadeEntradamain)) == true)
     {
        regEx = true;
        [etiqueta, operacion, direcciones] = CadenadeEntradamain.split(' ');
        console.log(etiqueta);
    }else if ((/(add|sd|ld|sub|jalr|bne|beq) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,[a-z]*)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\$)/.test(CadenadeEntradamain)) == true)
     {
        regEx = true;
        [operacion, direcciones] = divisionDelaFrases(CadenadeEntradamain);
    }else{
        [operacion, direcciones] = divisionDelaFrases(CadenadeEntradamain);
        regEx = false;
    }
    console.log(regEx);
    console.log(operacion);
    console.log(direcciones);
    return [regEx, operacion, direcciones]
}

function mainPrincipal(CadenadeEntradamain)
{
    let [regEx,tipodeOperacion, direcciones] =probarRegex2(CadenadeEntradamain);
    let tipodeOperacionGlobal = 0;
    console.log(regEx, tipodeOperacion, direcciones);
    tipodeOperacionGlobal = detectarTipodeOperacpion(tipodeOperacion);
    console.log(tipodeOperacionGlobal);
    if(regEx == true){ //probamos si la linea de codigo es o no verdadera
    console.log(etiquetaArreglo);
    console.log(tipodeOperacionGlobal);
    console.log(CadenadeEntradamain);
    console.log(tipodeOperacion);
    let direccionesporseparadoRecibidas, aux1,aux2;
    if (tipodeOperacionGlobal==2)
    {
        [direccionesporseparadoRecibidas, aux1, aux2] = quitarlasXparaoperacionestipo2(direcciones)
        console.log(direccionesporseparadoRecibidas,aux1,aux2);
        let rs1 = convertToBinary(aux2);
        let rd = convertToBinary(direccionesporseparadoRecibidas);
        if(tipodeOperacion == 'ld')
        {
            let opcode = '0000011';
            let func3 = '011';
            let func12 = convertToBinary(aux1);
            let binario = String(func12).padStart(12 , '0');
            console.log(binario);
            const risc_v_binario = binario + rs1 + func3 + rd + opcode;
            escribir(risc_v_binario, CadenadeEntradamain);
        }else if (tipodeOperacion == 'sd')
        {
            let opcode = '0100011';
            let func3 = '011';
            let func12 = convertToBinary(aux1);
            let binario = String(func12).padStart(12, '0');
            console.log(binario);
            console.log(binario.slice(1,7));
            console.log(binario.slice(7,12));
            const risc_v_binario = binario.toString().slice(0,7) + rd + rs1 + func3 + String(binario).slice(7,12) + opcode;
            console.log(risc_v_binario);
            escribir(risc_v_binario, CadenadeEntradamain);
        }else if(tipodeOperacion== 'jalr')
        {
            let opcode = asignarOpcode(tipodeOperacion);
            let func3 = '000';
            let immediato = convertToBinary(aux1);
            let inmediato = String(immediato).padStart(12, '0');
            const risc_v_binario = inmediato + rs1 + func3 + rd + opcode;
            console.log(risc_v_binario);
            escribir(risc_v_binario, CadenadeEntradamain);
        }
    }
    else if(tipodeOperacionGlobal == 1){
        direccionesporseparadoRecibidas = quitarlasX(direcciones);
        let rs1 = convertToBinary(direccionesporseparadoRecibidas[0])
        let rs2 = convertToBinary(direccionesporseparadoRecibidas[1]);
        let rd = convertToBinary(direccionesporseparadoRecibidas[2]);
        let opcode = asignarOpcode(tipodeOperacion);
        let func7 = asignarfunc7(tipodeOperacion);
        let func3 =asignarfunc3(tipodeOperacion);
        console.log(rs1, rs2, rd);
        const risc_v_binario = func7 + rd + rs2 + func3 + rs1 + opcode;
        console.log(risc_v_binario);
        let risc_v_hexadecimal = convertidorHexadecimal(risc_v_binario);
        escribir(risc_v_binario, CadenadeEntradamain);   
     }
     else if(tipodeOperacionGlobal == 5)
     {
        let opcode = asignarOpcode(tipodeOperacion);
        let func3;
        if(tipodeOperacion == 'bne')
        {
            func3 = '001';
        }else
        {
            func3 = '000';
        }
        let[rs1,rs2, inmediato] = quitarlasXparaoperacionestipoparaBranchs(direcciones);
        console.log(inmediato.slice(0,1));
        console.log(inmediato.slice(0,6));
        console.log(rs2);
        console.log(rs1);
        console.log(func3);
        console.log(inmediato.slice(7,11));
        console.log(inmediato.slice(11,12));
        console.log('cambio');
        const risc_v_binario = inmediato.slice(0,1) + inmediato.slice(1,7) + rs2 + rs1 + func3 + inmediato.slice(7,11) + inmediato.slice(11,12) + opcode;
        escribir(risc_v_binario, CadenadeEntradamain);
     }
    }
    else if(tipodeOperacionGlobal == 3){

        let [rd,inmediato] = quitarlasXparaoperacionestipoparaJal(direcciones);
        let opcode = asignarOpcode(tipodeOperacion);
        console.log('pos',inmediato.toString().slice(1,2));
        console.log('pos2',inmediato.toString().slice(9,20));
        console.log('pos3',inmediato.toString().slice(10,11));
        console.log('pos4',inmediato.toString().slice(2,10));
        const risc_v_binario = inmediato.toString().slice(0,1) + inmediato.toString().slice(2,10)+ inmediato.toString().slice(9,20)   + rd+ opcode;
        console.log(risc_v_binario);
        escribir(risc_v_binario, CadenadeEntradamain);
    }else{
        escribir('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Error verifica la cadena elimina posibles espacios en blanco');
    }
    
}

function partiren4(riscv)
{
    let aux = convertidorHexadecimal(riscv.toString().slice(0,4));
    let aux2 = convertidorHexadecimal(riscv.toString().slice(4,8));
    let aux3 = convertidorHexadecimal( riscv.toString().slice(8,12));
    console.log(aux,aux2,aux3);
    let aux4 = convertidorHexadecimal(riscv.toString().slice(12,16));
    let aux5 = convertidorHexadecimal(riscv.toString().slice(16,20));
    let aux6 = convertidorHexadecimal(riscv.toString().slice(20,24));
    let aux7 = convertidorHexadecimal(riscv.toString().slice(24,28));
    let aux8 = convertidorHexadecimal(riscv.toString().slice(28,33));
    console.log(aux4, aux5, aux6, aux7, aux8);
    const riscv_v_hexadecimal = aux + aux2 + aux3 + aux4 + aux5 + aux6 + aux7 + aux8;
    console.log(riscv_v_hexadecimal);
    return riscv_v_hexadecimal;
}

function escribir(riscv, CadenadeEntrada)
{

    console.log(riscv);
    let riscv_v_hexadecimal = partiren4(riscv);
    //let div = document.querySelector('salida');
    //aux = div.textContent;
    let aux = document.getElementById('salida');
    let parrafoHTML = document.createElement('p');
    parrafoHTML.innerText = 'x"'+riscv_v_hexadecimal+'"--'+CadenadeEntrada;
    aux.appendChild(parrafoHTML);
}

function convertidorHexadecimal(valorDeEntrada)
{
    return Number(parseInt(valorDeEntrada,2)).toString(16);
}

function quitarlasXparaoperacionestipoparaJal(direccionesRecibidas)
{
    console.log("entro a la funcion de jal");
    console.log(direccionesRecibidas);
    let direccionesporSeparado = direccionesRecibidas.split(',');
    console.log(direccionesporSeparado);
    let aux = direccionesporSeparado[0].split('x');
    console.log(aux.join(''));
    let rd = convertToBinary(aux.join(''));
    console.log(rd);
    let posicion = 0;
    if(isNaN(direccionesporSeparado[1])){ //verificamos si es una letra o un numero
    for (let i = 0; i < etiquetaArreglo.length; i++) 
    {
        if(direccionesporSeparado[1] == etiquetaArreglo[i])
        {
            console.log('se encontro');
            let pos = 0;
            if(contador>i){
                posicion = pos - contador;
            }else{
                posicion = pos + (i -contador);
            }
        }
     }
    }else
    {
        posicion = direccionesporSeparado[1];
    }
    console.log('posicion:',posicion);
    let inmediato =convertoBinary2(posicion);
    console.log(rd, inmediato);
    if(posicion>=0)
    {
        inmediato = String(inmediato).padStart(20, '0');
    }else{
        inmediato = String(inmediato).padStart(20, '1');
    }
    console.log(rd, inmediato);
    return [rd, inmediato];
}   
function quitarlasXparaoperacionestipoparaBranchs(direccionesRecibidas)
{
    console.log("entro a la funcion de jal");
    console.log(direccionesRecibidas);
    let direccionesporSeparado = direccionesRecibidas.split(',');
    console.log(direccionesporSeparado);
    let aux = direccionesporSeparado[0].split('x');
    console.log(aux.join(''));
    let rs1 = convertToBinary(aux.join(''));
    console.log(rs1);
    let aux2 = direccionesporSeparado[1].split('x');
    console.log(aux2.join(''));
    let rs2 = convertToBinary(aux2.join(''));
    console.log(rs2);
    let posicion = 0;
    let auxComplementoa2;
    if(isNaN(direccionesporSeparado[2])){ //verificamos si es una letra o un numero
    for (let i = 0; i < etiquetaArreglo.length; i++) 
    {
        if(direccionesporSeparado[2] == etiquetaArreglo[i])
        {
            console.log('se encontro');
            let pos = 0;
            if(contador>i){
                posicion = pos - contador;
                auxComplementoa2 = posicion*(-1);
                if(auxComplementoa2<16)
                {
                    auxComplementoa2 =16- auxComplementoa2;
                }else{
                    auxComplementoa2 = 32-auxComplementoa2;
                }
            }else{
                posicion = pos + (i -contador);
                auxComplementoa2 = posicion;
            }
        }
     }
    }else
    {
        posicion = direccionesporSeparado[2];
        if(posicion<0)
        {
            auxComplementoa2 = posicion*(-1);
                if(auxComplementoa2<16)
                {
                    auxComplementoa2 =16- auxComplementoa2;
                }else{
                    auxComplementoa2 = 32-auxComplementoa2;
                }
        }else{
        auxComplementoa2 = posicion;
        }
    }
     
    console.log('posicion:',auxComplementoa2);
    let inmediato =convertoBinary2(auxComplementoa2);

    if(posicion>=0)
    {
        inmediato = String(inmediato).padStart(12, '0');
    }else{
        inmediato = String(inmediato).padStart(12, '1');
    }
    console.log(rs1,rs2,inmediato);
    return[rs1,rs2,inmediato];
}
//permite conocer si es un numero positivo o negativo
function convertoBinary2(dec)
{
    if(dec >= 0) {
        return Number(parseInt(dec,10)).toString(2);
    }
    else {
        //make the number positive
        dec = Math.abs(dec);
        //get the first compliment
        let res = dec ^ parseInt((new Array(dec.toString(2).length+1)).join("1"),2);
        //get the second complimet
        return (res+1).toString(2);
    }
}
function quitarlasXparaoperacionestipo2(direccionesRecibidas)
{
    let auxDirecciones = direccionesRecibidas.split('x');
    console.log(auxDirecciones);
    let direccionessinX = auxDirecciones.join('');
    let direccionesporSeparado = direccionessinX.split(',',3); //solo se pueden maximo 3 registros
    let aux = direccionesporSeparado[1].split('(');
    console.log("aux",aux);
    let aux2 = aux[1].split(')');
    console.log(aux2);
    const recibidor1 = aux[0];
    const recibidor2 = aux2[0]
    console.log(direccionesporSeparado[0],recibidor1,recibidor2);
    return [direccionesporSeparado[0],recibidor1, recibidor2];
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
    else if(tipodeoperacionRecibida =='ld')
        opcode = '0000011';
    else if(tipodeoperacionRecibida== 'sd')
        opcode = '0100011';
    else if(tipodeoperacionRecibida == 'jal')
        opcode = '1101111';
    else if(tipodeoperacionRecibida == 'bne')
        opcode = '1100011'
    else if(tipodeoperacionRecibida == 'beq')
        opcode = '1100011';
    else if(tipodeoperacionRecibida == 'jalr')
        opcode = '1100111';
    else
        opcode = 'xxxxxxx';
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
    while(etiquetaArreglo.length > 0)
        etiquetaArreglo.pop(); 
    document.getElementById('salida').innerHTML = " "; 
    let codigoRecibido = "";
    codigoRecibido = document.getElementById('codigoensamblador').value;
    let aux = codigoRecibido;
    meterEtiquetasIterativo(aux);
    separarlineasdecodigo(codigoRecibido);
    //mainPrincipal(codigoRecibido);
}
function meterEtiquetasIterativo(codigoRecibido)
{
    let aux = codigoRecibido.split("\n");
    //console.log(aux);
    //console.log(aux.length);
    for ( let i = 0; i < aux.length; i++) {
        const element = aux[i];
        meterEtiquetas(element);
    }
}

function meterEtiquetas(CadenadeEntradamain)
{
    let etiqueta, operacion, direcciones;
    if((/([a-z]*): (add|sd|ld|sub|jalr|bne|beq|jal) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,sum)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\n)/.test(CadenadeEntradamain)) == true)
     {
        [etiqueta, operacion, direcciones] = CadenadeEntradamain.split(' ');
        const aux = etiqueta.split(':');
        const aux2 = aux.join('');
        etiquetaArreglo.push(aux2);
        console.log(operacion, direcciones);
    }else{
        etiquetaArreglo.push(" ");
    }
    
}
function separarlineasdecodigo(codigoRecibido)
{
    let aux = codigoRecibido.split("\n");
    //console.log(aux);
    //console.log(aux.length);
    for ( contador = 0; contador < aux.length; contador++) {
        const element = aux[contador];
        console.log(element);
        mainPrincipal(element);
    }
}

function borrar()
{
    document.getElementById('codigoensamblador').value = "";
    document.getElementById('salida').innerHTML = " "; 
    while(etiquetaArreglo.length > 0)
        etiquetaArreglo.pop(); 
    
}
//00000000000001010011010010000011
//
//([a-z]*): (add|sd|ld|sub|jalr|bne|beq|jal) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,sum)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\n)
//(add|sd|ld|sub|jalr|bne|beq|jal) ((x[0-9]*))(,[0-9]*|,x[0-9]*|,sum)((\(x[0-9]*\)|,x[0-9]*)|,[a-z]*|,[0-9]*|\n)