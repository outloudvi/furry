import { Modes } from '../modes'

const ModeSettings = ({ mode, setMode }) => {
  return (
    <button
      onClick={() => {
        setMode((index) => {
          return index + 1 === Modes.length ? 0 : index + 1
        })
      }}
    >
      {Modes[mode]}
    </button>
  )
}

export default ModeSettings
