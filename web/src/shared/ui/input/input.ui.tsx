import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return <StyledInput {...props} />
}

const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 16px;
  border: 0.5px solid #DFDFDF;
  background: var(--light-gray, #F7F7F7);
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #8E8E93;
  }

`;