import parse from 'html-react-parser'

import DynamicStyle from '../juankui/css-content'
import { options } from './transformer-map'


import { debugHtmlWithIndentation } from '@/config/debug-html-content'
import { removeEmptyElements } from '@/utils/removeEmptyHtml'




export default function HtmlRenderer({ html, cssContent }: { html: string, cssContent: string | undefined }) {

  debugHtmlWithIndentation(html)

  const cleanedHtml = removeEmptyElements(html);

  return (
    <>
      {parse(cleanedHtml, options)}
      <DynamicStyle cssContent={cssContent} />
    </>
  )
}
