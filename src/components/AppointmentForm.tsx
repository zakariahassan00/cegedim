import { useState, useEffect } from 'react';
import { calculateAge } from 'store/utils';
import { Button, Chip, MenuItem, Grid, Typography } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MuiSelect from './MuiSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAvailabilities,
  AvailabilitiesSelectors,
} from 'store/availabilities';
import { setNewAppontement, editAppontement } from 'store/appointments';

const validationSchema = yup.object({
  practitionerId: yup.string().required('required'),
  patientId: yup.string().required('required'),
});

const AppointmentForm = ({
  practitioners,
  patients,
  editMode = false,
  selectedAppointment,
  editCallback,
}) => {
  const dispatch = useDispatch();
  const availabilities = useSelector((state) =>
    AvailabilitiesSelectors.selectAll(state.availabilities),
  );

  const [selectedAvailability, setSelectedAvailability] = useState({
    startDate: null,
    endDate: null,
    id: null,
  });

  useEffect(() => {
    editMode && dispatch(getAvailabilities(selectedAppointment.practitionerId));
  }, []);

  const formik = useFormik({
    initialValues: editMode
      ? selectedAppointment
      : { practitionerId: '', patientId: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const edit = () => {
        const reqData = {
          ...values,
          ...selectedAvailability,
          id: selectedAppointment.id,
        };
        editCallback && editCallback();
        dispatch(editAppontement(reqData));
      };
      const create = () => {
        const reqData = {
          ...values,
          ...selectedAvailability,
        };
        dispatch(setNewAppontement(reqData));
      };

      editMode ? edit() : create();
    },
  });

  const onPractitionerChange = (e) => {
    formik.handleChange(e);
    setSelectedAvailability({ startDate: null, endDate: null, id: null });
    dispatch(getAvailabilities(e.target.value));
  };

  const renderAvailabities = () => {
    // map of a single day and its corresponding times
    const dayTimesMap = {};

    availabilities.forEach((date) => {
      const singleDay = new Date(date.startDate.split('T')[0]).toDateString();
      if (dayTimesMap[singleDay])
        dayTimesMap[singleDay] = [...dayTimesMap[singleDay], date];
      else dayTimesMap[singleDay] = [date];
    });

    return Object.keys(dayTimesMap).map((day) => (
      <div key={day} className="availability">
        <div className="availability__day">
          <DateRangeIcon />
          <Typography variant="subtitle1">{day}</Typography>
        </div>
        <div className="availability__timelist">
          {dayTimesMap[day].map((date) => {
            const isSelected = selectedAvailability.id === date.id;

            return (
              <Chip
                className="availability__time"
                key={date.id}
                size="small"
                avatar={<ScheduleIcon>M</ScheduleIcon>}
                label={`${new Date(date.startDate).toLocaleTimeString()}`}
                color={isSelected ? 'primary' : 'default'}
                onClick={() =>
                  setSelectedAvailability({
                    startDate: date.startDate,
                    endDate: date.endDate,
                    id: date.id,
                  })
                }
              />
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="appointments__form">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Practitioners */}
            <MuiSelect
              name="practitionerId"
              label="Practitioner"
              formik={formik}
              onChange={onPractitionerChange}
            >
              {practitioners.map((partitioner) => (
                <MenuItem key={partitioner.id} value={partitioner.id}>
                  {`${partitioner.firstName} ${partitioner.lastName} (${partitioner.speciality})`}
                </MenuItem>
              ))}
            </MuiSelect>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Patients */}
            <MuiSelect
              name="patientId"
              label="Patient"
              formik={formik}
              onChange={formik.handleChange}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {`${patient.firstName} ${patient.lastName} (${calculateAge(
                    patient.birthDate,
                  )} years-old)`}
                </MenuItem>
              ))}
            </MuiSelect>
          </Grid>
        </Grid>

        {(formik.values.patientId || editMode) && renderAvailabities()}

        <Button
          className="btn"
          disabled={!selectedAvailability.startDate}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          {editMode ? 'Update Appointment' : 'Book Appointment'}
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
