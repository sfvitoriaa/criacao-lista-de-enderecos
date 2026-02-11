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
  const [list, setList] = useState<Address[]>([]);
  const [msg, setMsg] = useState('');
  
  const [form, setForm] = useState({
    cep: '', street: '', number: '', neighborhood: '', city: '', state: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('db_addr');
    if (saved) setList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('db_addr', JSON.stringify(list));
  }, [list]);

  const download = () => {
    if (list.length === 0) return;
    const data = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(list, null, 2))}`;
    const a = document.createElement("a");
    a.href = data;
    a.download = "backup.json";
    a.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cep || !form.street) {
      setMsg('Preencha os dados.');
      return;
    }
    setList([...list, { ...form, id: Date.now().toString() }]);
    setMsg('Salvo.');
    setForm({ cep: '', street: '', number: '', neighborhood: '', city: '', state: '' });
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <div>
      <h1>Endereços</h1>
      
      <button onClick={download} className="btn-backup">Baixar Backup</button>

      <form onSubmit={save}>
        <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" maxLength={8} />
        <input name="street" value={form.street} onChange={handleChange} placeholder="Rua" />
        <input name="number" value={form.number} onChange={handleChange} placeholder="Número" type="number" />
        <input name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="Bairro" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Cidade" />
        
        <select name="state" value={form.state} onChange={handleChange}>
          <option value="">UF</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
          <option value="RS">RS</option>
        </select>

        <button type="submit">Salvar</button>
      </form>

      {msg && <div className="msg">{msg}</div>}

      <table>
        <tbody>
          {list.map(i => (
            <tr key={i.id}>
              <td>{i.cep}</td>
              <td>{i.street}, {i.number}</td>
              <td style={{textAlign: 'right'}}>{i.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;