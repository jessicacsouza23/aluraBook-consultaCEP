async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCep.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;
        
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }catch (erro){
        mensagemErro.innerHTML = `<p>CEP invalido. Tente novamente!</p>`
        console.log(erro);
    }
}

// let ceps = ['01001000', '01001001'];
// let conjuntoCep = ceps.map(valores => buscaEndereco(valores));
// console.log(conjuntoCep)
// Promise.all(conjuntoCep).then(respostas => console.log(respostas));

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
