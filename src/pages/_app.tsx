import { useRouter } from "next/router";
import Link from "next/link";
import MuiLink from "@material-ui/core/Link";
import { Provider } from "react-redux";
import store from "../store";

const Layout = (props) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <div>
      <header>
        {pathname !== "/" && (
          <Link href="/">
            <MuiLink>Back</MuiLink>
          </Link>
        )}
      </header>
      {children}
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
