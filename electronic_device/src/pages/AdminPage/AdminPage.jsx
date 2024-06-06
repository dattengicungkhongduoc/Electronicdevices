import React, { useState } from 'react'
import { ProductOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';
import AdminUser from '../../Components/AdminUser/AdminUser';
import AdminProduct from '../../Components/AdminProduct/AdminProduct';


const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

const AdminPage = () => {
    
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <ProductOutlined />),
    ];



    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) =>{
        switch(key) {
            case 'user': return (
                <AdminUser/>
            )
            case 'product': return (
                <AdminProduct/>
            )

            default: return <></>
        }
    }


    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCard />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    onClick={handleOnClick}
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh',
                    }}
                    items={items}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
