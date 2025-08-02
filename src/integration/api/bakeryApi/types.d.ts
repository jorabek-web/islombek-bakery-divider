import { ProfileResponse } from "../authApi/types"

interface BakeryResponse {
    _id: string
    branch: string
    title: string
    balance: number
    createdAt: string
    updatedAt: string
    image: string
}

interface BakeryDoughResponse {
    _id: string;
    doughroom: DoughroomResponse;
    status: DoughStatus;
    driver?: ProfileResponse;
    bakery?: BakeryResponse;
    dividers?: ProfileResponse[];
    rounds?: number;
    baker?: ProfileResponse;
    baked?: number;
    left?: number;
    createdAt: string
    updatedAt: string
}


interface BakeryDoughsRequest {
    bakeryId: string,
    status: string[]
}

interface Breads {
    _id: string
    driver: string
    bakery: string
    breads: number
    createdAt: string
    updatedAt: string
    status: string
    toBakery: {
        title: string
    }
}

interface BakeryBreadsResponse {
    doughs: BakeryDoughResponse[]
    breads: Breads[]
}

interface BakeryBreadsRequest {
    bakeryId: string,
    breadStatus?: string[],
    doughStatus?: string[]
}

interface BakeryDivideResponse {
    _id: string
    createdAt: string
    updatedAt: string
}

interface BakeryDivideRequest {
    bakery: string
    dough: string
    rounds: number
    dividers: string[]
}

interface BakeryBakeResponse {
    _id: string
    createdAt: string
    updatedAt: string
}

interface BakeryBakeRequest {
    dough: string
    baked: number
    baker?: string
}

interface BakeryRedirectResponse {
    _id: string
    createdAt: string
    updatedAt: string
    redirect: string
}

interface BakeryRedirectRequest {
    dough: string
    driver: string
}

