import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        bordered,
        backgroundColorInput = '#fff',
        backgroundColorButton = '#1677ff',
        colorButton = '#fff'
    } = props

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius: 0 }}
            />

            <ButtonComponent
                size={size}
                icon={<SearchOutlined  style={{ color:colorButton }} />}
                bordered={bordered ? "false" : undefined}
                styleButton={{ background: backgroundColorButton, boder:!bordered && 'none', borderRadius: 0 }} 
                textButton = { textButton}
                styleTextButton= {{color:colorButton}}
            />
        </div>
    )
}

export default ButtonInputSearch
