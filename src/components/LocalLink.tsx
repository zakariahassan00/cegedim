import { Link } from '@material-ui/core';
import config from 'config';
import { ReactNode } from 'react';

const CURRENT_WORKING_DIRECTORY = config.get('CURRENT_WORKING_DIRECTORY');

type Props = { href: string; children: ReactNode };

const LocalLink = (props: Props) => {
  const { href, children } = props;
  return (
    <Link href={`vscode://file/${CURRENT_WORKING_DIRECTORY}/${href}`}>
      {children}
    </Link>
  );
};

export default LocalLink;
