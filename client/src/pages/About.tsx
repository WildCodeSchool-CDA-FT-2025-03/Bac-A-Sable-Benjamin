import { motion } from 'framer-motion';
import { Github, ExternalLink, BookOpen, Code, Briefcase, HeartHandshake } from 'lucide-react';

export default function About() {
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-20">
      <div className="relative overflow-hidden py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 opacity-50"></div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              À propos du projet
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Un explorateur de dépôts GitHub créé dans le cadre d'une formation
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-12 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <Github size={32} className="text-blue-400 mr-3" />
              <h2 className="text-3xl font-bold">GitHub Repo Explorer</h2>
            </div>
            
            <p className="text-gray-300 text-lg mb-6">
              Ce projet a été développé pour la Wild Code School dans le cadre de la formation 
              Concepteur Développeur d'Applications (CDA). Il s'agit d'une application web qui permet 
              d'explorer facilement les dépôts GitHub d'un utilisateur, avec des fonctionnalités de 
              filtrage et de tri.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">React</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">Express</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">GitHub API</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">Framer Motion</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300">Tailwind CSS</span>
            </div>
            
            <p className="text-gray-400 mb-4">
              Ce projet utilise l'API GitHub pour récupérer les informations des dépôts et les afficher
              de manière interactive et responsive. Il inclut des fonctionnalités comme la pagination,
              le filtrage par type de dépôt, et le tri par différents critères.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <a 
              href="https://www.wildcodeschool.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <BookOpen size={24} className="text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">Wild Code School</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Une école innovante de développement web et mobile qui forme des développeurs et des data analysts.
              </p>
              <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                <span>Visiter le site</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </a>
            
            <a 
              href="https://www.wildcodeschool.com/fr-fr/formation-developpeur-javascript-react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <Briefcase size={24} className="text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">Formation CDA</h3>
              </div>
              <p className="text-gray-400 mb-4">
                La formation Concepteur Développeur d'Applications forme des développeurs full-stack polyvalents.
              </p>
              <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                <span>En savoir plus</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </a>
            
            <a 
              href="https://github.com/dilgo-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <Code size={24} className="text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">dilgo-dev</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Découvrez d'autres projets et contributions sur mon profil GitHub.
              </p>
              <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                <span>Voir le profil</span>
                <ExternalLink size={14} className="ml-1" />
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gray-700"></div>
              <HeartHandshake size={24} className="text-blue-400 mx-4" />
              <div className="h-px w-12 bg-gray-700"></div>
            </div>
            
            <p className="text-gray-400 mb-4">
              Merci de votre visite ! N'hésitez pas à explorer le code source de ce projet et à me contacter pour toute question ou suggestion.
            </p>
            
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} - Projet réalisé par dilgo-dev pour la Wild Code School
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}