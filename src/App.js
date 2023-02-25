import React, { useEffect, useState, useRef } from 'react'

import { Header, Main } from './styled'
import ModeSettings from './components/ModeSettings'
import InputArea from './components/InputArea'
import RenderArea from './components/RenderArea'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ModePolicies } from './modes'
import { VAR_MODE, VAR_STRING } from './constants'

function App() {
  const [mode, setMode] = useState(1)
  const [text, setText] = useState('')

  const [ready, setReady] = useState(false)
  const kuroshiro = useRef(new Kuroshiro())
  const [result, setResult] = useState([])
  const [hilightArea, setHilightArea] = useState(null)

  useEffect(() => {
    // Initialize
    if (!kuroshiro.current || kuroshiro.current._analyzer) return
    kuroshiro.current
      .init(new KuromojiAnalyzer({ dictPath: 'dict/' }))
      .then(() => {
        setReady(true)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    // Read settings from localStorage
    try {
      const _mode = localStorage.getItem(VAR_MODE)
      if (_mode) {
        setMode(Number(_mode))
      }
      const _text = localStorage.getItem(VAR_STRING)
      if (_text) {
        setText(_text)
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(VAR_MODE, String(mode))
    } catch (e) {}
  }, [mode])

  useEffect(() => {
    try {
      // Avoid localStorage to hit the storage limit
      if (text.length > 5000000) return
      localStorage.setItem(VAR_STRING, text)
    } catch (e) {}
  }, [text])

  useEffect(() => {
    if (!ready) return
    Promise.all(
      text.split('\n').map((line) =>
        kuroshiro.current.convert(line, {
          to: ModePolicies[mode][0],
          mode: ModePolicies[mode][1],
        })
      )
    ).then((lines) => {
      setResult(lines)
    })
  }, [ready, text, mode])

  return (
    <>
      <Header>
        <b>Furry - {ready ? 'Ready!' : 'Loading...'}</b>
        <div
          style={{
            flexGrow: 1,
          }}
        ></div>
        <ModeSettings mode={mode} setMode={setMode} />
      </Header>
      <Main>
        <InputArea
          text={text}
          setText={setText}
          disabled={!ready}
          setHilightArea={setHilightArea}
        />
        <RenderArea result={result} hilightArea={hilightArea} />
      </Main>
    </>
  )
}

export default App
