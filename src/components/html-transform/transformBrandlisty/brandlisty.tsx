import { BrandlistyOriginalSsr } from '@/components/juankui/brandlisty/brandlisty-ssr'
import { fixAttribs } from '@/lib/utils'
import { Element } from 'html-react-parser'


export function transformBrandlisty(el: Element) {
    const { apikey, listid, boton, limit, id } = el.attribs
    const attribs = fixAttribs(el.attribs)


    return (
        <div id={attribs.id} className={`flex h-full flex-col`}>
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
