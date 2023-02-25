import { styled, withStyle } from 'styletron-react'

const WIDE_SCREEN_BAROQUE = '@media screen and (min-width: 1024px)'

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  [WIDE_SCREEN_BAROQUE]: {
    height: '90vh',
    flexDirection: 'row',
  },
})

export const Section = styled('section', {
  padding: '15px',
  boxSizing: 'border-box',
  [WIDE_SCREEN_BAROQUE]: {
    flex: '1',
  },
})

export const SectionInput = withStyle(Section, {
  height: '15vh',
  [WIDE_SCREEN_BAROQUE]: {
    height: 'unset !important',
  },
})

export const SectionRender = withStyle(Section, {
  height: '75vh',
  [WIDE_SCREEN_BAROQUE]: {
    height: 'unset',
  },
})

export const Header = styled('div', {
  height: '5vh',
  padding: '4px 15px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
})

export const Textarea = styled('textarea', {
  width: '100%',
  height: '100%',
})

export const RenderZone = styled('article', {
  height: '100%',
  overflowY: 'scroll',
})
