import { useState, useEffect } from 'react';
import { Typography, Dialog, DialogContent } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AppointmentForm from './AppointmentForm';
import { useDispatch } from 'react-redux';
import { deleteAppontement } from 'store/appointments';
import { mapIdsToNames } from 'store/utils';
import Search from './Search';

const AppointmentList = ({ appointments, practitioners, patients }) => {
  const dispatch = useDispatch();
  const [allAppointments, setAllAppointments] = useState({
    source: [],
    filtred: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({
    id: '',
    patientId: '',
    practitionerId: '',
  });

  useEffect(() => {
    const patientsMap = mapIdsToNames(patients);
    const practitionersMap = mapIdsToNames(practitioners);
    const apps = appointments.map((appointment) => ({
      ...appointment,
      patientName: patientsMap[appointment.patientId],
      practitionerName: practitionersMap[appointment.practitionerId],
    }));

    setAllAppointments({ source: apps, filtred: apps });
  }, [appointments]);

  const handleEdit = (appointment) => {
    setEditMode(true);
    setSelectedAppointment(appointment);
  };

  const handleDelete = (appointment) => {
    dispatch(deleteAppontement(appointment));
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setAllAppointments({
      ...allAppointments,
      filtred: allAppointments.source.filter(
        (app) =>
          app.patientName.toLowerCase().includes(query) ||
          app.practitionerName.toLowerCase().includes(query),
      ),
    });
  };

  const renderAppoitments = () => {
    if (allAppointments.filtred.length === 0)
      return (
        <Typography variant="subtitle1" align="center">
          No Appointments Found!
        </Typography>
      );

    return allAppointments.filtred.map((appointment) => (
      <div className="appointment" key={appointment.id}>
        <div className="controls">
          <EditIcon onClick={() => handleEdit(appointment)} />
          <DeleteIcon
            className="deleteIcon"
            onClick={() => handleDelete(appointment)}
          />
        </div>
        <div className="row">
          <AssignmentIndIcon />
          <Typography variant="subtitle1">{`Practitioner : ${appointment.practitionerName}`}</Typography>
        </div>
        <div className="row">
          <PersonIcon />
          <Typography variant="subtitle1">{`Patient : ${appointment.patientName}`}</Typography>
        </div>
        <div className="row">
          <EventAvailableIcon />
          <Typography variant="subtitle1">{`Date : ${new Date(
            appointment.startDate,
          ).toDateString()}`}</Typography>
        </div>
        <div className="row">
          <AccessTimeIcon />
          <Typography variant="subtitle1">{`Time : ${new Date(
            appointment.startDate,
          ).toLocaleTimeString()} - ${new Date(
            appointment.endDate,
          ).toLocaleTimeString()}`}</Typography>
        </div>
      </div>
    ));
  };

  return (
    <div className="appointmentsList">
      <Search onSearch={handleSearch} />

      {renderAppoitments()}

      <Dialog fullWidth maxWidth="lg" open={editMode} onClose={handleClose}>
        <DialogContent>
          <AppointmentForm
            editMode
            editCallback={handleClose}
            patients={patients}
            practitioners={practitioners}
            selectedAppointment={selectedAppointment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
