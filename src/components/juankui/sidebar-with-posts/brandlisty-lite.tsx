import { Element } from 'html-react-parser'
import BrandlistyWidget from '@/components/juankui/brandlisty/brandlisty-widget'

export function BrandlistyLite() {
    const apiKey = process.env.BRANDLISTY_API_KEY || ''
    const listId = process.env.BRANDLISTY_LIST_ID || ''
    const boton = "Visit now"
    const limit = "10"

    return (
        <div >
            <BrandlistyWidget
                apiKey={apiKey}
                listId={listId}
                boton={boton}
                limit={limit}
            />
        </div>
    )
}
