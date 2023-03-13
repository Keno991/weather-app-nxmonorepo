import { ConfigProvider, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React from 'react';
import Weather from './components/Weather/Weather';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content>
      <Weather />
    </Content>
    <Footer style={{ textAlign: 'center' }}>WhatsWether by Keno</Footer>
  </Layout>
  </ConfigProvider>
);

export default App;