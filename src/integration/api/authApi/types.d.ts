interface LoginResponse {
    token: string
    user: {
        role: string
    }
}

interface LoginRequest {
    username: string;
    password: string
}

export interface ProfileResponse {
    _id: string;
    fullName: string
    username: string
    role: string
    branch: string
    balance: number
    avatar: string
    debt: number
    phone: string
    address: string
    createdAt: string
    updatedAt: string
}


interface UpdateProfileResponse {
    _id: string;
    fullName: string
    username: string
    role: string
    branch: string
    balance: number
    avatar: string
    createdAt: string
    updatedAt: string
}

interface UpdateProfileRequest {
    id: string

    body: {
        fullName?: string | undefined
        username?: string | undefined
        password?: string | undefined
        avatar?: string | undefined
    }
}

interface UploadImageRequest {
    formData: FormData
}

interface UpdatePasswordResponse {
    _id: string;
    fullName: string
    username: string
    role: string
    branch: string
    balance: number
    avatar: string
    createdAt: string
    updatedAt: string
}

interface UpdatePasswordRequest {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}