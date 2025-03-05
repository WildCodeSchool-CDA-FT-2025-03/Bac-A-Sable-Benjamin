import { motion } from "framer-motion";
import { Repo } from "../../services/github";
import Card from "./Card";

interface CardsProps {
  repos: Repo[];
}

export default function Cards({ repos }: CardsProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {repos.map((repo, index) => (
                <Card key={`${repo.name}-${index}`} repo={repo} />
            ))}
        </motion.div>
    );
}
