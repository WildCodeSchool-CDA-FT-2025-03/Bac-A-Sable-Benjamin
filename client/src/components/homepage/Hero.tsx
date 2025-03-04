import { motion } from "framer-motion";
import { Github, Search, LoaderCircle } from "lucide-react";

interface HeroProps {
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
    username: string;
    setUsername: (username: string) => void;
    isLoading: boolean;
}

export default function Hero({ handleSearch, username, setUsername, isLoading }: HeroProps) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 opacity-50"></div>
        
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Github size={60} className="text-blue-400" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              GitHub Repo Explorer
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Découvrez facilement tous les dépôts d'un utilisateur GitHub
            </motion.p>
            
            <motion.form 
              onSubmit={handleSearch}
              className="flex items-center max-w-xl mx-auto bg-gray-800 rounded-full overflow-hidden p-1 shadow-lg border border-gray-700"
              initial={{ opacity: 0, width: '80%' }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex-shrink-0 pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez un nom d'utilisateur GitHub..."
                className="w-full bg-transparent py-3 px-4 focus:outline-none text-white placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full flex items-center transition-colors duration-300"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LoaderCircle className="animate-spin h-5 w-5 text-white" />
                  </motion.div>
                ) : (
                  'Rechercher'
                )}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    );
}
