import { Link, makeStyles } from '@material-ui/core';
import LocalLink from 'components/LocalLink';
import NextLink from 'next/link';

const useStyles = makeStyles({
  home: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    '& > section': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <h1>Maiia's technical test</h1>
      <section datacy="intro">
        <h2>Introduction</h2>
        <p>
          To get the most out of this introduction, open the project using{' '}
          <Link href="https://code.visualstudio.com/" target="_blank">
            Visual Studio Code
          </Link>
          . You'll be able to open local files directly from your web browser.
          If you favor another editor which provides a similar API to open
          files, feel free to modify{' '}
          <LocalLink href="src/components/LocalLink.tsx:12:18">
            "src/components/LocalLink.tsx"
          </LocalLink>
          .
        </p>
      </section>
      <section datacy="timeslots">
        <h3>Time slots</h3>
        <NextLink href="/timeslots">
          <Link>Let's take a look at the time slots page</Link>
        </NextLink>
      </section>
      <section datacy="appointments">
        <h3>Appointments</h3>
        <NextLink href="/appointments">
          <Link>Let's work on appointments</Link>
        </NextLink>
      </section>
    </div>
  );
};

Home.pageTitle = 'Test technique Maiia';

export default Home;
