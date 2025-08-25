"use client";

import React from 'react';
import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode,
    delay?: number
    className?: string
    'data-sanity'?: string
}

const BasicAppearance = ({ children, className, delay = 0, 'data-sanity': dataSanity }: Props) => {
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
            data-sanity={dataSanity}
        >
            {children}
        </motion.div>
    )
}

export default BasicAppearance