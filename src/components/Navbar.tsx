import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = ()=>{
    const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null)

    const [isIndicatorActive,setIndicatiorActive] = useState(false)
    const [isAudioPlaying,setAudioPlaying] = useState(false);

    const toggleAudioIndicator = ()=>{
        setIndicatiorActive((prev)=>!prev);
        setAudioPlaying((prev)=>!prev);
    }

    useEffect(()=>{
        if(audioElementRef.current){
            if(isAudioPlaying)
                {
                    audioElementRef.current.play();
                }else{
                    audioElementRef.current.pause();
                }
        }
    },[isAudioPlaying])


    const [isNavVisible,setIsNavVisibile] = useState(true)
    const{y:currentScrollY} = useWindowScroll();
    const[lastScrollY,setLastScrollY] = useState(0);

    useEffect(()=>{
        if(navContainerRef.current){
            if(currentScrollY === 0)
                {
                    // Topmost position: show navbar without floating-nav
                    setIsNavVisibile(true)
                    navContainerRef.current.classList.remove("floating-nav")
                }else if(currentScrollY > lastScrollY){
                    // Scrolling down: hide navbar and apply floating-nav
                    setIsNavVisibile(false)
                    navContainerRef.current.classList.add("floating-nav")
                }else if(currentScrollY < lastScrollY){
                    // Scrolling up: show navbar with floating-nav
                    setIsNavVisibile(true)
                    navContainerRef.current.classList.add("floating-nav")
                }
                setLastScrollY(currentScrollY);
        }
    },[currentScrollY,lastScrollY])

    useEffect(()=>{
        gsap.to(navContainerRef.current,{
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    },[isNavVisible])

    return(
        <div className="fixed inset-x-0 sm:inset-x-6 z-50 top-4 h-16 border-none transition-all duration-700 ">
            <header className="absolute top-1/2 -translate-y-1/2 w-full">
                <nav className="flex justify-between items-center size-full p-4" ref={navContainerRef}>

                    <div className="flex gap-5 ">
                        <img 
                        src="img/logo.png" 
                        alt=""
                        className="w-10 hover:cursor-pointer"
                         />
                        <div className="hover:scale-95 transition duration-300">
                            <Button
                                id="product-button"
                                title="Products"
                                leftIcon={TiLocationArrow}
                                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 flex-row-reverse "
                             />
                        </div>
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item,index)=>(
                                <a
                                key={index}
                                href={`#${item.toLowerCase()}`}
                                className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button 
                          className="ml-10 flex items-center space-x-0.5 text-slate-50"
                          onClick={toggleAudioIndicator}
                          >
                            <audio 
                                src="audio/loop.mp3"
                                ref={audioElementRef}
                                className="hidden"
                                loop
                                />
                                {[1,2,3,4].map((bar)=>(
                                    <div 
                                     key={bar}
                                     className={clsx("indicator-line",{
                                        active:isIndicatorActive
                                     })}
                                     style={{
                                        animationDelay: `${bar * 0.1}s`,
                                      }}
                                     >
                                    </div>
                                ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;