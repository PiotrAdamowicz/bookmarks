// PageWrapper.tsx
import { motion } from "motion/react";
import type { ReactNode } from "react";

const variants = {
    initial: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

export const PageAnimationWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="h-full w-full"
        >
            {children}
        </motion.div>
    );
};
