import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { query, location } = req.body

  if (!query || !location) {
    return res.status(400).json({ error: 'Informe a consulta e a localização' })
  }

  try {
    // 1. Monta a URL de pesquisa no Google Maps
    const searchTerm = `${query} ${location}`
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`

    // 2. Faz a requisição para a Bright Data
    const response = await axios.post(
      'https://api.brightdata.com/request',
      {
        zone: 'serp_api1',          // Usando a zona SERP (que já temos)
        url: mapsUrl,
        format: 'raw',
        data_format: 'html'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BRIGHT_DATA_API_KEY}`
        },
        timeout: 30000 // 30 segundos
      }
    )

    // 3. O HTML retornado está em response.data
    const html = response.data

    // 4. Parsear o HTML para extrair nome, telefone e endereço
    // ATENÇÃO: O parsing do Google Maps é complexo e pode quebrar.
    // Vamos usar expressões regulares para capturar padrões comuns.
    // (Em produção, o ideal seria usar cheerio, mas não vamos instalar dependências extras agora)

    const leads = []

    // Padrões para capturar informações (simplificados)
    // Nome: geralmente está em uma tag com classe "fontHeadlineSmall" ou similar
    // Telefone: padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    // Endereço: geralmente após "Endereço" ou em uma tag com classe "section-info"

    // Exemplo de regex para telefone:
    const phoneRegex = /\((\d{2})\)\s*(\d{4,5})-(\d{4})/g

    // Como o HTML é grande, vamos dividir em blocos de resultados
    // Cada resultado geralmente está dentro de uma div com classe "section-result" ou "Nv2PK"
    // Vamos usar um método mais simples: procurar por padrões no HTML

    // Extrair todos os blocos de resultados (usando uma separação comum)
    const resultBlocks = html.split(/<div[^>]*class="[^"]*(?:section-result|Nv2PK|bfdHYd)[^"]*"[^>]*>/i)

    // Ignorar o primeiro bloco (que é o cabeçalho)
    for (let i = 1; i < resultBlocks.length; i++) {
      const block = resultBlocks[i]

      // Extrair nome (geralmente dentro de <h3> ou <span> com classe específica)
      const nameMatch = block.match(/(?:<h3[^>]*>|<span[^>]*class="[^"]*fontHeadlineSmall[^"]*"[^>]*>)([^<]+)<\/h3>|<\/span>/i)
      const nome = nameMatch ? nameMatch[1].trim() : 'Nome não encontrado'

      // Extrair endereço (geralmente após a classe "section-result-location" ou similar)
      const addressMatch = block.match(/(?:<span[^>]*class="[^"]*section-result-location[^"]*"[^>]*>|<div[^>]*class="[^"]*W4Efsd[^"]*"[^>]*>)([^<]+)<\/span>|<\/div>/i)
      const endereco = addressMatch ? addressMatch[1].trim() : 'Endereço não encontrado'

      // Extrair telefone: procurar por padrão de telefone no bloco
      const phoneMatch = block.match(/(?:\(?\d{2}\)?\s*\d{4,5}-\d{4})/)
      const telefone = phoneMatch ? phoneMatch[0] : ''

      // Se encontrou pelo menos nome e telefone, adiciona
      if (nome !== 'Nome não encontrado' && telefone) {
        leads.push({
          nome,
          telefone,
          endereco,
          status: 'Novo'
        })
      }

      // Limite de 10 leads para não sobrecarregar
      if (leads.length >= 10) break
    }

    // Se não encontrou nenhum lead, retorna uma mensagem amigável
    if (leads.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'Nenhum lead encontrado. Tente uma busca diferente ou verifique sua chave Bright Data.'
      })
    }

    return res.status(200).json({ success: true, leads })

  } catch (error) {
    console.error('Erro na busca Bright Data:', error.message)
    return res.status(500).json({
      error: 'Erro ao buscar leads no Google Maps. Verifique sua chave API e os créditos disponíveis.'
    })
  }
}
