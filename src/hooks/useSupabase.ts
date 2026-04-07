import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSupabase() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
        setIsReady(true);
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Supabase auth error:", error.message);
      } else {
        setUserId(data.user?.id ?? null);
      }
      setIsReady(true);
    }

    init();
  }, []);

  return { userId, isReady };
}
