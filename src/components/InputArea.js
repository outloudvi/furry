import { SectionInput, Textarea } from '../styled'

const getLineNumber = (position, text) => {
  return text.slice(0, position).split('\n').length
}

const InputArea = ({ text, setText, disabled, setHilightArea }) => {
  const onSelect = (e) => {
    const selStart = e.target.selectionStart
    const selEnd = e.target.selectionEnd
    setHilightArea([getLineNumber(selStart, text), getLineNumber(selEnd, text)])
  }

  return (
    <SectionInput>
      <Textarea
        disabled={disabled}
        onChange={(x) => {
          setText(x.target.value)
        }}
        onSelect={onSelect}
        defaultValue={text}
      />
    </SectionInput>
  )
}

export default InputArea
