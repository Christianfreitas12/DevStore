import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030/'
})

export default class Api {
    async listar(){
       let r = await api.get('/produto');
       return r.data;
    }

    async inserir(produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo){
        let r = await api.post('/produto', {produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo});
        return r.data;
    }

    async alterar(id ,produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo){
        let r = await api.put('/produto/' + id, {produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo});
        return r.data;
    }

    async remover(id){
        let r = await api.delete('/produto/' + id);
        return r.data;
    }
}