import { Col, Badge, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperTextHeaderSmall, WrapperContentPopup } from './style'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import *as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slide/userSlide'
//import ButtonComponent from '../ButtonComponent/ButtonComponent'
import Loading from '../LoadingComponent/Loading'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCard = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const dispatch = useDispatch()
  const [isPending, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    localStorage.clear();
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      
      <WrapperContentPopup onClick={() => { navigate('/profile-user') }}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => { navigate('/system/admin') }}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  )

  return (
    <div >
      <WrapperHeader style ={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
        <Col span={6}>
          <WrapperTextHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>THEGIOIDIENTU</WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col span={11} >
            <ButtonInputSearch
              textButton="Tìm kiếm"
              placeholder="input search text"
              size="large"
              bordered={false}
            //onSearch={onSearch}
            />

          </Col>
        )}


        <Col span={9} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending={isPending}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" >
                    <div style={{ cursor: 'pointer' }}>{userName?.name ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>

                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>

          {!isHiddenCard && (
            <div>
              <Badge count={4} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent