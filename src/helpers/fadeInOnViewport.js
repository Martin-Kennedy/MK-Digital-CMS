import React from "react";
import { motion } from "framer-motion";

export const FadeInWhenVisibleScale = ({ children, duration = 0.75 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: duration }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
            }}
        >
            {children}
        </motion.div>
    );
}

export const FadeInWhenVisibleOpacity = ({ children, duration }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: duration }}
            variants={{
                visible: { opacity: 1, y: 0},
                hidden: { opacity: 0, y: 50} 
            }}
        >
            {children}
        </motion.div>
    );
}

