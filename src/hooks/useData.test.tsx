import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useData } from './useData';
import { createQueryClientWrapper } from '../test/utils';

vi.mock('node:fetch', () => ({
  default: vi.fn(),
}));

describe('useData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and return data', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'Test Todo', completed: false }),
    });

    const { result } = renderHook(() => useData(), {
      wrapper: createQueryClientWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ id: 1, title: 'Test Todo', completed: false });
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useData(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
}); 