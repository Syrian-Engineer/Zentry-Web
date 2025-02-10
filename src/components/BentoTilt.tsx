import { useRef, useState } from "react";

interface Props{
    children:React.ReactNode;
    className:string
}


const BentoTilt = ({children,className}:Props)=>{
    const [transformStyle,setTransformStyle] = useState("")
    const itemRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event:React.MouseEvent)=>{
        if(!itemRef.current) return;
        
         const {left,top,width,height} = itemRef.current.getBoundingClientRect();
        
         const relativeX = (event.clientX - left) / width
         const relativeY = (event.clientY - top) / height

         const tiltX = (relativeX - 0.5) * 12
         const tiltY = (relativeY - 0.5) * -12
        
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
        
        setTransformStyle(newTransform)

    }

    const handleMouseLeave = ()=>{
        setTransformStyle("");
    }

    return(
        <div 
          className={className} ref={itemRef} 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
          style={{transform:transformStyle}}
        >
            {children}
        </div>
    )
}

export default BentoTilt