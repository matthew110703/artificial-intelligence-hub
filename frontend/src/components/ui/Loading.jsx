import Icon from "./Icon";
import { logo } from "../../assets";

// Motion
import { motion, AnimatePresence } from "motion/react";

const Loading = () => {
  return (
    <AnimatePresence>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <motion.div
          initial={{
            borderColor: "#15F5BA",
          }}
          animate={{
            borderWidth: [2, 4, 8, 16, 32, 16, 8, 4, 2],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="rounded-full border-double p-1.5"
        >
          <motion.div
            animate={{
              scale: [1, 0.99, 0.98, 0.96, 0.84, 0.96, 0.98, 0.99, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Icon src={logo} alt="logo" size={48} invert />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Loading;
