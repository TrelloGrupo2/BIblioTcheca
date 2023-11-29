import{
    biblioteca,
    Usuario,
    Livro,
    EntidadeBibliografica,
}from "./class.js"


window.selectorAcervo = function(){
    let selector = document.getElementById('select')
    let label = document.getElementById('labelGenero');
    let input = document.getElementById('genero');

    if(selector.value == 'livro'){
        label.style.display = "inline"
        input.style.display = 'inline'
    }else if(selector.value == 'revista'){
        label.style.display = "none"
        input.style.display = 'none'
    }
}   

window.addUser = function(){
    let existe = false;
    let nome = document.getElementById('nome').value;
    let registroAcademico = document.getElementById('registroAcademico').value
    let data = document.getElementById('data').value

        biblioteca.users.map((user) => {
            if(registroAcademico == user.registroAcademico){
                alert('Aluno já registrado');
                existe = true;
            }
        })
        if(existe == false){
            let newUser = new Usuario(nome,registroAcademico,data);
            biblioteca.addUser(newUser);
   
        }
        console.log(biblioteca.users)
    }

window.addItem = function(){
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let ano = document.getElementById('ano').value;    
    let select = document.getElementById('select').value
    let codigo = Date.now()
    if(select == 'livro'){
        let genero = document.getElementById('genero').value
        let newBook = new Livro(titulo,autor,ano,codigo,genero)
        biblioteca.addAcervo(newBook)
    }else if (select == 'revista'){
        
        let newItem = new EntidadeBibliografica(titulo,autor,ano,codigo);
        biblioteca.addAcervo(newItem)
    }

}

window.emprestarItem = function(){
    let ra = document.getElementById('RaEmprestar').value;
    let codLivro = document.getElementById('codLivroEmprestar').value;
    let existe = false;
    let existeLivro = false;
    biblioteca.acervo.map((item) => {
        if(item.codigo == codLivro) {
            existeLivro = true;
            if(item.codigo == codLivro) {
                if(item.emprestado == true){
                    alert(`${item.titulo} está emprestado!`);
                    return;
                } 
            }
            biblioteca.users.map((user) => {
                if(user.registroAcademico == ra) {
                    biblioteca.emprestarItem(codLivro, ra);
                    alert(` ${item.titulo} foi empresatdo p/ ${user.nome}`);
                    existe = true;
                    showAcervo();
                }
            })
            if(existe == false){
                alert('usuario nao exidste men')
            }
        }
    })
    if(existeLivro == false){
        alert('livro nao existe men')
    }
}


window.devolverItem = function(){
    let ra = document.getElementById('RaDevolver').value;
    let codLivro = document.getElementById('codLivroDevolver').value;
    let existe = false;
    let existeLivro = false;
    biblioteca.acervo.map((item) => {
        if(item.codigo == codLivro) {
            existeLivro = true;
            if(item.codigo == codLivro) {
                if(item.emprestado == false){
                    alert(`${item.titulo} não está emprestado!`);
                    return;
                } 
            }
            biblioteca.users.map((user) => {
                if(user.registroAcademico == ra) {
                    biblioteca.devolverItem(codLivro, ra);
                    alert(`${user.nome} devolveu ${item.titulo} `);
                    existe = true;
                    showAcervo()
                }
            })
            if(existe == false){
                alert('usuario nao exidste men')
            }
        }
    })
    if(existeLivro == false){
        alert('livro nao existe men')
    }
}
window.createDom = function(titulo, autor,genero,codigo,emprestado){
    if(emprestado == false ){
        emprestado = 'sim'
    }else{
        emprestado = 'nao'
    }

    let tr = document.createElement('tr');
    
    let tituloTh = document.createElement('th');
    tituloTh.textContent = titulo;

    let autorTh = document.createElement('th');
    autorTh.textContent = autor;
    
    let generoTh = document.createElement('th');
    generoTh.textContent = genero;
    
    let codigoTh = document.createElement('th');
    codigoTh.textContent = codigo;
    
    let emprestadoTh = document.createElement('th');
    emprestadoTh.textContent = emprestado;

    tr.appendChild(tituloTh);
    tr.appendChild(autorTh);
    tr.appendChild(generoTh);
    tr.appendChild(codigoTh);
    tr.appendChild(emprestadoTh);

    tableMain.appendChild(tr);

}

window.showAcervo = function(){
    if(document.getElementById('tableMain') != null){
        document.getElementById('livros').removeChild(document.getElementById('tableMain'))
    }


    let tableMain = document.createElement('table');
    tableMain.id = 'tableMain';

    let headerTr = document.createElement('tr')
    let headerTitulo = document.createElement('th');
    headerTitulo.textContent = 'titulo'
    let headerAutor = document.createElement('th');
    headerAutor.textContent = 'autor'
    let headergenero = document.createElement('th');
    headergenero.textContent = 'generpo'
    let headercodigo = document.createElement('th');
    headercodigo.textContent = 'codigo';
    let headerDisponivel = document.createElement('th');
    headerDisponivel.textContent = 'disponivel'

    headerTr.appendChild(headerTitulo);
    headerTr.appendChild(headerAutor);
    headerTr.appendChild(headergenero);
    headerTr.appendChild(headercodigo);
    headerTr.appendChild(headerDisponivel);

    tableMain.appendChild(headerTr)

    document.getElementById('livros').appendChild(tableMain)
 
      
    setTimeout(() => {
    biblioteca.acervo.forEach(item => {
        console.log(item.titulo)
        createDom(item.titulo, item.autor, item.genero, item.codigo, item.emprestado);
    });

}, 10);
}