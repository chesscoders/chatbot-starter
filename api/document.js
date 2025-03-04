import { axiosAuth, toaster } from '@lib';

export const addDocument = async ({ input, text }) => {
  // API supports batch adding, so we'll send an array with just one item
  const documents = [];

  // Easy way of input/output feature for the knowledge feed.
  // We simply concatenate the possible input questions to the feed text
  const pageContent = `${input}\n\n ${text}`;

  // Input is optional, so we may not have a title for the feed entry.
  let title = null;
  if (input) {
    title = input.split('\n')[0];
  }
  // Match API structure
  documents.push({
    pageContent,
    metadata: {
      tag: 'feed',
      title,
      input,
    },
  });
  try {
    await axiosAuth.post('admin/documents', { documents });
    toaster.success('Success! SuperBot is now smarter.');
  } catch (err) {
    console.error(err);
    toaster.error('Error! Please try again later.');
  }
};

export const deleteDocument = async (id) => {
  return await axiosAuth.delete(`admin/documents/${id}`);
};
