import React, { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { AuthProps, UserProfile, AuthContextType } from 'types/auth';
import { maskPassword } from 'utils/auth';

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (token) => {
  if (!token) {
    return false;
  }
  return true;
  //   const decoded: KeyedObject = jwtDecode(token);
  //   /**
  //    * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
  //    */
  //   return decoded.exp > Date.now() / 1000;
};

const setSession = (token?: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Token'] = `${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Token'];
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext<AuthContextType | null>(null);
const getUserDetails = () => {
  const user: UserProfile = {
    id: '1',
    email: 'kelvin.z@zerok.ai',
    name: 'Kelvin Z',
    role: 'UI/UX Designer'
  };
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      addSessionListener();
      try {
        const token = window.localStorage.getItem('token');
        if (token && verifyToken(token)) {
          setSession(token);
          // TODO: Get user profiel information.
          // const response = await axios.get('/api/account/me');
          // const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: getUserDetails()
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const addSessionListener = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('error: ', error);
        if (error.status === 419 || error.error?.kind === 'SESSION_EXPIRED') {
          logout();
        }
        Promise.reject((error.response && error.response.data) || 'Wrong Services');
      }
    );
  };

  const login = async (email: string, password: string) => {
    const maskedPassword = maskPassword(password);
    const response = await axios.post('/v1/p/auth/login', { email, password: maskedPassword });
    // const { user } = response.data;
    const { token } = response.headers;
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: getUserDetails()
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const response = await axios.post('/v1/p/auth/register', {
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {
    await axios.get(`/v1/p/user/password/recover/${email}`).then(
      (response) => {
        return response;
      },
      (err) => {
        return err;
      }
    );
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
