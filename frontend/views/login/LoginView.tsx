import { useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { uiStore } from 'Frontend/stores/app-store';

type LoginCredentials = {
  username: string;
  password: string;
};

export default function LoginView() {
  const empty: LoginCredentials = { username: '', password: '' };

  const formik = useFormik({
    initialValues: empty,
    onSubmit: async (credentials: LoginCredentials, { setSubmitting, setErrors }) => {
      try {
        await uiStore.login(credentials.username, credentials.password);
        formik.resetForm();
      } catch (e: unknown) {
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="h-full m-m flex flex-col items-center justify-center gap-m">
        Login
        <TextField
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        <PasswordField
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        <Button theme="primary" disabled={formik.isSubmitting} onClick={() => formik.submitForm()}>
          Login
        </Button>
      </div>
    </>
  );
}
