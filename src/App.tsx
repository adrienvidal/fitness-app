import { useState, useEffect, Fragment } from "react";
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
import { ExpressBaseToggle } from "./components/ExpressBaseToggle/ExpressBaseToggle";
import { SwitchBaseSheet } from "./components/SwitchBaseSheet/SwitchBaseSheet";
import { expressExercises } from "./data/express";
import type { Exercise, ExpressBase } from "./types/index.types";
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

  // Base de la séance EXPRESS, gardée pour la journée seulement (un rechargement ne la perd pas).
  const [expressBase, setExpressBase] = useState<ExpressBase>(
    () => (localStorage.getItem(`expressBase:${todayStr}`) as ExpressBase | null) ?? "push"
  );
  const [pendingBase, setPendingBase] = useState<ExpressBase | null>(null);

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
  const isExpress = day.type === "express";
  const dayExercises = isExpress ? expressExercises(expressBase) : day.exercises;
  const baseDay = days.find(d => d.type === expressBase)!;
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

  // Un exercice EXPRESS repris de PUSH ou PULL garde la clé de son jour d'origine, donc sa charge.
  function exerciseKey(ex: Exercise) {
    return `d${ex.sourceDay ?? activeDay}-${ex.name.replace(/\s+/g, "_")}`;
  }

  const completedCount = sessionFinished ? dayExercises.length : completedExercises.size;
  const missingExercises = sessionFinished ? [] : dayExercises.filter(ex => !completedExercises.has(exerciseKey(ex))).map(ex => ex.name);

  const nextIndex = sessionFinished ? -1 : dayExercises.findIndex(ex => !completedExercises.has(exerciseKey(ex)));

  function saveCompleted(next: Set<string>) {
    setCompletedExercises(next);
    localStorage.setItem(`completedExercises:${todayStr}:${day.type}`, JSON.stringify([...next]));
  }

  function toggleComplete(key: string) {
    const next = new Set(completedExercises);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    saveCompleted(next);
  }

  const forceKeys = dayExercises.filter(ex => ex.sourceDay !== undefined).map(exerciseKey);
  const forceDone = forceKeys.filter(key => completedExercises.has(key)).length;

  function handleBaseSelect(base: ExpressBase) {
    if (base === expressBase) return;
    if (forceDone > 0) setPendingBase(base);
    else applyBase(base);
  }

  function applyBase(base: ExpressBase) {
    saveCompleted(new Set([...completedExercises].filter(key => !forceKeys.includes(key))));
    setExpressBase(base);
    localStorage.setItem(`expressBase:${todayStr}`, base);
    setActiveExercise(null);
    setPendingBase(null);
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
        total={dayExercises.length}
        accentColor={day.accent}
      />

      {isExpress && <ExpressBaseToggle base={expressBase} onSelect={handleBaseSelect} />}

      <div className="app__list">
        {dayExercises.map((ex, i) => {
          const exKey = exerciseKey(ex);
          const startsGroup = ex.group && ex.group.label !== dayExercises[i - 1]?.group?.label;
          return (
            <Fragment key={exKey}>
              {startsGroup && (
                <div className="app__group">
                  <span>{ex.group!.label}</span>
                  <em>{ex.group!.note}</em>
                </div>
              )}
              <ExerciseCard
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
            </Fragment>
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
          dayLabel={isExpress ? `${day.label} · ${baseDay.label}` : day.label}
          accentColor={day.accent}
          onAccentColor={onAccent[day.type]}
          completed={completedCount}
          total={dayExercises.length}
          missing={missingExercises}
          dateLabel={longDateFormat.format(today)}
          isGuest={isGuest}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={confirmFinishSession}
        />
      )}

      {pendingBase && (
        <SwitchBaseSheet
          fromLabel={baseDay.label}
          toLabel={days.find(d => d.type === pendingBase)!.label}
          toAccent={days.find(d => d.type === pendingBase)!.accent}
          toOnAccent={onAccent[pendingBase]}
          forceDone={forceDone}
          onCancel={() => setPendingBase(null)}
          onConfirm={() => applyBase(pendingBase)}
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
