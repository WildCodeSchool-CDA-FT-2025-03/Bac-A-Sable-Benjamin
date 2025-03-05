/**
 * Service de cache en mémoire simple
 * Permet de stocker des données avec une durée de vie limitée
 */

export interface CacheItem<T> {
    data: T;
    timestamp: number;
  }
  
  export class CacheService {
    private store: Map<string, CacheItem<any>> = new Map();
    private ttl: number; // Time To Live en millisecondes
  
    /**
     * Crée une nouvelle instance du service de cache
     * @param ttlInMinutes Durée de vie du cache en minutes
     */
    constructor(ttlInMinutes: number = 60) {
      this.ttl = ttlInMinutes * 60 * 1000;
    }
  
    /**
     * Récupère une valeur du cache
     * @param key Clé de l'élément
     * @returns La valeur associée à la clé ou null si non trouvée ou expirée
     */
    get<T>(key: string): T | null {
      const item = this.store.get(key);
      
      if (!item) return null;
      
      // Vérifier si le cache est encore valide
      if (Date.now() - item.timestamp > this.ttl) {
        this.store.delete(key);
        return null;
      }
      
      return item.data as T;
    }
  
    /**
     * Définit une valeur dans le cache
     * @param key Clé de l'élément
     * @param data Données à mettre en cache
     */
    set<T>(key: string, data: T): void {
      this.store.set(key, {
        data,
        timestamp: Date.now()
      });
    }
  
    /**
     * Supprime un élément du cache
     * @param key Clé de l'élément à supprimer
     */
    invalidate(key: string): void {
      this.store.delete(key);
    }
  
    /**
     * Supprime tous les éléments du cache dont la clé commence par un préfixe donné
     * @param prefix Préfixe des clés à supprimer
     * @returns Nombre d'éléments supprimés
     */
    invalidateByPrefix(prefix: string): number {
      let count = 0;
      for (const key of this.store.keys()) {
        if (key.startsWith(prefix)) {
          this.store.delete(key);
          count++;
        }
      }
      return count;
    }
  
    /**
     * Vide complètement le cache
     */
    clear(): void {
      this.store.clear();
    }
  
    /**
     * Retourne des statistiques sur le cache
     */
    getStats() {
      const now = Date.now();
      let validItems = 0;
      let expiredItems = 0;
      
      this.store.forEach(item => {
        if (now - item.timestamp <= this.ttl) {
          validItems++;
        } else {
          expiredItems++;
        }
      });
      
      return {
        totalItems: this.store.size,
        validItems,
        expiredItems
      };
    }
}
  
export const defaultCache = new CacheService(30);