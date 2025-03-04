import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRepos, Repo } from '../services/github';
import Hero from '../components/homepage/Hero';
import Cards from '../components/homepage/Cards';

export default function Homepage() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userFound, setUserFound] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError('');
    setRepos([]);
    setUserFound(false);
    
    try {
      const data = await getRepos(username);
      
      setRepos(data.repos);
      setUserFound(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Erreur lors de la récupération des repos');
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Hero handleSearch={handleSearch} username={username} setUsername={setUsername} isLoading={isLoading} />

      <div className="container mx-auto px-4 py-12">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-8"
          >
            <p>{error}</p>
          </motion.div>
        )}

        <AnimatePresence>
          {repos.length > 0 ? (
            <Cards repos={repos} />
          ) : null}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            ></motion.div>
          </motion.div>
        )}
        
        {userFound && repos.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">
              Aucun dépôt trouvé pour cet utilisateur.
            </p>
          </motion.div>
        )}
      </div>  
    </div>
  );
};