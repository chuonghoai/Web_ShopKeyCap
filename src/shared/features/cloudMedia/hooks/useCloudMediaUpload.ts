import { useState } from 'react';
import { cloudMediaService } from '../services/cloudMedia.service';
import type { MediaEntity } from '../models/cloudMedia.model';

export const useCloudMediaUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Action: Upload multi files
     */
    const upload = async (files: File[]): Promise<MediaEntity[]> => {
        if (!files || files.length === 0) return [];

        setIsUploading(true);
        setError(null);

        try {
            const result = await cloudMediaService.upload(files);
            return result;
        } catch (err) {
            const errorObj = err instanceof Error ? err : new Error(String(err));
            setError(errorObj);
            throw errorObj;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        upload,
        isUploading,
        error
    };
};
