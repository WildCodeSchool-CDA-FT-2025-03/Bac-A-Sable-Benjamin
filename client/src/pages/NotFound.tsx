import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Github, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    // Compte à rebours avant redirection
    if (count <= 0) {
      window.location.href = '/';
      return;
    }
    
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [count]);

  // Animation variants
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 opacity-30 rounded-3xl"></div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-2xl mx-auto text-center px-6 py-12 bg-gray-800/70 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              animate="float"
              variants={floatVariants}
              className="relative"
            >
              <motion.div
                animate="pulse"
                variants={pulseVariants}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
              ></motion.div>
              <AlertTriangle size={80} className="text-red-500" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight text-white"
          >
            404
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-300"
          >
            Page introuvable
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-8"
          >
            La page que vous recherchez n'existe pas ou a été déplacée.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300"
              >
                <Home size={18} />
                Retour à l'accueil
              </motion.button>
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300"
              >
                <Github size={18} />
                Visiter GitHub
              </motion.button>
            </a>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-500 text-sm"
          >
            Redirection automatique dans {count} secondes...
          </motion.p>
          
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${count * 10}%` }}
            className="h-1 bg-blue-500 mt-3 rounded-full"
            transition={{ duration: 1, ease: "linear" }}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}