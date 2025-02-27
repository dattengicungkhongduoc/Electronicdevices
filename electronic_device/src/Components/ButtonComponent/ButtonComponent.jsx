import React from 'react'
import { Button } from 'antd'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    console.log(styleButton);
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc': styleButton.background
            }}
            size={size}
            {...rests} >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}

export default ButtonComponent
