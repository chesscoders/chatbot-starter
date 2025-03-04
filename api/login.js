import { store } from '@auth';
import { axios, router, toaster } from '@lib';
import { decode } from 'jsonwebtoken';

const login = async (data) => {
  try {
    const { token } = await axios.post('login', data);
    if (!decode(token)) {
      throw new Error('Error! We cannot log you in at the moment');
    }
    store.dispatch({ type: 'SET', jwt: token });

    // notify user and other actions
    toaster.success('Login successful');
    router.push('/admin');
  } catch (err) {
    toaster.error(err.message);
  }
};

export default login;
