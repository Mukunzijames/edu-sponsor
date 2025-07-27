import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

export function createQueryClientWrapper() {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

export function renderWithQueryClient(ui: ReactElement) {
  const wrapper = createQueryClientWrapper();
  return render(ui, { wrapper });
} 