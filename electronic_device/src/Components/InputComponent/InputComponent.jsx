import React from 'react'
import { Input } from 'antd'

const InputComponent = (size, bordered, style, ...rests) => {
    return (
        <Input
            size={size}
            placeholder={'Input search text'}
            //variant={bordered}
            style={{ style, borderRadius: 0 }}
            {...rests}
        />
    )
}

export default InputComponent