import { checkAuth, withAuth } from '@auth';
import { DashboardCard, Layout } from '@components';

const Page = () => {
  return (
    <Layout title="Dashboard">
      <div className="max-w-full flex flex-col gap-8 md:gap-12">
        <div>
          <h3 className="text-2xl font-bold text-mutedGray mb-4">Chat with ChatBot Starter</h3>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <DashboardCard
              href="/admin/chat"
              icon="fa-light fa-robot" // Use an appropriate Font Awesome icon for chat
              title="Chat"
              description="Q&A with ChatBot Starter"
            />

            <DashboardCard
              href="/admin/knowledge-feed"
              icon="fa-light fa-book" // Use an appropriate Font Awesome icon for knowledge feed
              title="Knowledge Feed"
              description="Manage Dynamic Content"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-mutedGray mb-4">View Static Knowledge Bases</h3>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <DashboardCard
              href="/admin/faq-base"
              icon="fa-light fa-comments-question-check"
              title="FAQ Base"
              description="View Static Content"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
