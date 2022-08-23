import { Stack } from '@chakra-ui/react'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'
import { IconType } from 'react-icons/lib'

export type SidebarNavProps = {
  menuItems: MenuItem[]
}

export type MenuItem = {
  section: string
  menus: {
    title: string
    link: string
    icon: IconType
  }[]
}

const SidebarNav = ({ menuItems }: SidebarNavProps) => {
  return (
    <Stack spacing="12" align="flex-start">
      {menuItems.map((menuItem) => (
        <NavSection title={menuItem.section} key={menuItem.section}>
          {menuItem.menus.map((menu) => (
            <NavLink
              _hover={{ color: 'yellow.400' }}
              key={menu.link}
              icon={menu.icon}
              href={menu.link}
            >
              {menu.title}
            </NavLink>
          ))}
        </NavSection>
      ))}
    </Stack>
  )
}

export default SidebarNav
