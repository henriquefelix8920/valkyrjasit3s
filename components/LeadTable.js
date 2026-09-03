import { useState } from 'react'

export default function LeadTable({ leads, onStatusChange }) {
  const [search, setSearch] = useState('')

  const filtered = leads.filter(lead => 
    lead.nome.toLowerCase().includes(search.toLowerCase()) ||
    lead.telefone.includes(search)
  )

  const getStatusColor = (status) => {
    const colors = {
      'Novo': '#00f0ff',
      'Contatado': '#f0a500',
      'Aceitou': '#b026ff',
      'Fechou': '#00ff88'
    }
    return colors[status] || '#888'
  }

  return (
    <div className="neon-card" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(0,240,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: '#00f0ff' }}>📋 LEADS CAPTURADOS</span>
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,240,255,0.2)',
            borderRadius: '4px',
            padding: '6px 12px',
            color: '#e0e0ff',
            fontSize: '0.8rem',
            width: '250px'
          }}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead style={{ background: 'rgba(0,240,255,0.05)' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>NOME</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>TELEFONE</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>ENDEREÇO</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', color: '#888', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>STATUS</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', color: '#888', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(0,240,255,0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{lead.nome}</td>
                <td style={{ padding: '12px 16px', color: '#00f0ff' }}>{lead.telefone}</td>
                <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#aaa' }}>{lead.endereco}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <span style={{ 
                    background: `rgba(${getStatusColor(lead.status) === '#00f0ff' ? '0,240,255' : getStatusColor(lead.status) === '#f0a500' ? '240,165,0' : getStatusColor(lead.status) === '#b026ff' ? '176,38,255' : '0,255,136'}, 0.15)`,
                    color: getStatusColor(lead.status),
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontFamily: 'Orbitron'
                  }}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                      className="btn-neon" 
                      style={{ fontSize: '0.55rem', padding: '4px 10px' }}
                      onClick={() => window.open(`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`, '_blank')}
                    >
                      💬 Whats
                    </button>
                    <button 
                      className="btn-neon btn-neon-purple" 
                      style={{ fontSize: '0.55rem', padding: '4px 10px' }}
                      onClick={() => onStatusChange(idx, 'Contatado')}
                    >
                      Contatar
                    </button>
                    <button 
                      className="btn-neon btn-neon-purple" 
                      style={{ fontSize: '0.55rem', padding: '4px 10px' }}
                      onClick={() => onStatusChange(idx, 'Aceitou')}
                    >
                      Aceitou
                    </button>
                    <button 
                      className="btn-neon" 
                      style={{ fontSize: '0.55rem', padding: '4px 10px', borderColor: '#00ff88', color: '#00ff88' }}
                      onClick={() => {
                        const valor = prompt('Digite o valor do site fechado (ex: 1500):')
                        if (valor) {
                          onStatusChange(idx, 'Fechou', parseFloat(valor))
                        }
                      }}
                    >
                      💰 Fechou
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
