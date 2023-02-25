import { SectionInput, Textarea } from '../styled'

const InputArea = ({ text, setText, disabled }) => {
  return (
    <SectionInput>
      <Textarea
        disabled={disabled}
        onChange={(x) => {
          setText(x.target.value)
        }}
        defaultValue={text}
      />
    </SectionInput>
  )
}

export default InputArea
