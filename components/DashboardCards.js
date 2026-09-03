export default function DashboardCards({ total, contatados, aceitaram, fechados, faturamento }) {
  const cards = [
    { label: 'TOTAL LEADS', value: total, color: '#00f0ff' },
    { label: 'CONTATADOS', value: contatados, color: '#00f0ff', opacity: 0.7 },
    { label: 'ACEITARAM', value: aceitaram, color: '#b026ff' },
    { label: 'FECHADOS', value: fechados, color: '#b026ff', opacity: 0.7 },
    { label: 'FATURAMENTO', value: `R$ ${faturamento.toFixed(2)}`, color: '#00f0ff' }
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      {cards.map((card, index) => (
        <div key={index} className="neon-card" style={{ padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', fontFamily: 'Orbitron', color: card.color, opacity: 0.6, letterSpacing: '1px' }}>
            {card.label}
          </div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Orbitron', fontWeight: 900, color: card.color, textShadow: `0 0 20px ${card.color}30` }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
