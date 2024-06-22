import { useState } from "react";
const Section = ({title,description,show,setShow}) =>{
    return (
        <div className="border-2 border-black m-3 p-2">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                {!show ? <button onClick={()=> setShow(true)} className="border-[1px] border-black">Show</button> : <button onClick={()=> setShow(false)} className="border-[1px] border-black">Hide</button>}
            </div> 
            {show && <div>{description}</div>}
        </div>
    );
};

const Instamart = () => {
    const [config,setConfig] = useState({
        about:false,
        contact:false,
        reach:false,
    });
    return(
        <div>
            <h1>Welcome to Instamart</h1>
            <Section title={"About Instamart"} description={"This is about us section of Instamart"} show={config.about} setShow={()=> setConfig({
                about:true,
                contact:false,
                reach:false,
            })}/>
            <Section title={"Contact Instamart"} description={"This is contact section of Instamart"} show={config.contact} setShow={()=> setConfig({
                 about:false,
                 contact:true,
                 reach:false,   
            })}/>
            <Section title={"Reach Instamart"} description={"This is reach us section of Instamart"} show={config.reach} setShow={()=> setConfig({
                about:false,
                contact:false,
                reach:true,
            })}/>
        </div>
    )
};
export default Instamart;