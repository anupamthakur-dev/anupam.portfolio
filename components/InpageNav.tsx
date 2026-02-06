import { useLocation, useNavigate } from "react-router";
import Flammable from "./Flammable";

export function DesktopInPageNav({ id, lable }: { id: string; lable: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleInpageNav = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { targetId: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Flammable>
  
    <button
      onClick={handleInpageNav}
      style={{ cursor: "pointer" }}
      className="glass-nav px-6 md:px-8 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
    
    >
      <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-white drop-shadow-md">{lable}</span>
    </button>
   
    </Flammable>
  );
}


export function MobileInPageNav({ id, lable ,closeMenu,index,isMenuOpen}: { id: string; lable: string,closeMenu():void,index:number,isMenuOpen:boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleInpageNav = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { targetId: id } });
      closeMenu()
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      closeMenu()
    }
  };

  return (
    <Flammable>
    <button
      onClick={handleInpageNav}
      style={{ cursor: "pointer",transitionDelay: `${index * 100}ms` }}
       className={`group relative overflow-hidden transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
               
    >
      <span className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white block group-hover:italic transition-all">{lable}</span>
       <div className="absolute bottom-0 left-0 w-0 h-1 bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-300" />
    </button>
    </Flammable>
  );
}
