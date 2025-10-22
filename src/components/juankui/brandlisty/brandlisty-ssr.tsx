
import { headers } from 'next/headers';
import { BrandlistyCardOriginal, BrandlistyCardSidebar } from './brandlisty-card';
import { fetchBrandlistyApi } from '@/api-fetcher/fetcher';

export async function BrandlistySidebarSsr () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode });

  return (
    <div className="flex w-full max-w-full flex-col gap-4 bg-gray-50 p-4 lg:max-w-sm">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCardSidebar key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

export async function BrandlistyOriginalSsr ({ apiKey, listId }: { apiKey: string; listId: string }) {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode, apiKey: apiKey, listId: listId });

  return (
    <div className="flex w-full flex-col bg-gray-50">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCardOriginal key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

