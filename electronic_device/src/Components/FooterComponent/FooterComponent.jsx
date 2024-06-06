import React from 'react';
import { FacebookOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { FooterContainer, FooterRow, FooterCol } from './style';

const FooterComponent = () => {
    return (
        <FooterContainer>
            <FooterRow style={{ textAlign: 'center' }}>
                <FooterCol span={8}>
                    <h3>About</h3>
                    <p>Thông tin về chúng tôi</p>
                </FooterCol>
                <FooterCol span={8}>
                    <h3>Hỗ trợ</h3>
                    <p>Khiếu nại: 0932878897</p>
                    <p>Email: haob2105608@student.ctu.edu.vn</p>
                </FooterCol>
                <FooterCol span={8}>
                    <h3>Chính sách</h3>
                    <p>Chính sách bảo mật</p>
                </FooterCol>
            </FooterRow>
            <div style={{ borderTop: '1px solid #fff', margin: '20px 0' }}></div>
            <FooterRow style={{ textAlign: 'center', marginTop: '20px' }}>
                <FooterCol span={8}>
                    <h3 style={{ display: 'inline-block', marginRight: '10px' }} >Kết nối với chúng tôi</h3>
                    <FacebookOutlined style={{ fontSize: '24px', verticalAlign: 'middle', color: '#1877f2', marginRight: '10px' }} />
                    <UsergroupAddOutlined style={{ fontSize: '24px', verticalAlign: 'middle', color: '#1877f2' }} />
                </FooterCol>
            </FooterRow>
        </FooterContainer>
    );
};

export default FooterComponent;
