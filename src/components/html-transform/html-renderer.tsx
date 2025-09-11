import parse from 'html-react-parser'

import DynamicStyle from '../juankui/css-content'
import { options } from './transformer-map'


export default function HtmlRenderer({ html, cssContent }: { html: string, cssContent: string | undefined }) {
  return (
    <>
      {parse(html, options)}
      <DynamicStyle cssContent={cssContent} />
    </>
  )
}
