import { axiosApi } from "./AxiosInstance"

type ProviderCategory = "BUY" | "RENT"

export interface MovieProvider {
    id: number;
    logoPath: string;
    name: string;
    categories: ProviderCategory[] // buy, rent,
}

async function getMovieProviders(movieId: number): Promise<MovieProvider[]> {
    try {
        let providersMap = new Map<number, MovieProvider>()

        const result = await axiosApi.get(`/movie/${movieId}/watch/providers`)
        const brProviders = result.data.results.BR;

        if (!brProviders) {
            return []
        }

        const providersBuy: any[] = brProviders.buy
        const providersRent: any[] = brProviders.rent

        if (providersBuy) {
            providersBuy.map(prov => {
                const currentProvider = providersMap.get(prov.provider_id) 
                if (currentProvider) {
                    currentProvider.categories.push("BUY")
                    providersMap.set(prov.provider_id, currentProvider)
                } else {
                    const myProvider: MovieProvider = {
                        id: prov.provider_id, 
                        logoPath: prov.logo_path, 
                        name: prov.provider_name, 
                        categories: ["BUY"]
                    }
                    providersMap.set(myProvider.id, myProvider)
                }
            })
        }
        
        if (providersRent) {
            providersRent.map(prov => {
                const currentProvider = providersMap.get(prov.provider_id) 
                if (currentProvider) {
                    currentProvider.categories.push("RENT")
                    providersMap.set(prov.provider_id, currentProvider)
                } else {
                    const myProvider: MovieProvider = {
                        id: prov.provider_id, 
                        logoPath: prov.logo_path, 
                        name: prov.provider_name, 
                        categories: ["RENT"]
                    }
                    providersMap.set(myProvider.id, myProvider)
                }
            })
        }
        

        let array: MovieProvider[] = []
        for (const value of providersMap.values()) {
            array.push(value)
        }

        return array
    } catch (error) {
        console.log(error)
        throw new Error("Erro ao pegar informações do filme com id " + movieId + ".")
    } 
}

export { getMovieProviders }