import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputFormComponent from '../../Components/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import ImageLogo from '../../assets/images/logo_login.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import *as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationhook'
import Loading from '../../Components/LoadingComponent/Loading'
//import *as message from '../../Components/Message/Message'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slide/userSlide'

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handlegetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess, navigate])

    const handlegetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }

   
    useEffect(() => {
        const user = localStorage.getItem('access_token')
        if (user) {
            navigate("/")
        }
    },[])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>

                <WrapperContainerLeft>
                    <h1 style={{ fontSize: '24px', fontWeight: '10px' }}> Xin chào</h1>
                    <p style={{ fontSize: '13px' }}>Đăng nhập hoặc tạo tài khoản: </p>
                    <InputFormComponent style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputFormComponent placeholder="password" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p style={{ fontSize: '13px' }}>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight> </p>

                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={ImageLogo} preview={false} alt="image-logo" style={{ borderRadius: '50%', width: '205px', height: '205px' }} />
                    <h4 style={{ fontSize: '13px' }}>Mua sắm tại THEGIOIDIENTU</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage