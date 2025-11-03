
import { headers } from 'next/headers';
import { BrandlistyCardOriginal, BrandlistyCardSidebar } from './brandlisty-card';
import { fetchBrandlistyApi } from '@/api-fetcher/fetcher';

export async function BrandlistySidebarSsr() {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode });

  return (
    <div className="flex w-full max-w-full flex-col gap-4 bg-gray-50 p-4 lg:max-w-sm mx-auto">
      {brandlistyList.slice(0, 5).map((operator, index) => (
        <BrandlistyCardSidebar key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

export async function BrandlistyOriginalSsr({ apiKey, listId }: { apiKey: string; listId: string }) {
  console.log(apiKey, listId)
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode, apiKey: apiKey, listId: listId, domain: 'spinbonuscasino.com' });

  console.log(brandlistyList)
  return (
    <div className="w-full flex-col bg-gray-50">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCardOriginal key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

