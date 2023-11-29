import {
    Livro, 
    biblioteca,
} from './class.js'

let i = 0;

window.libraryApi = function(apiUrl, subject){
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    data.works.forEach((el) => {
        let newItem = new Livro(el.title,el.authors[0].name,el.first_publish_year,i++, subject);
        biblioteca.addAcervo(newItem);
    }
    );
  })
  .catch(error => console.error('Erro ao recuperar dados:', error));

}
libraryApi('https://openlibrary.org/subjects/fantasy.json', 'Fantasia');
libraryApi('https://openlibrary.org/subjects/humor.json', 'Comédia');
libraryApi('https://openlibrary.org/subjects/horror.json', 'Terror');
libraryApi('https://openlibrary.org/subjects/thriller.json', 'Suspense');
