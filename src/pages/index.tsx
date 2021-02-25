import { Link, makeStyles } from '@material-ui/core';
import EditorLink from 'components/EditorLink';
import Section from 'components/Section';
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
      alignItems: 'center',
    },
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <h1>Maiia's technical test</h1>
      <Section name="intro" title="Introduction">
        <p>
          To get the most out of this introduction, open the project using{' '}
          <Link href="https://code.visualstudio.com/" target="_blank">
            Visual Studio Code
          </Link>{' '}
          by clicking <EditorLink path="">this link</EditorLink>. You'll be able
          to open local files directly from your web browser. If you favor
          another editor which provides a similar API to open files, feel free
          to modify{' '}
          <EditorLink path="src/components/EditorLink.tsx:12:18">
            "src/components/EditorLink.tsx"
          </EditorLink>
          .
        </p>
      </Section>
      <Section name="timeslots" title="Time slots">
        <NextLink href="/timeslots">
          <Link>Let's take a look at the time slots page</Link>
        </NextLink>
      </Section>
      <Section name="appointments" title="Appointments">
        <NextLink href="/appointments">
          <Link>Let's work on appointments</Link>
        </NextLink>
      </Section>
    </div>
  );
};

Home.pageTitle = 'Test technique Maiia';

export default Home;
