'use client';

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Badge,
  Drawer,
} from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  TrophyOutlined,
  UserOutlined,
  BellOutlined,
  MenuOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Menu items for desktop
  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'lessons',
      icon: <BookOutlined />,
      label: 'Lessons',
      children: [
        { key: 'beginner', label: 'Beginner' },
        { key: 'intermediate', label: 'Intermediate' },
        { key: 'advanced', label: 'Advanced' },
      ],
    },
    {
      key: 'achievements',
      icon: <TrophyOutlined />,
      label: 'Achievements',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
  ];

  // Dropdown menu for user avatar
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'My Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('Menu clicked:', e.key);
  };

  const handleUserMenuClick: MenuProps['onClick'] = (e) => {
    console.log('User menu clicked:', e.key);
  };

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginRight: 'auto',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1677ff'
      }}>
        <BookOutlined style={{ marginRight: '8px', fontSize: '24px' }} />
        English with CiCi
      </div>

      {/* Desktop Menu */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <div className="hidden md:block">
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              minWidth: '400px',
              justifyContent: 'center',
            }}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <Space size="middle">
        {/* Notifications */}
        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: '18px' }} />}
            size="large"
          />
        </Badge>

        {/* User Avatar */}
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Avatar
            style={{ 
              backgroundColor: '#1677ff', 
              cursor: 'pointer',
              border: '2px solid #f0f0f0'
            }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          size="large"
          className="block md:hidden"
        />
      </Space>

      {/* Mobile Drawer */}
      <Drawer
        title="English with CiCi"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={(e) => {
            handleMenuClick(e);
            setDrawerVisible(false);
          }}
          style={{ border: 'none' }}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;