"use client";

import { useEffect, useMemo, useState } from "react";
import WeaponsGridList from "./WeaponsGridList";
import WeaponsComparePanel from "./WeaponsComparePanel";
import { Item } from "./weaponTypes";

export default function WeaponGrid({ items }: { items: Item[] }) {
  const [vs, setVs] = useState<string[]>([]);

  // Arama / Tag filtreleri
  const [q, setQ] = useState("");
  const [tagQ, setTagQ] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagMode, setTagMode] = useState<"OR" | "AND">("OR");

  // Filtre değişince yumuşak animasyon tetikle
  const [animateKey, setAnimateKey] = useState(0);
  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [q, tagQ, selectedTags, tagMode]);

  const selected = useMemo(() => {
    const map = new Map(items.map((i) => [i.slug, i]));
    return vs.map((s) => map.get(s)).filter(Boolean) as Item[];
  }, [vs, items]);

  function toggleVS(slug: string) {
    setVs((prev) => {
      if (prev.includes(slug)) return prev.filter((x) => x !== slug);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, slug];
    });
  }

  function clearAll() {
    setVs([]);
  }

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) for (const t of it.tags ?? []) set.add(String(t));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "tr"));
  }, [items]);

  const visibleTags = useMemo(() => {
    const s = tagQ.trim().toLowerCase();
    if (!s) return allTags;
    return allTags.filter((t) => t.toLowerCase().includes(s));
  }, [allTags, tagQ]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const exists = prev.includes(tag);
      if (exists) return prev.filter((x) => x !== tag);
      return [tag, ...prev]; // seçileni üste taşı
    });
  }

  const filteredItems = useMemo(() => {
    const s = q.trim().toLowerCase();

    return items.filter((it) => {
      const title = (it.title ?? "").toLowerCase();
      const summary = (it.summary ?? "").toLowerCase();
      const tagsLower = (it.tags ?? []).map((t) => String(t).toLowerCase());

      const metinUyar =
        !s || title.includes(s) || summary.includes(s) || tagsLower.some((t) => t.includes(s));

      let tagUyar = true;
      if (selectedTags.length > 0) {
        const tags = (it.tags ?? []).map((t) => String(t));
        tagUyar =
          tagMode === "OR"
            ? selectedTags.some((t) => tags.includes(t))
            : selectedTags.every((t) => tags.includes(t));
      }

      return metinUyar && tagUyar;
    });
  }, [items, q, selectedTags, tagMode]);

  const sortedVisibleTags = useMemo(() => {
    const selectedSet = new Set(selectedTags);
    return [...visibleTags].sort((a, b) => {
      const aSel = selectedSet.has(a);
      const bSel = selectedSet.has(b);
      if (aSel !== bSel) return aSel ? -1 : 1;
      return a.localeCompare(b, "tr");
    });
  }, [visibleTags, selectedTags]);

  return (
    <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 16px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 460px",
          gap: 40,
          alignItems: "start",
        }}
      >
        <WeaponsGridList
          items={items}
          filteredItems={filteredItems}
          vs={vs}
          onToggleVS={toggleVS}
          q={q}
          setQ={setQ}
          tagQ={tagQ}
          setTagQ={setTagQ}
          tagMode={tagMode}
          setTagMode={setTagMode}
          selectedTags={selectedTags}
          onClearTags={() => setSelectedTags([])}
          sortedVisibleTags={sortedVisibleTags}
          onToggleTag={toggleTag}
          animateKey={animateKey}
        />

        <WeaponsComparePanel selected={selected} onClear={clearAll} />
      </div>
    </div>
  );
}