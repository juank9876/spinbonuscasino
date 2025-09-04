import parse from 'html-react-parser'
import { options } from './transformer-map'
import DynamicStyle from '../juankui/css-content'


export default function HtmlRenderer({ html, cssContent }: { html: string, cssContent: string | undefined }) {
  return (
    <>
      {parse(html, options)}
      <DynamicStyle cssContent={cssContent} />
    </>
  )
}
