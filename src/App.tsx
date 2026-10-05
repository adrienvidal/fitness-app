import { useState, useEffect } from "react";
import { days } from "./data/days";
import { Header } from "./components/Header/Header";
import { DayTabs } from "./components/DayTabs/DayTabs";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";
import { SessionProgress } from "./components/SessionProgress/SessionProgress";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { LoginScreen } from "./components/LoginScreen/LoginScreen";
import { RestTimerModal } from "./components/RestTimerModal/RestTimerModal";
import { FinishSessionSheet } from "./components/FinishSessionSheet/FinishSessionSheet";
import { LogSessionModal } from "./components/LogSessionModal/LogSessionModal";
import { onAccent } from "./constants/colors";
import { useSupabase } from "./hooks/useSupabase";
import { useWorkoutLog } from "./hooks/useWorkoutLog";
import "./App.scss";

const longDateFormat = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const shortDateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });

export default function App() {
  const { userId, isReady, signIn, signOut } = useSupabase();
  const [isGuest, setIsGuest] = useState(false);
  const { workoutLog, saveSession, removeSession } = useWorkoutLog(userId);
  const [activeDay, setActiveDay] = useState(0);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const saved = localStorage.getItem(`completedExercises:${todayStr}:${days[0].type}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restSeconds, setRestSeconds] = useState<number | undefined>(undefined);
  const [restExerciseName, setRestExerciseName] = useState<string | undefined>(undefined);
  const [pendingLogDate, setPendingLogDate] = useState<string | null>(null);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!userId && !isGuest) {
    return <LoginScreen onSignIn={signIn} onGuestAccess={() => setIsGuest(true)} />;
  }

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  }

  const day = days[activeDay];
  const sessionFinished = workoutLog[todayStr] === day.type;

  function handleDaySelect(i: number) {
    setActiveDay(i);
    setActiveExercise(null);
    const saved = localStorage.getItem(`completedExercises:${todayStr}:${days[i].type}`);
    setCompletedExercises(saved ? new Set(JSON.parse(saved)) : new Set());
  }

  function handleFinishSession() {
    setShowConfirmModal(true);
  }

  function confirmFinishSession() {
    setShowConfirmModal(false);
    setToastMessage(isGuest ? `Séance ${day.label} terminée` : `Séance ${day.label} enregistrée au ${shortDateFormat.format(today)}`);
    setTimeout(() => setToastMessage(null), 3000);
    localStorage.removeItem(`completedExercises:${todayStr}:${day.type}`);
    if (!userId) return;
    saveSession(todayStr, day.type, userId);
  }

  function openRestTimer(seconds?: number, exerciseName?: string) {
    setRestSeconds(seconds);
    setRestExerciseName(exerciseName);
    setShowRestTimer(true);
  }

  function exerciseKey(name: string) {
    return `d${activeDay}-${name.replace(/\s+/g, "_")}`;
  }

  const completedCount = sessionFinished ? day.exercises.length : completedExercises.size;
  const missingExercises = sessionFinished ? [] : day.exercises.filter(ex => !completedExercises.has(exerciseKey(ex.name))).map(ex => ex.name);

  const nextIndex = sessionFinished ? -1 : day.exercises.findIndex(ex => !completedExercises.has(exerciseKey(ex.name)));

  function toggleComplete(key: string) {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(`completedExercises:${todayStr}:${day.type}`, JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <div className="app">
      <Header onOpenPanel={() => setIsPanelOpen(true)} onOpenTimer={() => openRestTimer()} />
      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        workoutLog={workoutLog}
        onSignOut={signOut}
        onSignIn={() => {
          setIsPanelOpen(false);
          setIsGuest(false);
        }}
        isGuest={isGuest}
        onSelectDate={!isGuest ? setPendingLogDate : undefined}
      />

      <DayTabs
        days={days}
        activeDay={activeDay}
        onSelect={handleDaySelect}
      />

      {isGuest && (
        <div className="app__guest-banner">
          <span>Mode invité : rien n'est enregistré.</span>
          <button onClick={() => setIsGuest(false)} style={{ color: day.accent }}>Se connecter</button>
        </div>
      )}

      <SessionProgress
        label={day.label}
        dayId={day.id}
        completed={completedCount}
        total={day.exercises.length}
        accentColor={day.accent}
      />

      <div className="app__list">
        {day.exercises.map((ex, i) => {
          const exKey = exerciseKey(ex.name);
          return (
            <ExerciseCard
              key={exKey}
              ex={{ ...ex, index: i + 1 }}
              accentColor={day.accent}
              onAccentColor={onAccent[day.type]}
              exKey={exKey}
              isOpen={activeExercise === i}
              isNext={nextIndex === i}
              onClick={() => setActiveExercise(activeExercise === i ? null : i)}
              isCompleted={completedExercises.has(exKey)}
              onToggleComplete={() => toggleComplete(exKey)}
              onStartRest={seconds => openRestTimer(seconds, ex.name)}
              userId={userId}
            />
          );
        })}
      </div>

      <div className="app__dock">
        <button className="app__finish-btn" onClick={handleFinishSession}>
          Terminer la séance
        </button>
      </div>

      {showConfirmModal && (
        <FinishSessionSheet
          dayLabel={day.label}
          accentColor={day.accent}
          onAccentColor={onAccent[day.type]}
          completed={completedCount}
          total={day.exercises.length}
          missing={missingExercises}
          dateLabel={longDateFormat.format(today)}
          isGuest={isGuest}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={confirmFinishSession}
        />
      )}

      {toastMessage && (
        <div className="app__toast" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {toastMessage}
        </div>
      )}

      {showRestTimer && (
        <RestTimerModal
          accentColor={day.accent}
          onAccentColor={onAccent[day.type]}
          initialSeconds={restSeconds}
          exerciseName={restExerciseName}
          onClose={() => setShowRestTimer(false)}
        />
      )}

      {pendingLogDate && (
        <LogSessionModal
          dateStr={pendingLogDate}
          currentType={workoutLog[pendingLogDate] ?? null}
          onSave={(dateStr, dayType) => {
            if (userId) saveSession(dateStr, dayType, userId);
            setPendingLogDate(null);
          }}
          onRemove={dateStr => {
            if (userId) removeSession(dateStr, userId);
            setPendingLogDate(null);
          }}
          onClose={() => setPendingLogDate(null)}
        />
      )}
    </div>
  );
}
