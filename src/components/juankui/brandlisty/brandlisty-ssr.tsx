
import { headers } from 'next/headers';
import { BrandlistyCard } from './brandlisty-card';
import { fetchBrandlistyApi } from '@/api-fetcher/fetcher';

export async function BrandlistySidebarSsr () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  console.log('Country Code:', countryCode);
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode });


  return (
    <div className="flex w-full max-w-sm flex-col gap-4 bg-gray-50 p-4">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCard key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

export async function BrandlistyOriginalSsr () {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  console.log('Country Code:', countryCode);
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode });


  return (
    <div className="flex w-full max-w-sm flex-col gap-4 bg-gray-50 p-4">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCard key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

