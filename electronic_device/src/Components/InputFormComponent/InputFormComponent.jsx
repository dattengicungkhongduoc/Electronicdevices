
import React from 'react'
import { WrapperInputStyle} from './style'


const InputFormComponent = (props) => {
    //const [valueInput] = useState('')          //, setValueInput
    const {placeholder= 'Nhập text ',...rests} = props
    const handleOnchangeInput =(e) => {
      props.onChange(e.target.value)
    }
  return (
    <div>
      <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} /> 
      
    </div>
  )
}

export default InputFormComponent
