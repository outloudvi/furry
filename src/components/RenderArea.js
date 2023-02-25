import { useEffect } from 'react'
import { SectionRender } from '../styled'

const RenderArea = ({ result, hilightArea }) => {
  useEffect(() => {
    if (hilightArea === null) return
    const targetItem = document.querySelector(`#line--${hilightArea[0]}`)
    if (!targetItem) return

    targetItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [hilightArea])

  return (
    <SectionRender>
      {result.map((item, key) => (
        <p
          id={`line--${key + 1}`}
          key={key}
          dangerouslySetInnerHTML={{
            __html: item,
          }}
          style={{
            backgroundColor:
              hilightArea &&
              hilightArea[0] <= key + 1 &&
              hilightArea[1] >= key + 1
                ? 'yellow'
                : 'unset',
          }}
        ></p>
      ))}
    </SectionRender>
  )
}

export default RenderArea
