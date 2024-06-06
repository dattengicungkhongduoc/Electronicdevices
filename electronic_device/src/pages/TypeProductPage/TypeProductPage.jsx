import React from 'react'
import CardComponent from '../../Components/CardComponent/CardComponent'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperProducts, WrapperNavbar } from './style'


const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ width:'100%', padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', margin:'0 auto' }}>

                <WrapperNavbar span={4} >
                    <NavbarComponent />
                </WrapperNavbar>
                <Col span={20}>
                    <WrapperProducts >
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination
                        defaultCurrent={2}
                        total={100}
                        onChange={onChange}
                        style={{ textAlign: 'center', marginTop: '10px' }}
                    />
                </Col>
            </Row>

        </div>
    )

}

export default TypeProductPage
