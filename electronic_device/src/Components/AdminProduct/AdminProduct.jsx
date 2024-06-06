import React, { useEffect, useState } from 'react'
import { WrapperHeader } from './style'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from './style'
import { getBase64 } from '../../util'
import * as  ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationhook'
import *as message from '../../Components/Message/Message'



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fileList, setFileList] = useState([])
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
    })

    const mutation = useMutationHooks(
        (data) => {
            const {
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock: countInStock } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
            })
            return res
        }
    )

    const { data, isSuccess, isError } = mutation
    console.log('data ', data)
    useEffect(() => {
        if (isSuccess && data?.status === 'Ok') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        })
    }

    const onFinish = () => {
        mutation.mutate(stateProduct)
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file ? file.preview : null,
        });
        setFileList(fileList);
    };


    return (
        <div>
            <WrapperHeader> Quản lý sản phẩm </WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusSquareOutlined style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent />
            </div>

            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} >
                <Form
                    name="basic"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name of product!', }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input type of product!', }]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="Count InStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input CountInStock of product!', }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input price of product!', }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input rating of product!', }]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description of product!', }]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input image of product!', }]}
                    >
                        <WrapperUploadFile fileList={fileList}
                            onChange={handleOnchangeAvatar}
                            maxCount={1}>
                            <Button>Chọn tệp</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                    objectFit: 'cover',
                                }} alt="image" />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16, }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default AdminProduct
