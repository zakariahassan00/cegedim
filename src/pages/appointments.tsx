import AppointmentForm from 'components/AppointmentForm';
import AppointmentList from 'components/AppointmentList';
import Section from 'components/Section';
import SectionGoals from 'components/SectionGoals';

const AppointmentsPage = () => {
  return (
    <>
      <h1>Appointments</h1>
      <Section name="instructions" title="Instructions">
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
      </Section>
      <Section name="goals-form" title="Goals for Appointment Form">
        <SectionGoals
          goals={[
            'Show the list of practitioners and select one of them',
            'Show the list of patients and select one of them',
            'Show the availabities of the selected practitioner',
            "Choose the date and the time depending of the selected practitioner's availabities",
            'Validate and submit the form',
          ]}
          name="goals-form"
        />
      </Section>
      <Section name="goals-list" title="Goals for Appointment List">
        <SectionGoals
          goals={[
            'Show the list of all appointments with all mandatory informations',
            'Update dynamically the list',
          ]}
          name="goals-list"
        />
      </Section>
      <AppointmentForm />
      <AppointmentList />
    </>
  );
};

AppointmentsPage.pageTitle = 'Appointments';
AppointmentsPage.pageSubtitle = "Let's get to work 👩‍💻";

export default AppointmentsPage;
