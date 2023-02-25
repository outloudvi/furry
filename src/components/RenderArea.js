import { RenderZone, SectionRender } from '../styled'

const RenderArea = ({ result }) => {
  return (
    <SectionRender>
      <RenderZone
        dangerouslySetInnerHTML={{
          __html: result,
        }}
      ></RenderZone>
    </SectionRender>
  )
}

export default RenderArea
