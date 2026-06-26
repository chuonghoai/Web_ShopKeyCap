import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { StaffModel } from '../../../features/staff/models/staff.model';

interface UseStaffFormControllerProps {
    mode: 'create' | 'edit';
    initialData?: StaffModel;
    onSubmit: (data: any) => void;
}

export const useStaffFormController = ({ mode, initialData, onSubmit }: UseStaffFormControllerProps) => {
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phonenumber: '',
            dob: '',
            gender: 'MALE',
            salary: 0
        }
    });

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            form.reset({
                name: initialData.name,
                email: initialData.email,
                phonenumber: initialData.phonenumber,
                dob: new Date(initialData.dob).toISOString().split('T')[0],
                gender: initialData.gender,
                salary: initialData.salary
            });
        } else {
            form.reset({
                name: '',
                email: '',
                phonenumber: '',
                dob: '',
                gender: 'MALE',
                salary: 0
            });
        }
    }, [mode, initialData, form.reset]);

    const handleFormSubmit = form.handleSubmit((data: any) => {
        const payload = {
            name: data.name,
            email: data.email,
            phonenumber: data.phonenumber,
            dob: new Date(data.dob),
            gender: data.gender,
            salary: Number(data.salary)
        };

        if (mode === 'edit' && initialData) {
            onSubmit({ id: initialData.id, ...payload });
        } else {
            onSubmit(payload);
        }
    });

    return {
        register: form.register,
        errors: form.formState.errors,
        handleFormSubmit
    };
};
