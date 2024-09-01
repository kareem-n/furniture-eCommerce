import registerImg from '../../assets/register.png';
import { Form, Formik } from 'formik';
import Input from './../../components/Input/Input';

import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '../../redux/slices/userSlice/CAT/createUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';


function Register() {


    const dispatch = useDispatch();
    const nav = useNavigate();

    const { user, newUserLoading } = useSelector(s => s.userSlice);

    console.log(user);


    const inputs = [
        { label: 'name', type: 'text' },
        { label: 'phone', type: 'text' },
        { label: 'email', type: 'email' },
        { label: 'password', type: 'password' },
    ]

    useEffect(() => {


        if (user) {
            nav('/');
        }

    }, [dispatch, user, nav])


    const reigsterValidation = Yup.object({
        name: Yup.string().required("name is required"),
        email: Yup.string().email("email is not valid").required("email is required"),
        phone: Yup.string().matches(/^(\+20|0)?1[0125]\d{8}$/, "phone number is not correct").required("phone number is required"),
        password: Yup.string().min(6, "password must contain at least 6 digits").required("password is required"),
    })

    return (
        <div
            className="px-48 flex items-center gap-x-10"

        >


            <div className="w-1/2">
                <img src={registerImg} className="w-full block" alt="" />
            </div>

            <div className="w-1/2">
                <div className="relative py-2">
                    <h3 className='text-4xl font-bold uppercase'>join furniture now</h3>
                    <p className='text-gray-600 text-lg mt-2'>
                        Create account on furniture and keep in touch with all new products
                    </p>


                    <span className='h-[1px] bg-black absolute left-0 right-0 top-full'></span>
                </div>

                <div className="mt-7 ">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            phone: ''
                        }}
                        validationSchema={reigsterValidation}

                        onSubmit={(values) => {
                            dispatch(createNewUser(values))
                        }}

                    >
                        {({ setFieldValue, errors, touched }) => (
                            <Form>
                                <div className="flex flex-col gap-y-4">
                                    {
                                        inputs.map((input, index) => <Input
                                            key={index}
                                            label={input.label}
                                            type={input.type}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                        />
                                        )
                                    }
                                </div>
                                <div className="flex justify-center">
                                    <button type='submit' className='mt-5 bg-theme px-6 py-3 rounded-full text-white font-bold text-xl'>create new account</button>

                                </div>



                            </Form>
                        )}


                    </Formik>
                </div>



            </div>
            {
                newUserLoading && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <Bars width={100} height={100} />
                </div>
            }

        </div>
    )
}

export default Register