import { Button } from '@components';
import { classnames } from '@lib';
import { useFormContext } from 'react-hook-form';

const Submit = ({ children, isLoading, ...props }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const disabled = isLoading || isSubmitting;

  return (
    <div className="inline-flex items-center relative">
      <Button type="submit" className="button full primary" {...props}>
        <div className={classnames(disabled && 'invisible')}>{children}</div>
        {disabled && (
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            <i className="fa-solid fa-loader fa-spin absolute text-white m-auto" />
          </div>
        )}
      </Button>
    </div>
  );
};

export default Submit;
