import { FaDashcube } from 'react-icons/fa6';
import { Paper } from '~/components/Paper';
import { TextField } from '~/components/Input';
import { Controller, useForm } from 'react-hook-form';
import { login } from '~/services/authService';
import { Link } from 'react-router-dom';
import { Button } from '~/components/Button';

const Login = () => {
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,

        formState: { isSubmitting, errors },
    } = useForm();

    console.log('re-rendered');

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            console.log('login response: ', response);
        } catch (error) {
            console.log('error in login: ', error);
            var errorMessage = 'An error occurred';
            if (error.status === 401) {
                errorMessage = 'Verify Your Email & Password';
            } else if (error.status === 403) {
                errorMessage = 'Your account is currently blocked. Please contact support for assistance.';
            }

            setError('apiError', { type: 'manual', message: errorMessage });
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-skin-secondary-inverted">
            <Paper className="text-txt rounded-md bg-skin-base">
                <div className="mx-3">
                    <div className="">
                        <div className="my-8 mb-8 flex flex-row items-center justify-center text-xl">
                            <FaDashcube className="text-skin-secondary" />
                            <span className="ms-2 font-bold text-skin-utility-logo">ADMIN</span>
                        </div>

                        <div className="mb-2 items-center text-center text-2xl font-bold text-skin-primary">Hi! Welcome back!</div>
                    </div>

                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col p-4">
                            <div className="flex w-[420px] flex-col justify-between">
                                <div className="w-full pb-4">
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: { value: true, message: 'Email is required' },
                                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Must be a valid email' },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (errors.apiError) {
                                                        clearErrors('apiError');
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                                type="text"
                                                id="email"
                                                label="Email"
                                                name="email"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                <div className="w-full">
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: { value: true, message: 'Password is required' },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (errors.apiError) {
                                                        clearErrors('apiError');
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                                type="password"
                                                id="password"
                                                label="Password"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="text-md mb-8 mt-5 flex justify-between align-middle">
                                <label className="flex items-center text-skin hover:cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="me-2 h-4 w-4 appearance-none rounded-[20%] border-2 border-skin bg-skin-base accent-skin-primary checked:border-skin-primary checked:bg-skin-primary checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkgMTYuMTcgNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] checked:bg-[length:16px_16px] checked:bg-center checked:bg-no-repeat hover:cursor-pointer"
                                    />
                                    <span>Keep me logged in?</span>
                                </label>

                                <Link className="font-medium text-skin-primary">Forgot password?</Link>
                            </div>

                            <div className="mb-4 text-xs font-medium text-skin-error">{errors.apiError && <span>{errors.apiError.message}</span>}</div>

                            <div className="mb-2 flex items-center justify-center">
                                <Button type="submit" variant="base" color="primary" disabled={isSubmitting} className="w-full">
                                    Sign in
                                </Button>
                            </div>

                            <Link to="/register" className="my-4 text-center font-medium text-skin">
                                Don't have an account?
                            </Link>
                        </form>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Login;
