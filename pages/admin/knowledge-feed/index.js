import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { DocumentsList } from '@components/Documents';
import AddDocumentForm from '@components/Forms/AddDocumentForm';

const Page = () => {
  return (
    <Layout title="Knowledge Feed">
      <div className="max-w-full">
        <h2 className="mb-4 text-2xl font-semibold">Manage Knowledge Base</h2>
        <p>
          This page allows feeding new data into{' '}
          <span className="text-secondary font-bold">ChatBot Starter</span>.
        </p>
        <div className="py-8">
          <h3 className="mb-4 text-2xl font-semibold">Feed New Data</h3>
          <AddDocumentForm />
        </div>
        <div className="py-8">
          <DocumentsList
            options={{
              tag: 'feed',
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
