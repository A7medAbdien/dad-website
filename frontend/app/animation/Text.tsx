

import { motion } from "framer-motion";
import { useLang } from "@/app/context/useLang";

type Props = {
    children: string,
    className?: string,
    staggerChildren?: number,
    delayChildren?: number,
    delay?: number,
    lineHeight?: string;
    wordsSpacing?: string;
    once?: boolean;
}

const Text = ({ children, className, staggerChildren = 0.05, delayChildren = 0.1, delay = 0, lineHeight = "h-fit", wordsSpacing = "mr-[0.5rem]", once = true }: Props) => {

    const { lang } = useLang()
    const words = children.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: staggerChildren, delayChildren: delay + delayChildren * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: "0%",
        },
        hidden: {
            opacity: 0,
            y: "100%",
        },
    };

    return (
        <motion.div
            className={`flex-wrap ${className}`}
            style={{ display: "flex" }}
            variants={container}
            viewport={once ? { once: true } : undefined}
            initial="hidden"
            whileInView="visible"
        >
            {
                words.map((word, index) => (
                    <span key={index}
                        className={`overflow-hidden ${lang == 'ar' && 'pt-[0.5rem]'} ${lineHeight} flex`}
                    >
                        <motion.span
                            style={{ lineHeight: "normal" }}
                            className={`${wordsSpacing}`}
                            variants={child}
                            transition={{ ease: "easeOut", duration: 0.5 }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))
            }
        </motion.div >
    );
};

export default Text;