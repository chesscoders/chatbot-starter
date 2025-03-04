import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  input: Yup.string(),
  text: Yup.string().required('Output value is required.'),
});

export const initialValues = {
  input: '',
  text: '',
};
