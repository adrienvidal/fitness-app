import { Header } from "../Header/Header";
import "./LoadingScreen.scss";

const SKELETON_ROWS = 5;

export function LoadingScreen() {
  return (
    <div className="loading-screen" aria-busy="true">
      <Header onOpenPanel={() => {}} onOpenTimer={() => {}} />
      <div className="loading-screen__status">
        <div className="loading-screen__bar"><i /></div>
        <span role="status">Récupération de ta session…</span>
      </div>
      <div className="loading-screen__rows" aria-hidden="true">
        {Array.from({ length: SKELETON_ROWS }, (_, i) => <div key={i} />)}
      </div>
    </div>
  );
}
