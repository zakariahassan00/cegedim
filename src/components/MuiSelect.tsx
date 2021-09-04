import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formcontrol: {
    margin: '15px auto',
    width: '100%',
    maxWidth: 600,
  },
  select: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AppointmentForm = ({
  name,
  label,
  formik,
  children,
  onChange = null,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.formcontrol}
      error={Boolean(formik.touched[name] && formik.errors[name])}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        className={classes.select}
        name={name}
        value={formik.values[name]}
        onChange={onChange}
        label={label}
      >
        {children}
      </Select>

      <FormHelperText>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    </FormControl>
  );
};

export default AppointmentForm;
