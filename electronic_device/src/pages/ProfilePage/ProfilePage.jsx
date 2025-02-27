import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputFormComponent from '../../Components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import *as UserService from '../../services/UserService'
import *as message from '../../Components/Message/Message'
import { useMutationHooks } from '../../hooks/useMutationhook'
import { updateUser } from '../../redux/slide/userSlide'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../util'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [fileList, setFileList] = useState([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const { isSuccess, isError } = mutation
    const dispatch = useDispatch()
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handlegetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])
    const handlegetDetailsUser = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token)
        dispatch(updateUser({ ...res?.data, access_token: access_token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangePhone = (value) => {
        setPhone(value)
    }

    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        if (file) {
            setAvatar(file.preview);
        } else {
            setAvatar('');
        }
        setFileList(fileList);
    };


    const handleUpdate = () => {
        console.log("id " + user?.id);
        console.log("token " + user?.access_token);
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })

    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Name:</WrapperLabel>
                    <InputFormComponent style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Email:</WrapperLabel>
                    <InputFormComponent style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone:</WrapperLabel>
                    <InputFormComponent style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address:</WrapperLabel>
                    <InputFormComponent style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar:</WrapperLabel>
                    <WrapperUploadFile fileList={fileList}
                        onChange={handleOnchangeAvatar}
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Chọn tệp</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img src={avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }} alt="avatar" />
                    )}
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage
