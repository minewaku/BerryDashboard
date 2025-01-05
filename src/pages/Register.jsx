import { FaDashcube } from 'react-icons/fa6';
import { TextField } from '~/components/Input';
import { Paper } from '~/components/Paper';
import { Button } from '~/components/Button';
import { Controller, useForm } from 'react-hook-form';
import { login } from '~/services';
import { Link } from 'react-router-dom';

const Register = () => {
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
            const response = await register(data);
            console.log('login response: ', response);
        } catch (error) {
            var errorMessage = 'An error occurred';
            if (error.response.status === 400) {
                errorMessage = 'Verify Your Email & Password';
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

                        <div className="mb-2 items-center text-center text-2xl font-bold text-skin-primary">Hello! Nice to meet you!</div>
                    </div>

                    <div className="">
                        <form onSubmit={(e) => handleSubmit(e, login)} className="flex w-full flex-col p-4">
                            <div className="flex w-[420px] flex-col justify-between shadow-sm">
                                <div className="w-full pb-4">
                                    <TextField className="bg-search_bg" id="username" label="Username" name="username" onChange={handleChange} fullWidth />
                                </div>

                                <div className="w-full pb-4">
                                    <TextField className="bg-search_bg" id="email" label="Email" name="email" onChange={handleChange} fullWidth />
                                </div>

                                <div className="w-full pb-4">
                                    <TextField className="bg-search_bg" type="password" id="password" label="Password" name="password" onChange={handleChange} fullWidth />
                                </div>

                                <div className="w-full">
                                    <TextField className="bg-search_bg" type="password" id="confirm_password" label="Confirm password" name="confirm_password" fullWidth />
                                </div>
                            </div>

                            <div className="text-md mb-8 mt-5 flex justify-between">
                                <label className="flex align-middle hover:cursor-pointer">
                                    <input type="checkbox" className="me-2 scale-125 hover:cursor-pointer" />
                                    <span>
                                        <span>Argee with </span>
                                        <Link className="font-bold text-skin underline">Terms and condition</Link>
                                    </span>
                                </label>
                            </div>

                            <div className="mb-2 flex items-center justify-center">
                                <Button type="submit" variant="base" color="primary" className="w-full">
                                    Sign up
                                </Button>
                            </div>

                            <Link to="/login" className="my-4 text-center font-medium text-skin">
                                Already have an account?
                            </Link>
                        </form>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Register;
