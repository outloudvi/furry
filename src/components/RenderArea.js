import { RenderZone, SectionRender } from '../styled'

const RenderArea = ({ result, hilightArea }) => {
  return (
    <SectionRender>
      {result.map((item, key) => (
        <p
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
