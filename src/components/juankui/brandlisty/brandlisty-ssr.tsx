
import { headers } from 'next/headers';
import { BrandlistyCardOriginal, BrandlistyCardSidebar } from './brandlisty-card';
import { fetchBrandlistyApi } from '@/api-fetcher/fetcher';
import { DicesIcon } from 'lucide-react';

export async function BrandlistySidebarSsr() {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const domain = process.env.SIDEBAR_BRANDLISTY_URL
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode, domain: domain });

  if (brandlistyList.length > 0) {
    return (
      <aside className={`relative flex h-fit flex-col rounded-xl border border-gray-200 bg-white shadow-sm`}>
        <div className="relative flex items-center gap-2 rounded-t-xl bg-gradient-to-r from-[var(--color-primary-semi-dark)] to-[var(--color-primary-dark)] px-5 py-2">
          <DicesIcon className="h-5 w-5 text-white" />
          <h2 className="padding-none text-lg font-bold text-white">Brandlisty</h2>
        </div>
        <div className="flex w-full max-w-full flex-col gap-4 bg-gray-50 p-4 lg:max-w-sm mx-auto">
          {brandlistyList.slice(0, 5).map((operator, index) => (
            <BrandlistyCardSidebar key={operator.id} operator={operator} index={index} />
          ))}
        </div>
      </aside>
    );
  }
}

export async function BrandlistyOriginalSsr({ apiKey, listId }: { apiKey: string; listId: string }) {
  const headerslist = await headers();
  const countryCode = headerslist.get('x-user-country') || 'WW'
  const brandlistyList = await fetchBrandlistyApi({ countryCode: countryCode, apiKey: apiKey, listId: listId });

  return (
    <div className="w-full flex-col bg-gray-50">
      {brandlistyList.map((operator, index) => (
        <BrandlistyCardOriginal key={operator.id} operator={operator} index={index} />
      ))}
    </div>
  );
}

