import { useRef } from "react"
import AnimatedTitle from "./AnimatedTitle"
import gsap from "gsap"
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";
const Story = ()=>{
    const frameRef = useRef<HTMLImageElement  | null>(null);

    const hanldeMouseLeave = ()=>{
        const element = frameRef.current
        if(!element) return;

        gsap.to(element,{
            duration:0.3,
            rotateX:0,
            rotateY:0,
            ease:"power1.inOut"
        })
    }

    const handleMouseMove = (e:React.MouseEvent)=>{
        const element = frameRef.current

        if(!element) return;

        const rect = element.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;


        const rotateX = ((yPos - centerY) / centerY) * -10;
        const rotateY = ((xPos - centerX) / centerX) * 10;

        gsap.to(element,{
            duration:0.3,
            rotateX,
            rotateY,
            ease:"power1.inOut",
            transformPerspective:600,
        })
    }

    return(
            <div id="prologue" className="container min-h-dvh w-screen bg-black text-blue-50">
                <div className="flex flex-col size-full items-center py-10 pb-24">
                    <p className="font-general text-xs uppercase md:text-[10px]">
                        the multiversal ip world
                    </p>

                    <div className="size-full relative">
                        <AnimatedTitle 
                          text="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
                          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                        />
                        
                        <div className="story-img-container">
                            <div className="story-img-mask">
                                <div className="story-img-content">
                                    <img 
                                     ref={frameRef}
                                     onMouseLeave={hanldeMouseLeave}
                                     onMouseUp={hanldeMouseLeave}
                                     onMouseEnter={hanldeMouseLeave}
                                     onMouseMove={handleMouseMove}
                                     src="img/entrance.webp" 
                                     alt="entrance.webp" 
                                     className="object-contain"
                                     />
                                </div>
                            </div>
                            <RoundedCorners />
                        </div>
                    </div>
                    <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                        <div className="h-full w-fit flex flex-col items-center md:items-start ">
                            <p className="font-circular-web text-violet-50 max-w-sm mt-3 text-center md:text-start ">
                                Where realms converge, lies Zentry and the boundless pillar.
                                Discover its secrets and shape your fate amidst infinite
                                opportunities.
                            </p>

                            <Button 
                             id="realm-btn"  
                             title="discover prologue"
                             containerClass="mt-5 !text-black hover:scale-95 transition duration-300"
                             />
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default Story