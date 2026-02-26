export type Category = "weapons" | "enemies" | "stratagems" | "builds";

export type WeaponStats = {
  fire_rate?: number;
  recoil?: number;
  ergo?: number;
  capacity?: number;
  reload?: number;
  damage?: number;
  penetration?: string;
};

export type Item = {
  category: Category;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  image?: string;
  stats?: WeaponStats;
};

export const STAT_ROWS: { key: keyof WeaponStats; label: string }[] = [
  { key: "damage", label: "Hasar" },
  { key: "fire_rate", label: "Atış Hızı" },
  { key: "recoil", label: "Geri Tepme" },
  { key: "ergo", label: "Ergonomi" },
  { key: "capacity", label: "Şarjör Kapasitesi" },
  { key: "reload", label: "Doldurma Süresi" },
  { key: "penetration", label: "Delicilik" },
];

export function formatStat(key: keyof WeaponStats, value: any) {
  if (value == null) return "—";
  if (key === "fire_rate") return `${value}`;
  if (key === "reload") return `${value}`;
  return String(value);
}