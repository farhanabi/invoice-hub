import { useRouter, useSearchParams } from 'next/navigation';

export const useInvoiceFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? 'All Status';

  const updateFilters = (newSearch: string, newStatus: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newStatus !== 'All Status') params.set('status', newStatus);

    const queryString = params.toString();
    router.push(
      queryString ? `/invoices/list?${queryString}` : '/invoices/list'
    );
  };

  const isSearchActive = search !== '' || status !== 'All Status';

  return {
    search,
    status,
    updateFilters,
    isSearchActive,
  };
};
