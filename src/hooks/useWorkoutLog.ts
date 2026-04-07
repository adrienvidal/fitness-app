import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { DayType } from "../types/index.types";

export function useWorkoutLog(userId: string | null) {
  const [workoutLog, setWorkoutLog] = useState<Record<string, DayType>>(() => {
    try {
      return JSON.parse(localStorage.getItem("workoutLog") ?? "{}");
    } catch {
      return {};
    }
  });

  async function migrateFromLocalStorage(uid: string) {
    if (localStorage.getItem("workoutLog_migrated")) return;

    const raw = localStorage.getItem("workoutLog");
    if (!raw) {
      localStorage.setItem("workoutLog_migrated", "true");
      return;
    }

    const log: Record<string, DayType> = JSON.parse(raw);
    const rows = Object.entries(log).map(([date, type]) => ({
      user_id: uid,
      session_date: date,
      day_type: type,
    }));

    if (rows.length > 0) {
      await supabase.from("workout_logs").upsert(rows, { onConflict: "user_id,session_date" });
    }

    localStorage.setItem("workoutLog_migrated", "true");
  }

  async function fetchFromSupabase(uid: string): Promise<Record<string, DayType> | null> {
    const { data, error } = await supabase
      .from("workout_logs")
      .select("session_date, day_type")
      .eq("user_id", uid);

    if (error || !data) return null;

    const log: Record<string, DayType> = {};
    for (const row of data) {
      log[row.session_date] = row.day_type as DayType;
    }
    return log;
  }

  useEffect(() => {
    if (!userId) return;
    async function init() {
      await migrateFromLocalStorage(userId!);
      const log = await fetchFromSupabase(userId!);
      if (log) {
        setWorkoutLog(log);
        localStorage.setItem("workoutLog", JSON.stringify(log));
      }
    }
    init();
  }, [userId]);

  async function saveSession(dateStr: string, dayType: DayType, uid: string) {
    setWorkoutLog(prev => {
      const next = { ...prev, [dateStr]: dayType };
      localStorage.setItem("workoutLog", JSON.stringify(next));
      return next;
    });

    await supabase.from("workout_logs").upsert(
      { user_id: uid, session_date: dateStr, day_type: dayType },
      { onConflict: "user_id,session_date" }
    );
  }

  return { workoutLog, saveSession };
}
