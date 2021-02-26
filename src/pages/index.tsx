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
      <Section name="instructions" title="Instructions">
        <p>
          You have just joind the Maiia Pro team as a front-end, your first
          mission is to implement two crucial features for the success of the
          company.{' '}
        </p>
        <p>Here's the functionalities:</p>
        <ul>
          <li>Appointments creation form</li>
          <li>List of appointments</li>
        </ul>
        <p>
          You will find all specifications on the appointment page and you can
          see timeslot page and the existing code before coding.
        </p>
      </Section>
      <Section name="bonus" title="Bonus">
        <p>
          To avoid future regressions, tests are never a bad idea. We decided to
          adopt End to End testing strategy with cypress. We have already setup
          the package and if you find the time to write some tests about
          appointment form, don't hesitate it will make us happy.
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
