import { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, patientsSelectors } from 'store/patients';
import { getPractitioners, practitionersSelectors } from 'store/practitioners';
import AppointmentForm from './AppointmentForm';

const useStyles = makeStyles(() => ({
  appointments: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointment: {
    position: 'relative',
    padding: 25,
    width: 300,
    height: 250,
  },
  row: {
    display: 'flex',
    '& svg': {
      marginRight: 10,
    },
  },
  edit: {
    color: 'gray',
    position: 'absolute',
    top: 10,
    right: 10,
  },
}));

const AppointmentList = ({ appointments }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const practitioners = useSelector((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );
  const patients = useSelector((state) =>
    patientsSelectors.selectAll(state.patients),
  );

  const enableEditMode = () => {
    setEditMode(true);
    dispatch(getPatients());
    dispatch(getPractitioners());
  };

  const renderAppoitment = () =>
    appointments.map((appointment) => (
      <div className={classes.appointment} key={appointment.id}>
        <div className={classes.row}>
          <AssignmentIndIcon />
          <Typography variant="subtitle1">{`Practitioner : ${appointment.practitioner}`}</Typography>
        </div>
        <div className={classes.row}>
          <PersonIcon />
          <Typography variant="subtitle1">{`Patient : ${appointment.patient}`}</Typography>
        </div>
        <div className={classes.row}>
          <EventAvailableIcon />
          <Typography variant="subtitle1">{`Date : ${appointment.startDate}`}</Typography>
        </div>
      </div>
    ));

  const renderAppoitmentForm = () => (
    // TODO: figure out how to disable edit mode !
    <AppointmentForm patients={patients} practitioners={practitioners} />
  );

  return (
    <div className={classes.appointments}>
      <EditIcon className={classes.edit} onClick={enableEditMode} />
      {editMode ? renderAppoitmentForm() : renderAppoitment()}
    </div>
  );
};

export default AppointmentList;
