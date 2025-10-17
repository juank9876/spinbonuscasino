import BrandlistyWidget from '@/components/juankui/brandlisty/brandlisty-widget'

export function BrandlistyLite() {
    // Ya no necesitamos la constante test, el HTML vendrá del API

    const apiKey = process.env.BRANDLISTY_API_KEY || ''
    const listId = process.env.BRANDLISTY_LIST_ID || ''
    const boton = "Visit now"
    const limit = "10"

    return (
        <BrandlistyWidget
            apiKey={apiKey}
            listId={listId}
            boton={boton}
            limit={limit}
            sidebarMode={true}
        />
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