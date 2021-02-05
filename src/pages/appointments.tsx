import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

const AppointmentsPage = () => {
  return (
    <>
      <h1>Appointments</h1>
      <AppointmentForm />
      <AppointmentList />
    </>
  );
};

export default AppointmentsPage;
