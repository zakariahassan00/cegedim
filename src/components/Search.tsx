import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  // search
  search: {
    width: '100%',
    margin: '20px auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Search = ({ onSearch }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <TextField
        className={classes.margin}
        placeholder="Search..."
        onChange={onSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
