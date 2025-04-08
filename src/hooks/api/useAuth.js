import { useMutation } from '@tanstack/react-query';
import { fetchAuthLogin } from '../../api/auth';

export const useAuthLogin = () => {
    return useMutation({
        mutationFn: fetchAuthLogin,
    });
};
