"use client";

import React from 'react';
import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode,
    delay?: number
    className?: string
}

const BasicAppearance = ({ children, className, delay = 0 }: Props) => {
    return (
        <motion.div
            initial={{
                opacity: 0, y: "10%",
            }}
            whileInView={{
                opacity: 1, y: "0%",
            }}
            viewport={{ once: true }}
            transition={{
                ease: "easeInOut",
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default BasicAppearance