import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import "./Underline.scss";

type Props = {
    listenClassName: string;
};

function UnderLine({ listenClassName }: Props) {
    const location = useLocation();
    const [position, setPosition] = React.useState({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    });
    React.useEffect(() => {
        checkLocation();
        const time = setTimeout(()=>{
            checkLocation();
        },500)
        return () => clearTimeout(time);
    }, [location]);

    function checkLocation(){
        const { pathname } = location;
        const listA = document.getElementsByClassName(listenClassName);
        let found = false;
        for (let i = 0; i < listA.length; i++) {
            const a = listA[i] as HTMLAnchorElement;
            if (a.pathname === pathname) {
                const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = a;
                setPosition({
                    width: offsetWidth,
                    height: offsetHeight,
                    left: offsetLeft,
                    top: offsetTop,
                });
                found = true;
            }
        }
        if (!found) {
            setPosition({
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            });
        }
    }

    return <motion.div 
    animate={{
        width: position.width,
        height: 3,
        x: position.left,
        y: position.top+position.height,
    }}
    transition={{type:"spring", damping: 15}}
    className="MoveUnderLine"></motion.div>;
}

export default UnderLine;
