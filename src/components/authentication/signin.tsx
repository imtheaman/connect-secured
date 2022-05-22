import { useState, ReactNode, useReducer, useEffect } from 'react';
import ConnectCard from '../connect-card/ConnectCard';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CHECK_EMAIL,
  CHECK_USERNAME,
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
} from '../../apollo/queries';
import Loader from '../loader/Loader';
import { genKeyPair, hash } from '../../encryption';
import { useCookies } from 'react-cookie';

type State = {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
  username: string;
  profilePic: File;
};
const reducer = (
  state: State,
  action: {
    type:
      | 'NAME'
      | 'EMAIL'
      | 'PASSWORD'
      | 'REPEAT_PASSWORD'
      | 'USERNAME'
      | 'PROFILE_PIC';
    payload: any;
  }
) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: action.payload };
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'USERNAME':
      return { ...state, username: action.payload };
    case 'PROFILE_PIC':
      return { ...state, profilePic: action.payload };
    case 'REPEAT_PASSWORD':
      return { ...state, repeat_password: action.payload };
    default:
      return state;
  }
};

const capitalize = (value: string) => {
  if (!value) return value;
  const words = value.split(' ');
  const capitalized: string[] = [];
  words.forEach((el) => {
    el && capitalized.push(el[0].toUpperCase() + el.slice(1, el.length));
  });
  return capitalized.join(' ');
};

const Signin: React.FC = () => {
  const [authAction, setAuthAction] = useState<
    'Sign in' | 'Sign up' | 'Send OTP' | 'Reset' | 'Create User'
  >('Sign in');
  const navigate = useNavigate()
  const [cookies,setCookie] = useCookies(['token', 'privateKey'])
  const [modal, setModal] = useState<ReactNode | false>(false);
  
  const [createUser, { data: createdUser, loading: loading2, error: error2 }] =
    useMutation(CREATE_USER);
  const [getUser, { data: loggedUser, loading, error: error1 }] =
    useLazyQuery(GET_USER);
  const [checkEmail, { data: validEmail }] = useLazyQuery(CHECK_EMAIL);
  const [checkUsername, { data: validUsername }] = useLazyQuery(CHECK_USERNAME);
  const [updateUser] = useMutation(UPDATE_USER)
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
    username: '',
    profilePic: null,
  });

  useEffect(() => {
    if (loggedUser) {
      setCookie('token', loggedUser.getUser._id, {sameSite: true})
      localStorage.setItem('user', JSON.stringify(loggedUser.getUser))
      dispatch({ type: 'EMAIL', payload: '' });
      dispatch({ type: 'PASSWORD', payload: '' });
      if (!cookies.privateKey) {
        (async() => {
          const keys: { publicKey: string; privateKey: string } = await genKeyPair();
          await updateUser({variables: {token: loggedUser.getUser._id, update: {publicKey: keys.publicKey}}})
          setCookie('privateKey', keys.privateKey)
        })()}
      navigate('/',{replace: true})
    }
    else if (error1) setModal(
      <p className='text-red-500'>
        {error1.message}
      </p>
    );
    else if (createdUser) {
      setCookie('token', createdUser.createUser._id)
      dispatch({ type: 'NAME', payload: '' });
      dispatch({ type: 'EMAIL', payload: '' });
      dispatch({ type: 'PASSWORD', payload: '' });
      dispatch({ type: 'REPEAT_PASSWORD', payload: '' });
      dispatch({ type: 'USERNAME', payload: '' });
      dispatch({ type: 'PROFILE_PIC', payload: '' });
      navigate('/',{replace: true})
    }
    else if (error2) setModal(
      <p className='text-red-500'>
        {error2.message}
      </p>
    );
    cookies.token && navigate('/', {replace: true})
  }, [loggedUser, createdUser, error1, error2])

  useEffect(() => {
    if (authAction === 'Sign up') checkEmail({ variables: { email: state.email } });
    if (authAction === 'Create User') checkUsername({ variables: { username: state.username } });
  }, [state.email, state.username]);

  const isEmail = (value: string): boolean => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(value)
  }

  const validatedEmail = authAction === 'Sign up' && isEmail(state.email) &&
  (validEmail?.checkEmail === false ?
  'ring-1 ring-red-500': validEmail?.checkEmail === true ? 'ring-1 ring-green-500': '')

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!state.email) {
      setModal(<p>Email can't be empty</p>)
      return;
    }
    else if (!isEmail(state.email)) {
      setModal(<p>Please enter a valid email</p>);
      return;
    }
    
    switch (authAction) {
      case 'Sign in':
        if (!state.password) setModal(<p>Please fill all the required details</p>);
        else {
          const loginDetails = {
            email: state.email,
            password: hash(state.password),
          };
          getUser({ variables: loginDetails });
          if (error1) setModal(<p className='text-red-500'>
          {error1.message}
        </p>)
        }
        return;
      case 'Sign up':
        if (
          !(
            state.name &&
            state.password &&
            state.repeat_password
          )
        )
          setModal(<p>Please fill all the required details</p>);
          else if (validEmail.checkEmail === false) setModal(<p>Email is already registered.</p>)
        else
          state.password === state.repeat_password
            ? setAuthAction('Create User')
            : setModal(<p>Passwords don't match</p>);
        return;
      case 'Create User':
        if (!(state.profilePic && state.username))
          setModal(<p>Please fill all the required details</p>);
        else if (validUsername.checkUsername === false)
          setModal(<p>Username is taken. Choose another one</p>);
        else {
          const {countryName, stateProv} = await fetch(
            'https://api.db-ip.com/v2/free/self'
          ).then((res) => res.json()).catch(err => console.error(err))

          const keys: { publicKey: string; privateKey: string } = await genKeyPair();
          setCookie('privateKey', keys.privateKey)
          // image upload code
          const { name, email, password, profilePic, username } = state;
          const userDetails = {
            name: capitalize(name),
            email,
            password: hash(password),
            username,
            profilePic,
            publicKey: keys.publicKey,
            country: countryName || '',
            state: stateProv || '',
          };
          createUser({ variables: userDetails });
        }
        return;
      case 'Send OTP':
      case 'Reset':
        if (state.email) {
          dispatch({ type: 'EMAIL', payload: '' });
        } else setModal(<p>Please fill all the required details</p>);
        return;
    }
  };
  return (
    <ConnectCard className='grid grid-cols-1 md:grid-cols-2'>
      {modal && (
        <Modal className='text-center' showModal={setModal}>
          {modal}
        </Modal>
      )}
      <div className='flex flex-col space-y-6 border-b pb-8 md:pb-0 md:border-b-0 md:border-r border-gray-300 md:pr-16'>
        <div className='flex items-center justify-between mb-3'>
          <div
            className={
              authAction === 'Sign up' || authAction === 'Create User'
                ? 'text-lg font-light cursor-pointer'
                : 'text-2xl font-semibold cursor-pointer'
            }
            onClick={() => setAuthAction('Sign in')}
          >
            Email signin
          </div>
          <div className='border-r w-1 h-8 border-gray-300'></div>
          <div
            className={
              authAction === 'Sign up' || authAction === 'Create User'
                ? 'text-2xl font-semibold cursor-pointer'
                : 'text-lg font-light cursor-pointer'
            }
            onClick={() => setAuthAction('Sign up')}
          >
            Create account
          </div>
        </div>
        <form className='flex flex-col space-y-6'>
          {authAction === 'Sign up' && (
            <>
              <input
                type='text'
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: 'NAME', payload: e.target.value })
                }
                className='input'
                placeholder='Full name'
              />
            </>
          )}
          {authAction !== 'Create User' && (
            <input
              type='email'
              value={state.email}
              onChange={(e) =>
                dispatch({ type: 'EMAIL', payload: e.target.value.toLowerCase() })
              }
              className={`input ${
                validatedEmail
              }`}
              placeholder='Email'
            />
          )}
          {(authAction === 'Sign in' || authAction === 'Sign up') && (
            <input
              type='password'
              value={state.password}
              onChange={(e) =>
                dispatch({ type: 'PASSWORD', payload: e.target.value })
              }
              className='input'
              placeholder='Password'
            />
          )}
          {authAction === 'Sign up' && (
            <input
              type='password'
              value={state.repeat_password}
              onChange={(e) =>
                dispatch({ type: 'REPEAT_PASSWORD', payload: e.target.value })
              }
              className='input'
              placeholder='Confirm Password'
            />
          )}
          {authAction === 'Create User' && (
            <>
              <div className='relative w-32 h-32 overflow-hidden mx-auto'>
                <img
                  src={state.profilePic}
                  className={`w-full h-full border-2 absolute top-0 rounded-full object-cover ${
                    !state.profilePic && 'bg-gray-100'
                  }`}
                />
                {!state.profilePic && (
                  <span className='absolute top-1/2 text-gray-500 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                    choose
                  </span>
                )}
                <input
                  type='file'
                  accept='image/*'
                  title=''
                  onChange={(e) => {
                    //@ts-ignore
                    const url = URL.createObjectURL(e.target.files[0]);
                    dispatch({
                      type: 'PROFILE_PIC',
                      payload: url,
                    });
                  }}
                  className='text-white file:w-32 file:h-32 file:rounded-full file:border-none opacity-0'
                  placeholder='Full name'
                />
              </div>
              <input
                type='text'
                value={state.username}
                onChange={(e) =>
                  dispatch({
                    type: 'USERNAME',
                    payload: e.target.value.trim().toLowerCase(),
                  })
                }
                className={`input ${
                  authAction === 'Create User' && state.username &&
                (validUsername?.checkUsername === false ?
                'ring-1 ring-red-500': validUsername?.checkUsername === true? 'ring-1 ring-green-500': '')
                }`}
                placeholder='Username'
              />
            </>
          )}

          <button type='submit' className='auth-btn' onClick={submitHandler}>
            {loading || loading2 ? <Loader /> : authAction}
          </button>
        </form>
        <div className='flex justify-between font-thin text-sm'>
          <button
            className='hover:underline'
            onClick={() => setAuthAction('Send OTP')}
          >
            Sign in with OTP
          </button>
          <button
            className='hover:underline'
            onClick={() => setAuthAction('Reset')}
          >
            Reset password
          </button>
        </div>
      </div>

      {/* Social signin */}
      <div className='pt-8 md:pl-16 md:pt-0 space-y-6 flex flex-col'>
        <h1 className='text-2xl font-semibold mb-3'>Social signin</h1>

        <button
          className='auth-btn'
          onClick={() =>
            setModal(
              "Apple didn't provide me developer license. so this feature isn't working right now."
            )
          }
        >
          <svg
            version='1.1'
            id='Livello_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            fill='rgb(255, 255, 255)'
            width='28px'
            height='22.79px'
            viewBox='0 0 814 1000'
            enableBackground='new 0 0 814 1000'
            xmlSpace='preserve'
          >
            <path
              d='M788.1,340.9c-5.8,4.5-108.2,62.2-108.2,190.5c0,148.4,130.3,200.9,134.2,202.2c-0.6,3.2-20.7,71.9-68.7,141.9
	c-42.8,61.6-87.5,123.1-155.5,123.1s-85.5-39.5-164-39.5c-76.5,0-103.7,40.8-165.9,40.8s-105.6-57-155.5-127
	C46.7,790.7,0,663,0,541.8c0-194.4,126.4-297.5,250.8-297.5c66.1,0,121.2,43.4,162.7,43.4c39.5,0,101.1-46,176.3-46
	C618.3,241.7,720.7,244.3,788.1,340.9z M554.1,159.4c31.1-36.9,53.1-88.1,53.1-139.3c0-7.1-0.6-14.3-1.9-20.1
	c-50.6,1.9-110.8,33.7-147.1,75.8c-28.5,32.4-55.1,83.6-55.1,135.5c0,7.8,1.3,15.6,1.9,18.1c3.2,0.6,8.4,1.3,13.6,1.3
	C464,230.7,521.1,200.3,554.1,159.4z'
            />
          </svg>
          <p className='ml-2'>Apple Sign in</p>
        </button>
        <button
          className='auth-btn'
          onClick={() =>
            setModal(
              'Only manual signin/signup with email and password is working right now.'
            )
          }
        >
          <img
            src='/github.png'
            alt='sign in with github'
            width={20}
            height={20}
          />
          <p className='ml-2'>Github Sign in</p>
        </button>
        <button
          className='auth-btn'
          onClick={() =>
            setModal(
              'Only manual signin/signup with email and password is working right now.'
            )
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='#fff'
          >
            <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
          </svg>
          <p className='ml-2'>LinkedIn Sign in</p>
        </button>
      </div>
    </ConnectCard>
  );
};
export default Signin;
