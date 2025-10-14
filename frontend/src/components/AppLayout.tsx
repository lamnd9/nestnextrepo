'use client';

import React from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';

const { Content, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ 
        padding: '0', 
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {children}
      </Content>
      <Footer style={{ 
        textAlign: 'center', 
        backgroundColor: '#fff',
        borderTop: '1px solid #f0f0f0'
      }}>
        English with CiCi ©{new Date().getFullYear()} Created with ❤️
      </Footer>
    </Layout>
  );
};

export default AppLayout;