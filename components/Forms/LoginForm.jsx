import { login } from '@api/identity';
import { Email, Password } from '@components/Fields';
import { Field, Fieldset, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/login';

const LoginForm = () => {
  const handleSubmit = async (values) => {
    await login(values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 text-mutedGray">
        <Fieldset name="email" label="Your email">
          <Field id="email" name="email" as={Email} autoFocus={true} />
        </Fieldset>

        <Fieldset name="password" label="Your password">
          <Field id="password" name="password" as={Password} />
        </Fieldset>

        <Submit className="mt-4 button px-12 full border-none bg-secondary text-white">Login</Submit>
      </div>
    </HookForm>
  );
};

export default LoginForm;
