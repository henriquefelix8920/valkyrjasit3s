import { useState } from 'react'

export default function GeneratePromptModal({ lead, onClose }) {
  const [segmento, setSegmento] = useState(lead?.segmento || '')
  const [diferencial, setDiferencial] = useState('')
  const [imagens, setImagens] = useState('')
  const [promptGerado, setPromptGerado] = useState('')

  const gerarPrompt = () => {
    const nome = lead?.nome || 'Cliente'
    const telefone = lead?.telefone || ''
    const endereco = lead?.endereco || ''

    const prompt = `**INSTRUÇÕES PARA CRIAÇÃO DE SITE PROFISSIONAL**

1. **CURADORIA PRÉVIA:**
Antes de codificar, pesquise mentalmente os 5 maiores sites de ${segmento || 'advogados'} do Brasil. Liste características visuais comuns: paleta de cores, estrutura de navegação, disposição de seções (depoimentos, equipe, contato), tipografia. Extraia a essência do que torna um site desse segmento confiável e premium.

2. **CONSTRUÇÃO:**
Com base nessa curadoria, crie um site moderno utilizando componentes de alto nível (shadcn/ui ou similares) com as seguintes diretrizes:
- Cores sólidas e elegantes (evite gradientes chamativos)
- Espaçamento amplo (padding/margin generosos)
- Fontes clássicas (Inter, Roboto ou Playfair Display para títulos)
- Evite bordas arredondadas exageradas e animações desnecessárias

3. **CONTEÚDO DO SITE:**
- Nome: ${nome}
- Telefone: ${telefone}
- Endereço: ${endereco}
- Segmento: ${segmento}
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

    setPromptGerado(prompt)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="neon-card" style={{
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        borderRadius: '12px',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#00f0ff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            fontFamily: 'Orbitron'
          }}
        >
          ✕
        </button>

        <h2 className="glow-text" style={{ fontSize: '1.3rem', marginBottom: '24px', color: '#00f0ff' }}>
          ⚔️ GERAR SITE PARA {lead?.nome?.toUpperCase()}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>SEGMENTO</label>
            <input
              type="text"
              value={segmento}
              onChange={(e) => setSegmento(e.target.value)}
              placeholder="Ex: Advogado Trabalhista"
              style={{
                width: '100%',
                padding: '10px',
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
                padding: '10px',
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
                padding: '10px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '4px',
                color: '#e0e0ff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button className="btn-neon" onClick={gerarPrompt} style={{ padding: '12px', fontSize: '0.9rem' }}>
            ⚡ GERAR PROMPT
          </button>

          {promptGerado && (
            <div>
              <label style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'Orbitron', display: 'block', marginBottom: '4px' }}>PROMPT PRONTO (Copie e cole no DeepSeek Expert)</label>
              <textarea
                value={promptGerado}
                readOnly
                rows={12}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(176,38,255,0.3)',
                  borderRadius: '4px',
                  color: '#b026ff',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  resize: 'vertical'
                }}
              />
              <button
                className="btn-neon btn-neon-purple"
                onClick={() => navigator.clipboard.writeText(promptGerado)}
                style={{ marginTop: '8px', padding: '8px 16px', fontSize: '0.7rem' }}
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
