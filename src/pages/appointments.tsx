import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPractitioners, practitionersSelectors } from 'store/practitioners';
import { getAppointments, appointmentsSelectors } from 'store/appointments';
import { getPatients, patientsSelectors } from 'store/patients';
import AppointmentForm from 'components/AppointmentForm';
import AppointmentList from 'components/AppointmentList';
import Section from 'components/Section';
import AllTasks from 'components/AllTasks';

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const practitioners = useSelector((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );
  const patients = useSelector((state) =>
    patientsSelectors.selectAll(state.patients),
  );
  const appointments = useSelector((state) =>
    appointmentsSelectors.selectAll(state.appointments),
  );

  useEffect(() => {
    dispatch(getPractitioners());
    dispatch(getPatients());
    dispatch(getAppointments());
  }, []);

  return (
    <div className="appointment page">
      <h1>Appointments</h1>
      <Section
        name="instructions"
        title="Instructions"
        className="instructions"
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
      <AllTasks className="goals" />
      <div className="structurePage">
        <Section
          name="appointment-form"
          title="Appointment Form"
          className="appointment__form"
        >
          <AppointmentForm
            practitioners={practitioners}
            patients={patients}
            editCallback={false}
            editMode={false}
            selectedAppointment={false}
          />
        </Section>
        <Section
          name="appointment-list"
          title="Appointment List"
          className="appointment__list"
        >
          <AppointmentList
            appointments={appointments}
            practitioners={practitioners}
            patients={patients}
          />
        </Section>
      </div>
    </div>
  );
};

AppointmentsPage.pageTitle = 'Appointments';
AppointmentsPage.pageSubtitle = "Let's get to work 👩‍💻";

export default AppointmentsPage;
