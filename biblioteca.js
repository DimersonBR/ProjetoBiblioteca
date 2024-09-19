const fs = require('fs');
const path = require('path');
const Livro = require('./livro');
const Usuario = require('./usuario');
const Emprestimo = require('./emprestimo');
const Autor = require('./autor');

const livrosFilePath = path.join(__dirname, 'livros.json');
const usuariosFilePath = path.join(__dirname, 'usuarios.json');
const emprestimosFilePath = path.join(__dirname, 'emprestimos.json');
const autoresFilePath = path.join(__dirname, 'autores.json');

function readData(filePath) {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

function writeData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

let livros = readData(livrosFilePath);
let usuarios = readData(usuariosFilePath);
let emprestimos = readData(emprestimosFilePath);
let autores = readData(autoresFilePath);

function cadastrarLivro(titulo, autor, anoPublicacao, isbn) {
    const livro = new Livro(titulo, autor, anoPublicacao, isbn);
    livros.push(livro);
    writeData(livrosFilePath, livros);
    console.log('-----------------------------');
    console.log('Livro cadastrado com sucesso!');
    console.log('-----------------------------');
}

function cadastrarAutor(nome, nacionalidade) {
    const autor = new Autor(nome, nacionalidade);
    autores.push(autor);
    writeData(autoresFilePath, autores);
    console.log('-----------------------------');
    console.log('Autor cadastrado com sucesso!');
    console.log('-----------------------------');
}

function cadastrarUsuario(nome, email) {
    const usuario = new Usuario(nome, email);
    usuarios.push(usuario);
    writeData(usuariosFilePath, usuarios);
    console.log('--------------------------');
    console.log('Usuário cadastrado com sucesso!');
    console.log('--------------------------');
}

function realizarEmprestimo(tituloLivro, nomeUsuario, dataEmprestimo) {
    const livroIndex = livros.findIndex(l => l.titulo === tituloLivro);
    const usuario = usuarios.find(u => u.nome === nomeUsuario);
    if (livroIndex !== -1 && usuario) {
        const livro = livros[livroIndex];
        const emprestimo = new Emprestimo(livro, usuario, dataEmprestimo);
        emprestimos.push(emprestimo);
        livros.splice(livroIndex, 1); // Remove o livro do array de livros
        writeData(emprestimosFilePath, emprestimos);
        writeData(livrosFilePath, livros);
        console.log('--------------------------------');
        console.log('Empréstimo realizado com sucesso!');
        console.log('--------------------------------');
    } else {
        console.log('--------------------------------');
        console.log('Livro ou usuário não encontrado.');
        console.log('--------------------------------');
    }
}
function realizarDevolucao(tituloLivro, nomeUsuario) {
    const emprestimoIndex = emprestimos.findIndex(e => e.livro.titulo === tituloLivro && e.usuario.nome === nomeUsuario);
    if (emprestimoIndex !== -1) {
        const emprestimo = emprestimos[emprestimoIndex];
        livros.push(emprestimo.livro); // Adiciona o livro de volta ao array de livros
        emprestimos.splice(emprestimoIndex, 1);
        writeData(emprestimosFilePath, emprestimos);
        writeData(livrosFilePath, livros);
        console.log('--------------------------------');
        console.log('Devolução realizada com sucesso!');
        console.log('--------------------------------');
    } else {
        console.log('--------------------------');
        console.log('Empréstimo não encontrado.');
        console.log('--------------------------');
    }
}

function consultarDados(filePath) {
    const data = readData(filePath);
    console.log(JSON.stringify(data, null, 2));
}

module.exports = {
    cadastrarLivro,
    cadastrarAutor,
    cadastrarUsuario,
    realizarEmprestimo,
    realizarDevolucao,
    consultarDados
};
