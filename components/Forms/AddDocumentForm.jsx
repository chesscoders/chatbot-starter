import { addDocument } from '@api/document';
import { Textarea } from '@components/Fields';
import { Field, Form, HookForm, Submit } from '@components/HookForm';
import { useMutation } from '@hooks';
import { router } from '@lib';
import { initialValues, validationSchema } from '../../models/add-document';

const AddDocumentForm = () => {
  const mutation = useMutation(addDocument, {
    invalidateQueries: 'admin/documents',
  });

  const handleSubmit = (data, form) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        router.reload();
      },
    });
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4 w-full max-w-lg">
        <Field
          as={Textarea}
          label={'Input'}
          name="input"
          placeholder="Write the input question here."
          help="If more than one question, write one question per line."
          autoComplete="off"
          autoFocus={true}
          className="p-4 rounded-lg bg-veryDarkGray border-softRed border-1 text-white placeholder-mutedGray focus:outline-none focus:ring-2 focus:ring-softRed resize-none"
          rows={6}
        />
        <Field
          as={Textarea}
          name="text"
          label={'Output'}
          placeholder="Write your output data here"
          autoComplete="off"
          autoFocus={false}
          className="p-4 rounded-lg bg-veryDarkGray border-softRed border-1 text-white placeholder-mutedGray focus:outline-none focus:ring-2 focus:ring-softRed resize-none"
          rows={6}
        />
        <Submit
          className="mt-4 button px-12 full border-none bg-softRed text-white"
          isLoading={mutation.isLoading}
        >
          Submit
        </Submit>
      </Form>
    </HookForm>
  );
};

export default AddDocumentForm;
