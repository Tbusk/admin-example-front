import React from 'react';
import UsersView from "./views/UsersView";
import Login from "./views/LoginView";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import {DrawerToggle} from "@hilla/react-components/DrawerToggle";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {Icon} from "@hilla/react-components/Icon";
import {AppLayout} from "@hilla/react-components/AppLayout";
import Dashboard from "./views/DashboardView";

const h1Style = {
    fontSize: 'var(--lumo-font-size-l)',
    margin: 0
};

const iconStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    marginInlineEnd: 'var(--lumo-space-m)',
    marginInlineStart: 'var(--lumo-space-s)',
    padding: 'var(--lumo-space-s)',
    textDecoration: 'none',
    fontSize: '24px'
}


export default function App() {

  return (
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="Users" element={<UsersView />} />
                  <Route path="Login" element={<Login />} />

              </Route>
          </Routes>
  );
}

function Layout() {
    return (
        <AppLayout>
            <DrawerToggle slot="navbar"></DrawerToggle>
            <h1 slot="navbar" style={h1Style}>
                MyApp
            </h1>
            <Tabs slot="drawer" orientation="vertical" selected={1}>
                <Tab className="tab" tabIndex={-1}>
                    <Icon icon="vaadin:dashboard" style={iconStyle} />
                    <Link to="/">Dashboard</Link>
                </Tab>

                <Tab className="tab" tabIndex={-1}>
                    <Icon icon="vaadin:users" style={iconStyle} />
                    <Link to="/users">Users</Link>
                </Tab>

                <Tab className="tab" tabIndex={-1}>
                    <Icon icon="vaadin:shield" style={iconStyle} />
                    <Link to="/login">Login</Link>
                </Tab>
            </Tabs>
            <Outlet />
        </AppLayout>
    );
}

