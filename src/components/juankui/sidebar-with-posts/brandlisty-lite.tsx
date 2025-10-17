import BrandlistyWidget from '@/components/juankui/brandlisty/brandlisty-widget'
import { DicesIcon } from 'lucide-react'

export function BrandlistyLite() {
    // Ya no necesitamos la constante test, el HTML vendrá del API

    const apiKey = process.env.BRANDLISTY_API_KEY || ''
    const listId = process.env.BRANDLISTY_LIST_ID || ''
    const boton = "Visit now"
    const limit = "10"

    return (
        <aside className={`bg-white rounded-xl h-fit border border-gray-200 overflow-hidden shadow-sm top-20`}>
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary-semi-dark)] to-[var(--color-primary-dark)] px-5 py-2">
                <DicesIcon className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white padding-none">Brandlisty</h2>
            </div>
            <BrandlistyWidget
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