import { SideNavBar } from "./SideBar"

export const Layout = ({ children }) => {
  return <SideNavBar>
    {children}
  </SideNavBar>
}