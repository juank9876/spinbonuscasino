import BrandlistyWidget from '@/components/juankui/brandlisty/brandlisty-widget'
import { DicesIcon } from 'lucide-react'

export function BrandlistyLite () {
    // Ya no necesitamos la constante test, el HTML vendrá del API

    const apiKey = process.env.BRANDLISTY_API_KEY || ''
    const listId = process.env.BRANDLISTY_LIST_ID || ''
    const boton = "Visit now"
    const limit = "5"

    // max-h-[900px] max-w-[400px] overflow-x-auto
    return (
        <aside className={`relative flex h-fit flex-col rounded-xl border border-gray-200 bg-white shadow-sm`}>
            <div className="relative flex items-center gap-2 rounded-t-xl bg-gradient-to-r from-[var(--color-primary-semi-dark)] to-[var(--color-primary-dark)] px-5 py-2">
                <DicesIcon className="h-5 w-5 text-white" />
                <h2 className="padding-none text-lg font-bold text-white">Brandlisty</h2>
            </div>
            <BrandlistyWidget
                dataWidget="1"
                apiKey={apiKey}
                listId={listId}
                boton={boton}
                limit={limit}
                sidebarMode={true}
            />
        </aside>
    )
}



/*
    const apiKey = process.env.BRANDLISTY_API_KEY || ''
    const listId = process.env.BRANDLISTY_LIST_ID || ''
    const boton = "Visit now"
    const limit = "10"

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: test }} />
            <BrandlistyWidget
                apiKey={apiKey}
                listId={listId}
                boton={boton}
                limit={limit}
            />
        </>
    )
}
*/