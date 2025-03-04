import { Loading } from '@components';
import { useQuery } from '@hooks';
import { DocumentCard, DocumentsNotFound } from '.';

const DocumentsList = ({ options, readOnly }) => {
  const { data, status } = useQuery('admin/documents', options);

  if (status !== 'success') {
    return (
      <div className="mt-12 flex items-center justify-center h-full">
        <Loading extraClassname="fa-4x" />
      </div>
    );
  }

  const showDocument = (props) => <DocumentCard key={props?._id} {...props} readOnly={readOnly} />;

  const hasResults = !!data.length;
  return (
    <div>
      {hasResults && <h4 className="mb-3 text-lg">Results: {data.length} documents</h4>}
      <div className="flex gap-6 flex-wrap">
        {data.map(showDocument)}
        {!hasResults && <DocumentsNotFound />}
      </div>
    </div>
  );
};

export default DocumentsList;
