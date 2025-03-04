import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { DocumentsList } from '@components/Documents';
import { Search } from '@components/Fields';
import { useState } from 'react';

const Page = () => {
  const [search, setSearch] = useState('');

  return (
    <Layout title="Responsible Gaming">
      <div className="max-w-full">
        <h2 className="mb-4 text-2xl font-semibold">Consult Responsible Gaming Base</h2>
        <p>
          This page lists static knowledge base of{' '}
          <span className="text-softRed font-bold">SuperBot</span>.
        </p>
        <div className="py-4 w-full md:max-w-xs">
          <Search
            placeholder={'Search in Responsible Gaming contents'}
            value={search}
            onChange={setSearch}
            inputClassname={
              'p-4 pl-8 rounded-lg bg-veryDarkGray border-softRed border-1 text-white placeholder-mutedGray focus:outline-none focus:ring-2 focus:ring-softRed resize-none'
            }
          />
        </div>
        <div className="py-8">
          <DocumentsList
            options={{
              tag: 'joc-responsabil',
              search,
            }}
            readOnly
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
