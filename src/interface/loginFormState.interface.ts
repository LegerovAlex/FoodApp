export interface LoginFormState {
    values: {
        password: string;
        email: string;
    },
    errors: {
        password: string | null;
        email: string | null;
    }
}