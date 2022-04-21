import React from "react";
import { motion, useViewportScroll } from "framer-motion";
import styled from 'styled-components';

const StyledMotion = styled(motion.div)`
    ${props => props.customStyles}
    `;


export default function HideOnScroll({children, customStyles}) {
    const { scrollY } = useViewportScroll();
    const [hidden, setHidden] = React.useState(false);

    function update() {
        if (scrollY.current < scrollY.prev) {
            setHidden(false);
        } else if (scrollY.current > 100 && scrollY.current > scrollY.prev) {
            setHidden(true);
        }
    }

    React.useEffect(() => {
        return scrollY.onChange(() => update());
    });

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -50 }
    };

    
    return (
        <StyledMotion
            variants={variants}
            animate={hidden ? "hidden" : "visible"}
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
            customStyles={customStyles}
        >
           {children}
        </StyledMotion>
    );
}