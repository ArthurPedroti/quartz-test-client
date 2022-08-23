import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine
} from 'react-icons/ri'

const sidebarMock = [
  {
    section: 'GERAL',
    menus: [
      {
        title: 'Pedidos',
        link: '/purchases',
        icon: RiDashboardLine
      },
      {
        title: 'Usuários',
        link: '/users',
        icon: RiContactsLine
      }
    ]
  },
  {
    section: 'COMPRAS',
    menus: [
      {
        title: 'Aprovações',
        link: '/approvals',
        icon: RiInputMethodLine
      },
      {
        title: 'Cancelamento',
        link: '/cancel',
        icon: RiGitMergeLine
      },
      {
        title: 'Solicitações',
        link: '/requests',
        icon: RiDashboardLine
      }
    ]
  }
]

export default sidebarMock
