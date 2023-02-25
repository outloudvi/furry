import { useEffect, useRef } from 'react'
import { SectionRender } from '../styled'

function isInSight(element, parent) {
  console.log(element.offsetTop, parent.scrollTop, parent.offsetHeight)
  return (
    element.offsetTop >= parent.scrollTop &&
    element.offsetTop < parent.scrollTop + parent.offsetHeight
  )
}

const RenderArea = ({ result, hilightArea }) => {
  const sectionElemRef = useRef(null)

  useEffect(() => {
    if (hilightArea === null) return
    const sectionElem = sectionElemRef.current
    if (!sectionElem) return
    const hlLineFirstElem = document.querySelector(`#line--${hilightArea[0]}`)
    const hlLineLastElem = document.querySelector(`#line--${hilightArea[1]}`)
    if (!hlLineFirstElem || !hlLineLastElem) return

    const hlFirstInSight = isInSight(hlLineFirstElem, sectionElem)
    const hlLastInSight = isInSight(hlLineLastElem, sectionElem)

    if (hlFirstInSight && hlLastInSight) return
    hlLineFirstElem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [hilightArea])

  return (
    <SectionRender ref={sectionElemRef}>
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
