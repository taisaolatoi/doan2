import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FolderOutlined,
  TagOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Quản lí sản phẩm',
    children: [
      { key: '1.1', label: 'Thêm sản phẩm', icon: <FolderOutlined />, path: '/admin/addproduct' },
      { key: '1.2', label: 'Thông tin sản phẩm', icon: <FolderOutlined />, path: '/admin/UIproduct' },
      { key: '1.3', label: 'Thương hiệu', icon: <TagOutlined />, path: '/admin/brands' },
    ],
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: 'Quản lí người dùng',
    children: [
      { key: '2.1', label: 'Cấp tài khoản', icon: <FolderOutlined />, path: '/admin/createaccount' },
    ],
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: 'Quản lí đơn hàng',
    children: [
      { key: '3.1', label: 'Danh sách đơn hàng', icon: <FolderOutlined />, path: '/admin/orders' },
    ],
  },
  {
    key: '4',
    icon: <MessageOutlined />,
    label: 'Quản lí bình luận',
    children: [
      { key: '4.1', label: 'Danh sách bình luận', icon: <FolderOutlined />, path: '/admin/comment' },
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = findItemByKey(items, key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const findItemByKey = (menuItems: MenuItem[], key: string): MenuItem | undefined => {
    for (let item of menuItems) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const foundItem = findItemByKey(item.children, key);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return undefined;
  };

  return (
    <div style={{ width: 245 }}>
      <Button type="primary" onClick={toggleCollapsed} >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1.1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default App;