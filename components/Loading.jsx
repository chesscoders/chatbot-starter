import { classnames } from '@lib';

const Loading = ({ extraClassname }) => (
  <i className={classnames('fa-solid fa-loader fa-spin', extraClassname)} />
);

export default Loading;
