import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";

// ============================================
// PORTFOLIO HOOKS
// ============================================

export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.list.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.list.path);
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// INSTAGRAM HOOKS
// ============================================

export function useInstagramFeed() {
  return useQuery({
    queryKey: [api.instagram.list.path],
    queryFn: async () => {
      const res = await fetch(api.instagram.list.path);
      if (!res.ok) throw new Error("Failed to fetch instagram feed");
      return api.instagram.list.responses[200].parse(await res.json());
    },
    // Don't refetch often as rate limits apply
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// ============================================
// CONTACT HOOKS
// ============================================

export function useContactForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to send message');
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}
