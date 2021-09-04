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
import { setNewAppontement } from 'store/appointments';
import { useState } from 'react';

const validationSchema = yup.object({
  practitioner: yup.string().required('required'),
  patient: yup.string().required('required'),
});

const AppointmentForm = ({ practitioners, patients }) => {
  const dispatch = useDispatch();
  const availabilities = useSelector((state) =>
    AvailabilitiesSelectors.selectAll(state.availabilities),
  );

  const [selectedAvailability, setSelectedAvailability] = useState({
    startDate: null,
    endDate: null,
    id: null,
  });

  const formik = useFormik({
    initialValues: {
      practitioner: '',
      patient: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqDate = {
        ...values,
        ...selectedAvailability,
      };
      dispatch(setNewAppontement());
    },
  });

  const onPractitionerChange = (e) => {
    formik.handleChange(e);
    setSelectedAvailability({ startDate: null, endDate: null, id: null });
    dispatch(getAvailabilities(e.target.value));
  };

  const renderDates = () => {
    const days = {};

    availabilities.forEach((date) => {
      const singleDay = new Date(date.startDate).toLocaleDateString();
      if (days[singleDay]) days[singleDay] = [...days[singleDay], date];
      else days[singleDay] = [date];
    });

    return Object.keys(days).map((day) => (
      <div key={day} className="availability">
        <div className="availability__day">
          <DateRangeIcon />
          <Typography variant="subtitle1">{day}</Typography>
        </div>
        <div className="availability__timelist">
          {days[day].map((date) => {
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
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            {/* Practitioner */}
            <MuiSelect
              name="practitioner"
              label="Practitioner"
              formik={formik}
              onChange={onPractitionerChange}
            >
              {practitioners.map((partitioner) => (
                <MenuItem key={partitioner.id} value={partitioner.id}>
                  {`${partitioner.firstName} ${partitioner.lastName}`}
                </MenuItem>
              ))}
            </MuiSelect>
          </Grid>

          <Grid item xs={12}>
            {/* Patients */}
            <MuiSelect
              name="patient"
              label="Patient"
              formik={formik}
              onChange={formik.handleChange}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {`${patient.firstName} ${patient.lastName}`}
                </MenuItem>
              ))}
            </MuiSelect>
          </Grid>
        </Grid>

        {formik.values.patient && renderDates()}

        <Button
          className="btn"
          disabled={!selectedAvailability.startDate}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
