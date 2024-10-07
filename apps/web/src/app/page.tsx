import { JoinGame } from "@/components/atoms/JoinGame/JoinGame";
import { MatchMakingProvider } from "@/components/atoms/JoinGame/MatchMakingProvider";
import './blob.css'

export default async function Home() {
  return (
    <div
      className="flex flex-1 flex-row justify-center items-center">
      <MatchMakingProvider>
        <JoinGame />
        <div className="bottom">
          <div className="blob">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle5"></div>
          </div>
        </div>
        <div className="lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </MatchMakingProvider>
    </div>
  );
}
