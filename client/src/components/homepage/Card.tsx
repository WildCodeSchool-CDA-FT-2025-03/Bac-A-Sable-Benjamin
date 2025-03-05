import { motion } from "framer-motion";
import { Repo } from "../../services/github";
import { Lock, Globe, ExternalLink, Star, GitFork } from "lucide-react";

interface CardProps {
    repo: Repo;
}

export default function Card({ repo }: CardProps) {
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
            <motion.div
                variants={itemVariants}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {repo.isPrivate ? (
                        <Lock size={18} className="text-amber-400" />
                      ) : (
                        <Globe size={18} className="text-green-400" />
                      )}
                      <h3 className="text-xl font-semibold text-white truncate">
                        {repo.name}
                      </h3>
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                    {repo.description || "Aucune description disponible"}
                  </p>
                  
                  {repo.primaryLanguage && (
                    <div className="mb-4 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm text-gray-300">{repo.primaryLanguage.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-amber-400" />
                      <span>{repo.stargazerCount || 0}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <GitFork size={16} className="text-blue-400" />
                      <span>{repo.forkCount || 0}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {new Date(repo.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {repo.languages && repo.languages.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-xs text-gray-500 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {repo.languages.slice(0, 3).map((lang, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                          >
                            {lang.node.name}
                          </span>
                        ))}
                        {repo.languages.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                            +{repo.languages.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
    );
}
