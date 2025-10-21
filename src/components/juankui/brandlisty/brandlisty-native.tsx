import { BrandlistyScript } from "./brandlisty-script";

export function BrandlistyNative () {
  const apiKey = process.env.BRANDLISTY_API_KEY || ''
  const listId = process.env.BRANDLISTY_LIST_ID || ''
  const boton = "Visit now"
  const limit = "5"


  return (
    <div className="relative flex w-full flex-col overflow-auto rounded border bg-white shadow"
    //style={{ height: 800 }}
    >
      <div
        className="brandlisty-component"
        data-apikey={apiKey}
        //data-hash="abcdef123456"
        data-listid={listId}
        data-limit="5"
        data-category="all"
        data-boton="Ver más"
        data-widget="1"
      ></div>
      <BrandlistyScript />
      <style >{`
        body {
            padding: 0px !important
        }
        * {
        }
        `}</style>
    </div>
  )
}