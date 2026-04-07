import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useExerciseWeight(exKey: string, userId: string | null) {
  const storageKey = `weight:${exKey}`;
  const [weight, setWeight] = useState(() => localStorage.getItem(storageKey) ?? "");

  useEffect(() => {
    if (!userId) return;
    async function init() {
      await migrateFromLocalStorage(userId!);
      const remote = await fetchFromSupabase(userId!);
      if (remote !== null) {
        setWeight(remote);
        localStorage.setItem(storageKey, remote);
      }
    }
    init();
  }, [userId]);

  async function migrateFromLocalStorage(uid: string) {
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

  async function fetchFromSupabase(uid: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("exercise_weights")
      .select("weight_kg")
      .eq("user_id", uid)
      .eq("ex_key", exKey)
      .maybeSingle();

    if (error || !data) return null;
    return data.weight_kg != null ? String(data.weight_kg) : null;
  }

  async function saveWeight(val: string, uid: string) {
    setWeight(val);
    localStorage.setItem(storageKey, val);

    await supabase.from("exercise_weights").upsert(
      { user_id: uid, ex_key: exKey, weight_kg: val ? parseFloat(val) : null },
      { onConflict: "user_id,ex_key" }
    );
  }

  return { weight, saveWeight };
}
