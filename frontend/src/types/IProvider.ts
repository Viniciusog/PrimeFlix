export interface IProvider  {
    provider_id: number,
    logo_path: string,
    provider_name: string
}

export interface IRequisicaoProvider{
    BR ?: {
        flatrate?: IProvider[]
    }
    
}
