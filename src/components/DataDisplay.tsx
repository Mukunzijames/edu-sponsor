import { useData } from '@/hooks/useData';

export default function DataDisplay() {
  const { data, isLoading, isError, error } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h2>Data Display</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
} 