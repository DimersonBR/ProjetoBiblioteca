const readline = require('readline-sync');
const { cadastrarLivro, cadastrarAutor, cadastrarUsuario, realizarEmprestimo, realizarDevolucao, consultarDados } = require('./biblioteca');

function menu() {
    let opcao;
    do {
        console.log('1. Cadastrar Livro');
        console.log('2. Cadastrar Autor');
        console.log('3. Cadastrar Usuario');
        console.log('4. Realizar Emprestimo');
        console.log('5. Realizar Devolucao');
        console.log('6. Consultar Livros Disponiveis');
        console.log('7. Consultar Livros Emprestados');
        console.log('8. Consultar Autores');
        console.log('9. Consultar Usuarios');
        console.log('10. Sair');
        console.log('---------------------------------');
        opcao = readline.questionInt('Digite sua opcao: ');

        switch (opcao) {
            case 1:
                const titulo = readline.question('Titulo: ');
                const autor = readline.question('Autor: ');
                const anoPublicacao = readline.questionInt('Ano de Publicacao: ');
                const isbn = readline.question('ISBN: ');
                cadastrarLivro(titulo, autor, anoPublicacao, isbn);
                break;
            case 2:
                const nomeAutor = readline.question('Nome do Autor: ');
                const nacionalidade = readline.question('Nacionalidade: ');
                cadastrarAutor(nomeAutor, nacionalidade);
                break;
            case 3:
                const nomeUsuario = readline.question('Nome do Usuario: ');
                const email = readline.question('Email: ');
                cadastrarUsuario(nomeUsuario, email);
                break;
            case 4:
                const tituloLivro = readline.question('Titulo do Livro: ');
                const nomeUsuarioEmprestimo = readline.question('Nome do Usuario: ');
                const dataEmprestimo = readline.question('Data do Emprestimo: ');
                realizarEmprestimo(tituloLivro, nomeUsuarioEmprestimo, dataEmprestimo);
                break;
            case 5:
                const tituloLivroDevolucao = readline.question('Titulo do Livro: ');
                const nomeUsuarioDevolucao = readline.question('Nome do Usuario: ');
                realizarDevolucao(tituloLivroDevolucao, nomeUsuarioDevolucao);
                break;
            case 6:
                consultarDados('./livros.json');
                break;
            case 7:
                consultarDados('./emprestimos.json');
                break;
            case 8:
                consultarDados('./autores.json');
                break;
            case 9:
                consultarDados('./usuarios.json');
                break;
            case 10:
                console.log('Saindo... Bye !');
                break;
            default:
                console.log('Opcao invalida.');
        }
    } while (opcao !== 10);
}

menu();
