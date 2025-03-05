import { motion } from "framer-motion";
import { Github, Search, Sparkles, TrendingUp, Users } from "lucide-react";

export default function EmptyState() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const featureCards = [
    {
      icon: <TrendingUp size={24} className="text-blue-400" />,
      title: "Tendances",
      description: "Découvrez les dépôts les plus populaires et suivez les tendances"
    },
    {
      icon: <Sparkles size={24} className="text-amber-400" />,
      title: "Filtrage avancé",
      description: "Filtrez par type, étoiles, forks et trouvez exactement ce que vous cherchez"
    },
    {
      icon: <Users size={24} className="text-green-400" />,
      title: "Profils détaillés",
      description: "Explorez les contributions des développeurs et leurs projets"
    }
  ];

  const popularUsers = [
    "facebook", "google", "microsoft", "apple", "amazon", "netflix"
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <motion.div
        variants={itemVariants}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-2 bg-blue-600/20 rounded-full mb-6">
          <Search size={24} className="text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Recherchez un utilisateur GitHub pour commencer
        </h2>
        <p className="text-xl text-gray-400">
          Entrez un nom d'utilisateur dans la barre de recherche ci-dessus pour explorer ses dépôts publics et privés
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {featureCards.map((card, index) => (
          <div 
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
          >
            <div className="flex items-center mb-4">
              {card.icon}
              <h3 className="text-xl font-semibold ml-2">{card.title}</h3>
            </div>
            <p className="text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Github size={24} className="text-blue-400 mr-2" />
            <h3 className="text-xl font-semibold">Suggestions populaires</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularUsers.map((user) => (
              <a 
                key={user}
                href={`?username=${user}`}
                className="px-4 py-2 bg-gray-700 hover:bg-blue-600 rounded-full text-gray-300 hover:text-white transition-colors duration-300"
              >
                {user}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="text-center text-gray-500 text-sm"
      >
        <p>Explorez des millions de dépôts et découvrez des projets incroyables</p>
      </motion.div>
    </motion.div>
  );
}