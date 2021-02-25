import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { formatDateRange } from 'utils/date';

const getTimeSlotDatacy = (id: string) => `timeslot-${id}`;

const useStyles = makeStyles({
  timeSlots: {
    display: 'grid',
    padding: 16,
    gridGap: 16,
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  },
});

const TimeSlots = (props) => {
  const { items } = props;
  const classes = useStyles();

  return (
    <List className={classes.timeSlots} datacy="timeslot-list">
      {items.map((item) => (
        <Card key={item.id} datacy={getTimeSlotDatacy(item.id)}>
          <CardHeader
            avatar={<CalendarTodayIcon />}
            title={
              <Typography datacy={`${getTimeSlotDatacy(item.id)}-range`}>
                {formatDateRange({
                  from: new Date(item.startDate),
                  to: new Date(item.endDate),
                })}
              </Typography>
            }
          />
          <CardContent>
            <pre>
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      ))}
    </List>
  );
};

export default TimeSlots;
