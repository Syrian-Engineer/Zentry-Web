import { useEffect, useRef } from "react";
import clsx from "clsx"; // <-- import clsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface Props{
    text:string;
    containerClass:string
}

gsap.registerPlugin(ScrollTrigger)

const AnimatedTitle = ({text,containerClass}:Props)=>{
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });

            titleAnimation.to(
                ".animated-word", // Use class selector
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                    ease: "power2.inOut",
                    stagger: 0.01,
                },
                0
            );
        }, containerRef); // Pass containerRef for scoped animations

        // Cleanup function to revert the context on unmount
        return () => {
            ctx.revert(); // Automatically kills animations on unmount
        };
    }, []);
    return(
        <div ref={containerRef} className={clsx("animated-title" , containerClass)}>
            {text.split("<br />").map((line,index)=>(
                <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
                    {line.split(" ").map((word,idx)=>(
                        <span 
                          key={idx}
                          className="animated-word"
                          dangerouslySetInnerHTML={{__html:word}}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default AnimatedTitle