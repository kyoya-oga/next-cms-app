import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title?: string;
  description?: string;
}

export const APP_NAME = 'Next CMS';
const AppHead: FC<Props> = ({ title, description }): JSX.Element => {
  return (
    <Head>
      <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      <meta content={description} name="description" />
    </Head>
  );
};

export default AppHead;
