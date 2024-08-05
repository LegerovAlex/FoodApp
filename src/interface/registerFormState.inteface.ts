export interface registerFormState {
    values: {
        email: string;
        password: string;
        name: string;
    },
    errors: {
        email: string | null;
        password: string | null;
        name: string | null;
    }
}