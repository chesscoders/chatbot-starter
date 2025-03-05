import { LoginForm } from '@components/Forms';

const Page = () => {
  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="my-8 flex w-full max-w-xl flex-col rounded-lg bg-darkGray px-4 py-8 lg:px-12">
        <h2 className="mb-4 text-2xl font-bold text-white">ChatBot Starter</h2>
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
