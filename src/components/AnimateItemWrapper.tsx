import { motion, AnimatePresence } from "motion/react";
import { type ReactNode, Children, isValidElement, cloneElement } from "react";

interface AnimateItemWrapperProps {
    children: ReactNode;
}

export const AnimateItemWrapper = ({ children }: AnimateItemWrapperProps) => {
    return (
        <div>
            <AnimatePresence>
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) return null;

                    return (
                        <motion.div
                            key={child.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                        >
                            {cloneElement(child)}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
