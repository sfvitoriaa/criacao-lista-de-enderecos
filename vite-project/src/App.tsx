import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [listaEnderecos, setListaEnderecos] = useState<any[]>([])
  
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    const salvos = localStorage.getItem('minha_lista_enderecos')
    if (salvos) {
      setListaEnderecos(JSON.parse(salvos))
    }
  }, [])

  useEffect(() => {
    if (listaEnderecos.length > 0) {
      localStorage.setItem('minha_lista_enderecos', JSON.stringify(listaEnderecos))
    }
  }, [listaEnderecos])

  function salvarEndereco(evento: any) {
    evento.preventDefault()

    if (!cep || !rua || !numero) {
      alert("Preencha pelo menos CEP, Rua e Número!")
      return
    }

    const novoEndereco = {
      id: Date.now(),
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    }

    setListaEnderecos([...listaEnderecos, novoEndereco])
    
    setCep('')
    setRua('')
    setNumero('')
    setBairro('')
    setCidade('')
    setEstado('')
    
    alert("Endereço salvo com sucesso!")
  }

  function baixarBackup() {
    const dados = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(listaEnderecos))
    const link = document.createElement('a')
    link.href = dados
    link.download = "backup-enderecos.json"
    link.click()
  }

  return (
    <div className="container">
      <h1>Meus Endereços</h1>

      <div className="card">
        <h2>Novo Endereço</h2>
        <form onSubmit={salvarEndereco}>
          <div className="campo">
            <label>CEP:</label>
            <input value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" />
          </div>

          <div className="campo">
            <label>Rua:</label>
            <input value={rua} onChange={e => setRua(e.target.value)} placeholder="Nome da rua" />
          </div>

          <div className="linha-dupla">
            <div className="campo pequeno">
              <label>Número:</label>
              <input value={numero} onChange={e => setNumero(e.target.value)} />
            </div>
            <div className="campo grande">
              <label>Bairro:</label>
              <input value={bairro} onChange={e => setBairro(e.target.value)} />
            </div>
          </div>

          <div className="linha-dupla">
            <div className="campo grande">
              <label>Cidade:</label>
              <input value={cidade} onChange={e => setCidade(e.target.value)} />
            </div>
            <div className="campo pequeno">
              <label>UF:</label>
              <input value={estado} onChange={e => setEstado(e.target.value)} maxLength={2} />
            </div>
          </div>

          <div className="botoes">
            <button type="button" onClick={baixarBackup} className="btn-backup">Baixar Backup</button>
            <button type="submit" className="btn-salvar">Salvar Endereço</button>
          </div>
        </form>
      </div>

      <div className="lista">
        <h3>Endereços Salvos:</h3>
        <ul>
          {listaEnderecos.map((item) => (
            <li key={item.id}>
              <strong>{item.rua}, {item.numero}</strong> <br/>
              {item.bairro} - {item.cidade}/{item.estado} <br/>
              <small>CEP: {item.cep}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}