import parse from 'html-react-parser'
import { options } from './transformer-map'


export default function HtmlRenderer ({ html }: { html: string }) {
  return <>{parse(html, options)}</>
}
