import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar';

import { Container, Conteudo } from './styled'


import { useState, useEffect, useRef } from 'react';
import Cabecalho from '../../components/cabecalho';
import Menu from '../../components/menu';



import Api from '../../service/api';
const api = new Api();

export default function Index() {
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [precode, setPrecode] = useState('');
    const [precopor, setPrecopor] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idAlt, setidAlt] = useState(0);

    let loading = useRef(null);

    async function listar(){
        loading.current.continuousStart();
        let r = await api.listar();
        setProdutos(r);
        loading.current.complete();
    }

  async function inserir() {
    loading.current.continuousStart();
      if(idAlt == 0){
        let r = await api.inserir(produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem)
            if(r.erro)
            alert(r.erro)
            else 
            toast.dark('🔥 Produto inserido!!')
     } else{
        let r = await api.alterar(idAlt ,produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem)
            if(r.erro)
        alert(r.erro)
        else 
            toast.dark('🔄 Produto alterado!!')
     }
      LimparCampos();
      listar();
      loading.current.complete();
  }

  function LimparCampos() {
    setImagem('');
    setProduto('');
    setCategoria('');
    setPrecode('');
    setPrecopor('');
    setAvaliacao('');
    setEstoque('');
    setDescricao('');
    setidAlt(0);
  }

  async function remover(id) {
    loading.current.continuousStart();
    confirmAlert({
        title: 'Remover Aluno',
        message: `Tem certeza que você deseja remover o aluno ${id} ?`,
        buttons: [
            {
                label: 'Sim',
                onClick: async() => {
                    let r = await api.remover(id);
                    if(r.erro)
                      toast.error(`${r.erro}`);
                    else{
                        toast.dark('🗑️ Produto removido!');
                    }  
                }
            },
            {
                label: 'Não',
                onClick: () => toast.dark('Remoção do produto Canselada!')
            }
        ]
    });
    loading.current.complete();
    listar();
   }

  async function editar(item){
      setProduto(item.nm_produto),
      setCategoria(item.ds_categoria),
      setAvaliacao(item.vl_avaliacao),
      setPrecode(item.vl_preco_de),
      setPrecopor(item.vl_preco_por),
      setEstoque(item.qtd_estoque),
      setImagem(item.img_produto),
      setDescricao(item.ds_produto),
      setidAlt(item.id_produto)
  }


    useEffect(() => {
        listar();
    }, [])


    return (
        <Container>
            <LoadingBar color="#119FDC" ref={loading} />
            <ToastContainer />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{idAlt == 0 ? "Novo Produto": "Alterando Produto " + idAlt}</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input value={produto} onChange={e => setProduto(e.target.value)} /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input value={categoria} onChange={e => setCategoria(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input value={avaliacao} onChange={e => setAvaliacao(e.target.value)} /> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Preço DE: </div>  
                                    <div class="input"> <input value={precode} onChange={e => setPrecode(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Preço POR: </div>  
                                    <div class="input"> <input  value={precopor} onChange={e => setPrecopor(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Estoque: </div>  
                                    <div class="input"> <input value={estoque} onChange={e => setEstoque(e.target.value)} /> </div> 
                                </div>
                            </div>
                            </div>

                            <div className="input-bottom">
                                <div className="agp-input">
                                <div class="class-student"> Link imagem: </div>  
                                <div class="input"> <input  value={imagem} onChange={e => setImagem(e.target.value)} /> </div>  </div>
                            </div>
                            <div className="textearea">
                                <div className="agp-input">
                                <div class="class-student"> Descrição: </div>  
                                <div class="input"> <textarea  value={descricao} onChange={e => setDescricao(e.target.value)} /> </div>  </div>
                            </div> 

                            
                                    
                            <div class="button-create"> <button onClick={inserir}> {idAlt == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                       
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrado </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th>  </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                            <tbody>

                                {produtos.map((item, i) =>
                                    <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                        <td> <img src={item.img_produto} alt="" style={{width: '40px', height: '40px'}}/> </td>
                                        <td> {item.id_produto} </td>
                                        <td title={item.nm_produto}> {item.nm_produto != null && item.nm_produto.length >= 25 ? item.nm_produto.substr(0, 25) + '...' : item.nm_produto} </td>
                                        <td> {item.ds_categoria} </td>
                                        <td> {item.vl_preco_por} </td>
                                        <td> {item.qtd_estoque} </td>
                                        <td className='coluna-acao'> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                        <td className='coluna-acao'> <button onClick={() => remover(item.id_produto)} > <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                    </tr>
                                    )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
