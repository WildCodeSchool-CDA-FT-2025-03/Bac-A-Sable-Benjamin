import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { getRepos, Repo } from '../services/github';
import Hero from '../components/homepage/Hero';
import Cards from '../components/homepage/Cards';
import Pagination from '../components/homepage/Pagination';
import FilterSort from '../components/homepage/FilterSort';
import EmptyState from '../components/homepage/EmptyState';

export default function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const username = searchParams.get('username') || '';
    const pageParam = searchParams.get('page');
    const filterParam = searchParams.get('filter') || 'all';
    const sortParam = searchParams.get('sort') || 'name';
    
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userFound, setUserFound] = useState(false);
    
    const [totalRepos, setTotalRepos] = useState<Repo[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
    const [paginatedRepos, setPaginatedRepos] = useState<Repo[]>([]);
    const reposPerPage = 9;

    useEffect(() => {
        if (username) {
            setIsLoading(true);
            setError('');
            
            getRepos(username)
                .then((data) => {
                    setIsLoading(false);
                    setTotalRepos(data.repos);
                    setUserFound(true);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.message || 'Une erreur est survenue');
                    setTotalRepos([]);
                });
        }
    }, [username]);

    useEffect(() => {
        let result = [...totalRepos];
        
        switch (filterParam) {
            case 'public':
                result = result.filter(repo => !repo.isPrivate);
                break;
            case 'private':
                result = result.filter(repo => repo.isPrivate);
                break;
            case 'hasStars':
                result = result.filter(repo => repo.stargazerCount > 0);
                break;
            case 'hasForks':
                result = result.filter(repo => repo.forkCount > 0);
                break;
            default:
                break;
        }
        
        switch (sortParam) {
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'stars':
                result.sort((a, b) => b.stargazerCount - a.stargazerCount);
                break;
            case 'forks':
                result.sort((a, b) => b.forkCount - a.forkCount);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            default:
                break;
        }
        
        setFilteredRepos(result);
    }, [totalRepos, filterParam, sortParam]);

    useEffect(() => {
        const indexOfLastRepo = currentPage * reposPerPage;
        const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
        setPaginatedRepos(filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo));
        
        const maxPage = Math.max(1, Math.ceil(filteredRepos.length / reposPerPage));
        if (currentPage > maxPage && maxPage > 0) {
            handlePageChange(1);
        }
    }, [filteredRepos, currentPage]);

    const totalPages = Math.max(1, Math.ceil(filteredRepos.length / reposPerPage));

    const handlePageChange = (pageNumber: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', pageNumber.toString());
        setSearchParams(newParams);
    };

    const handleFilterChange = (filter: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('filter', filter);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handleSortChange = (sort: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', sort);
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Hero isLoading={isLoading} />

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

                <AnimatePresence mode="wait">
                    {totalRepos.length > 0 && (
                        <motion.div
                            key="repos-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-300">
                                    {totalRepos.length} dépôts trouvés pour <span className="text-blue-400">{username}</span>
                                </h2>
                                <div className="text-gray-400">
                                    {filteredRepos.length !== totalRepos.length && 
                                        `${filteredRepos.length} affichés • `}
                                    Page {currentPage} sur {totalPages}
                                </div>
                            </div>

                            <FilterSort 
                                onFilterChange={handleFilterChange}
                                onSortChange={handleSortChange}
                                currentFilter={filterParam}
                                currentSort={sortParam}
                            />

                            {paginatedRepos.length > 0 ? (
                                <>
                                    <Cards repos={paginatedRepos} />
                                    
                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700"
                                >
                                    <p className="text-xl text-gray-400">
                                        Aucun dépôt ne correspond aux critères de filtre sélectionnés.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
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
                        />
                    </motion.div>
                )}

                {!username && !isLoading && (
                    <EmptyState />
                )}
                
                {userFound && totalRepos.length === 0 && !isLoading && (
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
}