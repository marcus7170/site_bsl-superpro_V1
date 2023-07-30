let alternarOVR = 0
let alternarPreco = 0

// Função que copia as informações para comprar a carta
function copiarJogador(posicao, valor, nome) {
    const textoCopiado = `!janela ${posicao} ${valor} ${nome}`;
    const campoTexto = document.createElement('textarea');
    campoTexto.value = textoCopiado;
    document.body.appendChild(campoTexto);
    campoTexto.select();
    document.execCommand('copy');
    document.body.removeChild(campoTexto);

    const alerta = document.createElement('div');
    alerta.className = 'alert';
    alerta.textContent = `Informações do jogador ${nome} copiadas para a área de transferência. Use-as no privado do bot.`;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}




// Função que ordena os resultados por Preço da Carta
function ordenarPorValor() {
    alternarPreco += 1;
    // Desativa o botão presiona e ativa os outros
    // const btnOrdenarOVR = document.querySelector('#ordenarOverall').disabled = false;
    // const btnOrdenarValor = document.querySelector('#ordenarValor').disabled = true;

    const btnOrdenarOVR = document.querySelector('#ordenarOverall')
    const btnOrdenarValor = document.querySelector('#ordenarValor')
    btnOrdenarOVR.style.backgroundColor = '#888'
    btnOrdenarOVR.style.border = '0px'
    btnOrdenarValor.style.border = '2px solid #000'
    
    // Seleciona o Container e os cards
    const container = document.querySelector('.container');
    const cards = Array.from(container.querySelectorAll('.card'));
    if(alternarPreco % 2 != 0) {
        cards.sort((a, b) => {
            const valorA = parseInt(a.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].replace("R$ ", ""));
            const valorB = parseInt(b.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].replace("R$ ", ""));
            btnOrdenarValor.innerHTML = 'Ordenar por Menor Valor'
            btnOrdenarValor.style.backgroundColor = '#500'
            return valorB - valorA;
        });
    }
    else{
        cards.sort((b, a) => {
            const valorA = parseInt(a.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].replace("R$ ", ""));
            const valorB = parseInt(b.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].replace("R$ ", ""));
            btnOrdenarValor.innerHTML = 'Ordenar por Maior Valor'
            btnOrdenarValor.style.backgroundColor = '#050'
            return valorB - valorA;
        });
    }
    cards.forEach((card) => container.appendChild(card));
}




// Função que ordena os resultados por Overall da Carta
function ordenarPorOverall() {
    alternarOVR += 1;
    
    // Desativa o botão presiona e ativa os outros
    // const btnOrdenarOVR = document.querySelector('#ordenarOverall').disabled = true;
    // const btnOrdenarValor = document.querySelector('#ordenarValor').disabled = false;
    const btnOrdenarOVR = document.querySelector('#ordenarOverall')
    const btnOrdenarValor = document.querySelector('#ordenarValor')
    btnOrdenarValor.style.backgroundColor = '#888'
    btnOrdenarValor.style.border = '0px'
    btnOrdenarOVR.style.border = '2px solid #000'
    
    // Seleciona o Container e os cards
    const container = document.querySelector('.container');
    const cards = Array.from(container.querySelectorAll('.card'));
    if(alternarOVR % 2 != 0) {
        cards.sort((a, b) => {
            const valorA = parseInt(a.querySelector('p:nth-of-type(2)').textContent.split(': ')[1].replace("Overall ", ""));
            const valorB = parseInt(b.querySelector('p:nth-of-type(2)').textContent.split(': ')[1].replace("Overall ", ""));
            btnOrdenarOVR.innerHTML = 'Ordenar por Menor OVR'
            btnOrdenarOVR.style.backgroundColor = '#500'
            return valorB - valorA;
        });
    }else{
        cards.sort((b, a) => {
            const valorA = parseInt(a.querySelector('p:nth-of-type(2)').textContent.split(': ')[1].replace("Overall ", ""));
            const valorB = parseInt(b.querySelector('p:nth-of-type(2)').textContent.split(': ')[1].replace("Overall ", ""));
            btnOrdenarOVR.innerHTML = 'Ordenar por Maior OVR'
            btnOrdenarOVR.style.backgroundColor = '#050'
            return valorB - valorA;
        });
    }
    cards.forEach((card) => container.appendChild(card));
}

function resetarFaixaPreco(){
    document.getElementById('filtroMaiorPreco').value = '';
    document.getElementById('filtroMenorPreco').value = '';
}


function filtro() {
    // Lista de Cards
    const container = document.querySelector('.container');
    const cards = Array.from(container.querySelectorAll('.card'));
    // Cria um array com a soma dos filtros, para uma carta ser exibida, ela precisa passar no teste de todos os filtros
    // Para cada teste passado, será somado 1, pra carta ser exibida, ela necessita alcançar X valor de soma, sendo X o número de testes(filtros)
    const filtroCards = []
    let resultadoTotal = cards.length;
    for(let i = 0; i < cards.length; i++) {
        filtroCards[i] = 0
    }
    // Altere numeroDeFiltros, caso futuramente sejam adicionados nos filtros
    const numeroDeFiltros = 4 // Overall, tipo, Posição
    
    let filtroFaixaDePrecoMaior = document.getElementById('filtroMaiorPreco').value;
    let filtroFaixaDePrecoMenor = document.getElementById('filtroMenorPreco').value;

    if(filtroFaixaDePrecoMenor === undefined || filtroFaixaDePrecoMenor === '') {
        filtroFaixaDePrecoMenor = 0;
        console.log('Faixa Maior> ' + filtroFaixaDePrecoMenor)
    }
    if(filtroFaixaDePrecoMaior === undefined ||filtroFaixaDePrecoMaior === ''){
        filtroFaixaDePrecoMaior = 9999999999999;
        console.log('Faixa Menor> ' + filtroFaixaDePrecoMaior)
    }


    //  Filtro de Tipo (Parâmetros)
    const filtroTipo = document.getElementById('filtro-tipo').value;
    const iconList = ['spirales', 'bielz013', 'koa', 'bitencourt', 'sherwick', 'anaozera', 'wintok', 'lzct', 'jaack', 'rafique'];
    
    // Filtro de OVR (Parâmetros)
    const filtroOverall = document.getElementById('filtro-overall').value;
    
    // Filtro de Posição (Parâmetros)
    const filtroPosicao = document.getElementById('posicao').value;
    


    cards.forEach((card, index) => {

        // Filtro Faixa de Preço
        const preco = parseInt(card.querySelector('p:nth-of-type(1)').textContent.split(': ')[1].replace("R$ ", ""));
        console.log(preco);
        if (preco <= filtroFaixaDePrecoMaior && preco >= filtroFaixaDePrecoMenor)
            filtroCards[index] += 1;
        

        
        // Filtro Tipo
        const nome = card.querySelector('h3').textContent;
        if (filtroTipo == 'icon') {
            for (let i = 0; i < iconList.length; i++) {
                isIcon = nome.includes(iconList[i])
                if(isIcon){
                    filtroCards[index] += 1;
                    break;
                } 
            }
        } else {
            if (nome.includes(filtroTipo))
                filtroCards[index] += 1;
        }

        // Filtro OVR
        if (filtroOverall == '') 
            filtroCards[index] += 1;
        else {
            const overall = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];

            if (filtroOverall === '90+') {
                if(overall >= 90)
                    filtroCards[index] += 1;
              
            } else {
                const [minOverall, maxOverall] = filtroOverall.split('-');
                if(overall >= minOverall && overall <= maxOverall)
                    filtroCards[index] += 1;
                
            }
        }

        // Filtro Posição
        if (filtroPosicao == '') {
            filtroCards[index] += 1;
        } else {
            const posicao = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1].replace("Posição: ", "");
            if(posicao == filtroPosicao)
                filtroCards[index] += 1;
        }


        // Display
        if(filtroCards[index] == numeroDeFiltros)
            card.style.display = 'block';
        else{
            resultadoTotal -= 1
            card.style.display = 'none';
        }
            
        
    });
    
    
    if(resultadoTotal <= 0){
        document.getElementById('retornoBusca').style.display = 'block'; 
        document.getElementById('jogadorDisponiveis').style.display = 'none'
    }
    else{
        document.getElementById('retornoBusca').style.display = 'none';
        const numeroJogadores = document.getElementById('jogadorDisponiveis');
        numeroJogadores.innerHTML = resultadoTotal + ' Jogador(es) Disponível(is)';
        numeroJogadores.style.display = 'block';
        const assinatura = document.getElementsByClassName('assinatura');
        
        for (let i = 0; i < assinatura.length; i++){
            let assinaturaSemTag = assinatura[i].textContent;
            assinaturaSemTag = assinaturaSemTag.replace('-beta', '');
            assinaturaSemTag = assinaturaSemTag.replace('-mom', '');
            assinaturaSemTag = assinaturaSemTag.replace('-hero', '');
            assinaturaSemTag = assinaturaSemTag.replace('-rule', '');
            assinaturaSemTag = assinaturaSemTag.replace('-tots', '');
            assinatura[i].innerHTML = assinaturaSemTag;
        }
            
        
            
        // document.getElementById('assinatura').innerHTML =assinatura;
    }
        
}


