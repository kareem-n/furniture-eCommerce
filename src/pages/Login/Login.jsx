
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMSG, setIsLoginSectionOpened, setUser } from '../../redux/slices/userSlice/userSlice';
import Input from './../../components/Input/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import client from '../../utils/sanityClient';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
function Login() {

  const { errorMSG } = useSelector(s => s.userSlice);
  console.log(errorMSG);


  // console.log(isLoginSectionOpened);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (errorMSG)
      toast.error(errorMSG)

  }, [errorMSG])

  const loginInputs = [
    { type: 'email', label: 'email' },
    { type: 'password', label: 'password' },
  ]


  const validation = Yup.object({
    email: Yup.string().email("enter valid email").required("email is required"),
    password: Yup.string().min(4, "password not valid").required("password is required")
  })

  return <>
    {

      <div className="fixed inset-0 z-50">
        <Toaster />
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{

            opacity: 1
          }}
          exit={{
            scale: 0
          }}

          onClick={() => {
            toast.dismiss();
            dispatch(setErrorMSG(null))
            dispatch(setIsLoginSectionOpened(false));
          }}

          className="bg-black bg-opacity-30 cursor-pointer absolute inset-0 p-20">

        </motion.div>
        <motion.div
          initial={{
            left: '100%'
          }}
          animate={{
            left: '',
            right: '0'
          }}
          exit={{
            left: '100%'
          }}

          transition={{
            duration: 0.5
          }}

          className="p-10 z-50  w-[400px] absolute top-0 bottom-0 bg-zinc-300">

          <h2 className='text-3xl text-center font-bold'>welcome back <br /> login Now</h2>
          <p className='text-center mt-2 text-gray-500'>Get a more personalized experience where you don’t need to fill in your info every time</p>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}

            validationSchema={validation}


            onSubmit={(values) => {
              console.log(values);
              setLoading(true);
              client.fetch(`*[_type == 'user' && email == '${values.email}' && password == '${values.password}'][0]`)
                .then(res => {
                  if (res) {
                    localStorage.setItem("userID", res._id)
                    dispatch(setUser(res))
                    dispatch(setIsLoginSectionOpened(false))
                    // console.log(res);
                  } else {
                    setError("email or password is wrong")
                  }
                  setLoading(false);

                })
                .catch(error => {
                  console.log(error);
                  setError("something went wrong! try again")
                  setLoading(false);


                })

            }}


          >
            {
              ({ handleSubmit, setFieldValue, errors, touched }) => (
                <Form onSubmit={handleSubmit}>

                  <div className="mt-5 flex flex-col gap-y-4">
                    {
                      loginInputs.map((input, index) => <Input
                        key={index}
                        label={input.label}
                        type={input.type}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                      />)
                    }


                    <div className="mt-4 flex flex-col gap-y-3">
                      {
                        error && <div className="bg-red-500 py-3 text-white px-3 rounded-md">
                          {error}
                        </div>
                      }
                      <button type={'submit'} className='bg-theme text-white font-bold py-3 rounded-full'>
                        {
                          loading ? <div className="flex items-center justify-center">
                            <Bars width={30} height={30} color='#fff' />
                          </div> : 'Login'
                        }

                      </button>
                      <button className='border border-theme py-3 rounded-full text-theme font-bold'>
                        Create account
                      </button>
                    </div>

                    {/* <Input ></Input> */}
                  </div>

                </Form>
              )
            }


          </Formik>

        </motion.div>
      </div>
    }
  </>
}

export default Login