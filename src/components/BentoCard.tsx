interface Props{
    src:string,
    title:JSX.Element,
    description:string,
    id?:string
}

const BentoCard = ({src,title,description,id}:Props)=>{
    return(
        <div className="relative size-full" id={id}>
            <video 
              src={src}
              loop
              muted
              autoPlay
              className="absolute top-0 left-0 size-full object-cover object-center"
            />
            <div className="relative flex flex-col size-full z-10 mt-5 ml-5 text-blue-50 ">
                <div>
                    <h1 className="bento-title special-font text-lg ">{title}</h1>
                    {description && (
                        <p className="max-w-64 mt-3 text-xs md:text-base">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BentoCard