const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_DATA ||
  process.env.API_DATA ||
  "http://localhost:3000/api";

const ADMIN_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop";

// Helper untuk memastikan URL gambar selalu valid & lengkap
export function resolveImageUrl(rawUrl: string | null | undefined): string {
  if (!rawUrl || typeof rawUrl !== "string") return FALLBACK_IMAGE;

  const trimmed = rawUrl.trim();
  if (!trimmed) return FALLBACK_IMAGE;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return FALLBACK_IMAGE;
    }
  }

  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${ADMIN_ORIGIN}${normalizedPath}`;
}

// ==========================================
// 1. CONSUME API PACKAGES (/api/packages)
// ==========================================
export async function fetchPackagesFromApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/packages`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data.map((pkg: any) => ({
        ...pkg,
        imageUrl: resolveImageUrl(pkg.imageUrl),
        departures: (pkg.departures || []).map((dep: any) => ({
          ...dep,
          availableSeats: dep.quotaAvailable,
          totalSeats: dep.quotaTotal,
        })),
      }));
    }

    return [];
  } catch (error) {
    console.error("🔥 Error fetchPackagesFromApi:", error);
    return [];
  }
}

// ==========================================
// 2. CONSUME API GALLERIES (/api/galleries)
// ==========================================
export async function fetchGalleriesFromApi(category?: string) {
  try {
    const query =
      category && category !== "ALL"
        ? `?category=${encodeURIComponent(category)}`
        : "";

    const res = await fetch(`${API_BASE_URL}/galleries${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data.map((item: any) => ({
        ...item,
        imageUrl: resolveImageUrl(item.imageUrl),
      }));
    }

    return [];
  } catch (error) {
    console.error("🔥 Error fetchGalleriesFromApi:", error);
    return [];
  }
}