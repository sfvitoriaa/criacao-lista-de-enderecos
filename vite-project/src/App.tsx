import React, { useState, useEffect } from 'react';
import './App.css';

interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

function App() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  const [formData, setFormData] = useState({
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' | '' }>({ text: '', type: '' });

  useEffect(() => {
    const saved = localStorage.getItem('db_addresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
       localStorage.setItem('db_addresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cep || !formData.street || !formData.number || !formData.city || !formData.state) {
      setMessage({ text: 'Preencha tudo!', type: 'error' });
      return;
    }

    if (formData.cep.length !== 8) {
      setMessage({ text: 'CEP deve ter 8 números', type: 'error' });
      return;
    }

    const newAddress: Address = {
      ...formData,
      id: Date.now().toString()
    };

    setAddresses([...addresses, newAddress]);
    setMessage({ text: 'Salvo com sucesso!', type: 'success' });
    setFormData({ cep: '', street: '', number: '', neighborhood: '', city: '', state: '' });

    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="container">
      <h1>Formulário</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="input-group">
            <label>CEP</label>
            <input 
              name="cep" 
              value={formData.cep} 
              onChange={handleChange} 
              maxLength={8} 
              placeholder="00000000"
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Rua</label>
              <input name="street" value={formData.street} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Número</label>
              <input name="number" type="number" value={formData.number} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Bairro</label>
              <input name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Cidade</label>
              <input name="city" value={formData.city} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Estado</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="MG">MG</option>
              <option value="RS">RS</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="DF">DF</option>
            </select>
          </div>

          <button type="submit">Salvar</button>
        </form>
        
        {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}
      </div>
    </div>
  );
}

export default App;