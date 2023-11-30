export {
    biblioteca,
    Usuario,
    EntidadeBibliografica,
    Livro,
}
// Classes 
class tBiblioteca{
    constructor(acervo,users){
        this.acervo = acervo;
        this.users = users;
    }

    addUser(newUser){
        this.users.push(newUser);
    }
    addAcervo(newItem){
        this.acervo.push(newItem);
    }

    emprestarItem(codLivro, codAluno){
        this.acervo.forEach(el => {
            if(el.codigo == codLivro){
                el.emprestado = true;
                el.usuarioEmprestimo = codAluno;
            }
        });        
    }
    devolverItem(codLivro){
        this.acervo.forEach(el => {
            if(el.codigo == codLivro){
                el.emprestado = false;
            }
        });        
    }
} 
class EntidadeBibliografica {
    constructor(titulo,autor,anoPublicacao,codigo){
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.codigo = codigo;
    this.emprestado = false;
    this.usuarioEmprestimo = null;
    }
    
    emprestar(usuario){
        if(this.emprestado == false){
            this.emprestado = true;
            console.log('Sucesso!')
        }else{
            console.log('Livro já está sendo emprestado!');
        }
        this.usuarioEmprestimo = usuario;
    }
    
    devolver(){
        if(this.emprestado == true){
            this. emprestado = false;
            console.log('sucesso');
        }else{
            console.log('Livro não está sendo emprestado!')
        }
        this.usuarioEmprestimo = null;
    }
}

class Livro extends EntidadeBibliografica{
    constructor(titulo,autor,anoPublicacao,codigo,genero){   
    super(titulo,autor,anoPublicacao,codigo)
        this.genero = genero; 
}
}
class Usuario{
    constructor(nome,registroAcademico, dataNascimento){
    this.nome = nome;
    this.registroAcademico = registroAcademico;
    this.dataNascimento = dataNascimento;  
    }
}

let acervo = [];
let users = [];
let biblioteca = new tBiblioteca(acervo,users)

let eu = new Usuario('pedro',1,'05/03/2004')
biblioteca.addUser(eu);
eu = new Usuario('gabriel',2,'05/03/2004')
biblioteca.addUser(eu);
eu = new Usuario('kauya',3,'05/03/2004')
biblioteca.addUser(eu);
eu = new Usuario('gustavo',4,'05/03/2004')
biblioteca.addUser(eu);
eu = new Usuario('guilherme',5,'05/03/2004')
biblioteca.addUser(eu);
console.log(biblioteca)