const orders = [
  {
    number: '001',
    provider: 'Arthur',
    tags: 'pedido CE28p;pedidoMF75P2',
    observation: 'deu certo',
    delivery: '2022-03-28T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Alana',
    approved: 'Sim'
  },
  {
    number: '002',
    provider: 'Alana',
    tags: 'pedido CE26p',
    observation: 'Não deu certo',
    delivery: '2022-03-29T16:37:45.333Z',
    status: 'Aguardando envio ao fornecedor',
    buyer: 'Kevin',
    approved: 'Não'
  },
  {
    number: '003',
    provider: 'Arthur',
    tags: 'pedido CE27p',
    observation: 'Deu certo',
    delivery: '2022-03-30T16:37:45.333Z',
    status: 'Aguardando confirmação',
    buyer: 'Alana',
    approved: 'Sim'
  },
  {
    number: '004',
    provider: 'Kevin',
    tags: 'pedido CE28p',
    observation:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    delivery: '2022-03-31T16:37:45.333Z',
    status: 'Confirmado',
    buyer: 'Bruna',
    approved: 'Não'
  },
  {
    number: '005',
    provider: 'Bruna',
    tags: 'pedido CE29p',
    observation: 'Não deu certo',
    delivery: '2022-04-01T16:37:45.333Z',
    status: 'Atrasado',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '006',
    provider: 'Isabela',
    tags: 'pedido CE29p',
    observation: 'Não deu certo',
    delivery: '2022-04-02T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '007',
    provider: 'Gustavo',
    tags: 'pedido CE29p',
    observation: 'Não deu certo',
    delivery: '2022-04-03T16:37:45.333Z',
    status: 'Aguardando envio ao fornecedor',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '008',
    provider: 'Ana Laura',
    tags: 'pedido CE30p',
    observation: 'Não deu certo',
    delivery: '2022-04-04T16:37:45.333Z',
    status: 'Aguardando confirmação',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '009',
    provider: 'Maria Laura',
    tags: 'pedido CE30p',
    observation: 'Deu certo',
    delivery: '2022-04-05T16:37:45.333Z',
    status: 'Confirmado',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '010',
    provider: 'Maria Laura',
    tags: 'pedido CE31p',
    observation: 'Tá quase dando certo',
    delivery: '2022-04-06T16:37:45.333Z',
    status: 'Atrasado',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '011',
    provider: 'Bruno',
    tags: 'pedido CE32p',
    observation: 'Deu certo',
    delivery: '2022-04-07T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Arthur',
    approved: 'Sim'
  },
  {
    number: '012',
    provider: 'Bruna',
    tags: 'pedido CE33p',
    observation: 'Não deu certo',
    delivery: '2022-04-08T16:37:45.333Z',
    status: 'Aguardando envio ao fornecedor',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '013',
    provider: 'Bruno',
    tags: 'pedido CE34p',
    observation: 'Deu certo',
    delivery: '2022-04-09T16:37:45.333Z',
    status: 'Aguardando confirmação',
    buyer: 'Kevin',
    approved: 'Não'
  },
  {
    number: '014',
    provider: 'Kevin',
    tags: 'pedido CE35p',
    observation: 'Deu certo',
    delivery: '2022-04-10T16:37:45.333Z',
    status: 'Confirmado',
    buyer: 'Ronaldo',
    approved: 'Sim'
  },
  {
    number: '015',
    provider: 'Bruno',
    tags: 'pedido CE34p',
    observation: 'Não deu certo',
    delivery: '2022-04-11T16:37:45.333Z',
    status: 'Atrasado',
    buyer: 'Gustavo',
    approved: 'Sim'
  },
  {
    number: '016',
    provider: 'Arthur',
    tags: 'pedido CE34p',
    observation: 'Alguma coisa esta errada',
    delivery: '2022-04-12T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Alana',
    approved: 'Sim'
  }
]
export default orders
