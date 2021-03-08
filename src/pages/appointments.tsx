import AppointmentForm from 'components/AppointmentForm';
import AppointmentList from 'components/AppointmentList';
import Section from 'components/Section';
import AllTasks from 'components/AllTasks';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  instructions: {
    marginBottom: '20px',
  },
  goals: {
    marginBottom: '30px',
  },
  structurePage: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
  },
});

const AppointmentsPage = () => {
  const classes = useStyles();
  return (
    <>
      <h1>Appointments</h1>
      <Section
        name="instructions"
        title="Instructions"
        className={classes.instructions}
      >
        <p>
          To book an appointment, we have to set the following required
          informations: the practitioner, the patient and date.
        </p>
        <p>
          The backend implementation is already done, you have all necessary
          routes to work and implement requested features.
        </p>
        <p>
          In first you have to create the appointment form. You are free to use
          the validation form that you want like Formik or React-hook-form.
        </p>
        <p>
          In the second time, you will show the list of all created appointments
          on the right side
        </p>
        <p>
          We don't have mock ups, you have to design your own solution and
          propose a simple workflow for users. It also should be responsive.
        </p>
        <p>
          We expect you to implement two bonus features: you can choose among
          the suggested features in the bonus section or choose to implement one
          of your choice.
        </p>
      </Section>
      <AllTasks className={classes.goals} />
      <div className={classes.structurePage}>
        <Section name="appointment-form" title="Appointment Form">
          <AppointmentForm />
        </Section>
        <Section name="appointment-list" title="Appointment List">
          <AppointmentList />
        </Section>
      </div>
    </>
  );
};

AppointmentsPage.pageTitle = 'Appointments';
AppointmentsPage.pageSubtitle = "Let's get to work 👩‍💻";

export default AppointmentsPage;
