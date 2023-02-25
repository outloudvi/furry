import React, { useEffect, useState, useRef } from 'react'

import { Header, Main } from './styled'
import ModeSettings from './components/ModeSettings'
import InputArea from './components/InputArea'
import RenderArea from './components/RenderArea'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ModePolicies } from './modes'

function App() {
  const [mode, setMode] = useState(1)
  const [text, setText] = useState('')

  const [ready, setReady] = useState(false)
  const kuroshiro = useRef(new Kuroshiro())
  const [result, setResult] = useState('')

  useEffect(() => {
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
    if (!ready) return
    Promise.all(
      text.split('\n').map((line) =>
        kuroshiro.current.convert(line, {
          to: ModePolicies[mode][0],
          mode: ModePolicies[mode][1],
        })
      )
    ).then((lines) => {
      setResult(lines.join('<br />'))
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
        <InputArea text={text} setText={setText} disabled={!ready} />
        <RenderArea result={result} />
      </Main>
    </>
  )
}

export default App
