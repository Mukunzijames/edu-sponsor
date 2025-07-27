import { useQuery } from '@tanstack/react-query';

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useData() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });
} 