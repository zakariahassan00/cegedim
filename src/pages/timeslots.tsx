import TimeSlots from 'components/TimeSlots';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSlots, timeslotsSelectors } from 'store/timeslots';

const TimeSlotPage = () => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) =>
    timeslotsSelectors.selectAll(state.timeslots),
  );

  useEffect(() => {
    dispatch(getTimeSlots());
  }, []);

  return (
    <div>
      <h1>My timeslot pages</h1>
      <TimeSlots items={timeslots} />
    </div>
  );
};

TimeSlotPage.pageTitle = 'Time slots';
TimeSlotPage.pageSubtitle = 'A simple example';

export default TimeSlotPage;
