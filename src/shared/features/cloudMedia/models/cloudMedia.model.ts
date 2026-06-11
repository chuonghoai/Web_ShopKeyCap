export interface SignatureResponse {
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    expiresIn?: number;
}

export interface CloudinaryUploadResponse {
    public_id: string;
    secure_url: string;
    format: string;
    resource_type: string;
    bytes: number;
    width?: number;
    height?: number;
    tags?: string[];
}

export interface SaveMediaRequest {
    public_id: string;
    secure_url: string;
    resource_type: string;
    format: string;
    bytes: number;
    width?: number;
    height?: number;
}

export interface MediaEntity {
    id: number;
    url: string;        // Đây chính là secure_url trong table medias
}
