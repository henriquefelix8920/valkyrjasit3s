import Header from 'react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [segmento, setSegmento] = useState('')
  const [diferencial, setDiferencial] = useState('')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [imagens, setImagens] = useState('')
  const [prompt, setPrompt] = useState('')

  const gerarPrompt = () => {
    const texto = `**INSTRUÇÕES PARA CRIAÇÃO DE SITE PROFISSIONAL**

1. **CURADORIA PRÉVIA:**
Antes de codificar, pesquise mentalmente os 5 maiores sites de ${segmento || 'advogados'} do Brasil. Liste características visuais comuns: paleta de cores, estrutura de navegação, disposição de seções (depoimentos, equipe, contato), tipografia. Extraia a essência do que torna um site desse segmento confiável e premium.

2. **CONSTRUÇÃO:**
Com base nessa curadoria, crie um site moderno utilizando componentes de alto nível (shadcn/ui ou similares) com as seguintes diretrizes:
- Cores sólidas e elegantes (evite gradientes chamativos)
- Espaçamento amplo (padding/margin generosos)
- Fontes clássicas (Inter, Roboto ou Playfair Display para títulos)
- Evite bordas arredondadas exageradas e animações desnecessárias

3. **CONTEÚDO DO SITE:**
- Nome: ${nome || 'Cliente'}
- Telefone: ${telefone || 'Não informado'}
- Endereço: ${endereco || 'Não informado'}
- Segmento: ${segmento || 'Não informado'}
- Diferencial: ${diferencial || 'Não informado'}

4. **IMAGENS:**
${imagens ? `Utilize as seguintes imagens como referência: ${imagens}` : 'Use imagens genéricas do Unsplash com temática relacionada ao segmento.'}

5. **ESTRUTURA MÍNIMA:**
- Hero Section (com chamada principal)
- Sobre / Diferenciais
- Serviços (3 a 4 itens)
- Depoimentos (fictícios, mas realistas)
- Rodapé com endereço, telefone e redes sociais

6. **ENTREGA FINAL:**
Gere o código HTML completo em um único arquivo, pronto para ser hospedado no GitHub Pages ou similar.`

    setPrompt(texto)
  }

  return (
    <div style={{ padding: '0 32px 60px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Header />
      
      <div className="neon-card" style={{ padding: '32px', borderRadius: '8px', marginTop: '32px' }}>
        <h2 className="glow-text" style={{ fontSize: '1.5rem', color: '#00f0ff', marginBottom: '24px' }}>
          ⚔️ GERADOR DE PROMPT
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>NOME DO CLIENTE</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Dra. Maria Silva"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>SEGMENTO</label>
            <input
              type="text"
              value={segmento}
              onChange={(e) => setSegmento(e.target.value)}
              placeholder="Ex: Advogado Trabalhista, Dentista, Imobiliária..."
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>DIFERENCIAL</label>
            <input
              type="text"
              value={diferencial}
              onChange={(e) => setDiferencial(e.target.value)}
              placeholder="Ex: 20 anos de experiência, especialista em..."
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>ENDEREÇO</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Ex: Av. Paulista, 1000, São Paulo - SP"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>TELEFONE</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Ex: (11) 99999-9999"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>IMAGENS (URLs separadas por vírgula)</label>
            <input
              type="text"
              value={imagens}
              onChange={(e) => setImagens(e.target.value)}
              placeholder="https://instagram.com/foto1, https://instagram.com/foto2"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button className="btn-neon" onClick={gerarPrompt} style={{ padding: '16px', fontSize: '1.1rem', marginTop: '8px' }}>
            ⚡ GERAR PROMPT
          </button>

          {prompt && (
            <div style={{ marginTop: '24px' }}>
              <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '8px' }}>
                📋 PROMPT PRONTO (Copie e cole no DeepSeek Expert)
              </label>
              <textarea
                value={prompt}
                readOnly
                rows={15}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(176,38,255,0.3)',
                  borderRadius: '4px',
                  color: '#b026ff',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  resize: 'vertical',
                  lineHeight: '1.6'
                }}
              />
              <button
                className="btn-neon btn-neon-purple"
                onClick={() => {
                  navigator.clipboard.writeText(prompt)
                  alert('✅ Prompt copiado para a área de transferência!')
                }}
                style={{ marginTop: '12px', padding: '12px 24px', fontSize: '0.9rem' }}
              >
                📋 COPIAR PROMPT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
