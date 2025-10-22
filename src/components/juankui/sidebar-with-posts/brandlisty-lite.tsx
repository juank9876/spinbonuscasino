import { DicesIcon } from 'lucide-react'
import { fetchBrandlistyApi } from '@/api-fetcher/fetcher';
import { BrandlistySidebarSsr } from '../brandlisty/brandlisty-ssr';

export async function BrandlistyLite () {
    // Ya no necesitamos la constante test, el HTML vendrá del API
    const res = await fetchBrandlistyApi({ countryCode: '' });


    // max-h-[900px] max-w-[400px] overflow-x-auto
    return (
        <aside className={`relative flex h-fit flex-col rounded-xl border border-gray-200 bg-white shadow-sm`}>
            <div className="relative flex items-center gap-2 rounded-t-xl bg-gradient-to-r from-[var(--color-primary-semi-dark)] to-[var(--color-primary-dark)] px-5 py-2">
                <DicesIcon className="h-5 w-5 text-white" />
                <h2 className="padding-none text-lg font-bold text-white">Brandlisty</h2>
            </div>
            {/*
                <BrandlistyWidget
                    isDataWidget
                    apiKey={apiKey}
                    listId={listId}
                    boton={boton}
                    limit={limit}
                    sidebarMode={true}
                />
            */}
            <BrandlistySidebarSsr />
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