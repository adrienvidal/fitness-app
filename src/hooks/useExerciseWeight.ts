import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { resolveWeight } from "../utils/weight";

async function migrateFromLocalStorage(uid: string, exKey: string, storageKey: string) {
  const migrationKey = `weight_migrated:${exKey}`;
  if (localStorage.getItem(migrationKey)) return;

  const val = localStorage.getItem(storageKey);
  if (val) {
    await supabase.from("exercise_weights").upsert(
      { user_id: uid, ex_key: exKey, weight_kg: parseFloat(val) },
      { onConflict: "user_id,ex_key" }
    );
  }
  localStorage.setItem(migrationKey, "true");
}

async function fetchFromSupabase(uid: string, exKey: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("exercise_weights")
    .select("weight_kg")
    .eq("user_id", uid)
    .eq("ex_key", exKey)
    .maybeSingle();

  if (error || !data) return null;
  return data.weight_kg != null ? String(data.weight_kg) : null;
}

async function pushToSupabase(uid: string, exKey: string, val: string): Promise<boolean> {
  const { error } = await supabase.from("exercise_weights").upsert(
    { user_id: uid, ex_key: exKey, weight_kg: val ? parseFloat(val) : null },
    { onConflict: "user_id,ex_key" }
  );
  return !error;
}

export type WeightSyncStatus = "idle" | "saved" | "error";

export function useExerciseWeight(exKey: string, userId: string | null) {
  const storageKey = `weight:${exKey}`;
  const pendingKey = `weight_pending:${exKey}`;
  const [weight, setWeight] = useState(() => localStorage.getItem(storageKey) ?? "");
  const [status, setStatus] = useState<WeightSyncStatus>("idle");

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    async function init(uid: string) {
      await migrateFromLocalStorage(uid, exKey, storageKey);
      const remote = await fetchFromSupabase(uid, exKey);
      const { value, push } = resolveWeight({
        local: localStorage.getItem(storageKey),
        pending: localStorage.getItem(pendingKey) !== null,
        remote,
      });
      if (cancelled) return;
      setWeight(value);
      localStorage.setItem(storageKey, value);
      if (!push) return;
      const ok = await pushToSupabase(uid, exKey, value);
      if (cancelled) return;
      if (ok) localStorage.removeItem(pendingKey);
      setStatus(ok ? "saved" : "error");
    }
    init(userId);
    return () => {
      cancelled = true;
    };
  }, [userId, exKey, storageKey, pendingKey]);

  async function saveWeight(val: string) {
    setWeight(val);
    localStorage.setItem(storageKey, val);
    if (!userId) return;

    localStorage.setItem(pendingKey, "true");
    const ok = await pushToSupabase(userId, exKey, val);
    if (ok) localStorage.removeItem(pendingKey);
    setStatus(ok ? "saved" : "error");
  }

  function retry() {
    return saveWeight(weight);
  }

  return { weight, status, saveWeight, retry };
}
