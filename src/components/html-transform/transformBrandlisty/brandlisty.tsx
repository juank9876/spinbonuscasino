import { BrandlistyOriginalSsr } from '@/components/juankui/brandlisty/brandlisty-ssr'
import { Element } from 'html-react-parser'


export function transformBrandlisty (el: Element) {
    const { apikey, listid, boton, limit, id } = el.attribs
    return (
        <div id={el.attribs?.id} className={`flex h-full flex-col ${el.attribs?.class || ''}`}>
            <BrandlistyOriginalSsr
                //key={id}
                apiKey={apikey || el.attribs['data-apikey']}
                listId={listid || el.attribs['data-listid']}
            //boton={boton || el.attribs['data-boton']}
            //limit={limit || el.attribs['data-limit']}
            />
        </div>
    )
}
