import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import { uiStore } from 'Frontend/stores/app-store';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './MainLayout.module.css';
import views, { RequiredViewInfoMap } from './views.js';

export default function MenuOnLeftLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AppLayout className="block h-full" primarySection="drawer">
      <header slot="drawer">
        <h1 className="text-l m-0">project_try_hilla</h1>
      </header>
      <header slot="navbar">
        <DrawerToggle />
        <Button
          onClick={async () => {
            await uiStore.logout();
            navigate('/login');
          }}
        >
          Log Out
        </Button>
      </header>
      <Scroller slot="drawer" scroll-direction="vertical">
        <nav>
          {Object.entries(views as RequiredViewInfoMap).map(([path, { icon: pageIcon, title: pageTitle }]) => (
            <Item key={path}>
              <NavLink className={css.navlink} key={path} to={path}>
                <span className={`${pageIcon} nav-item-icon`} slot="prefix" aria-hidden="true"></span>
                {pageTitle}
              </NavLink>
            </Item>
          ))}
        </nav>
      </Scroller>
      <footer slot="drawer" />

      <Outlet />
    </AppLayout>
  );
}
