import { useDispatch, useSelector } from 'react-redux';
import { getTimeSlots, timeSlotsSelectors } from '../store/timeSlots';
import { useEffect } from 'react';
import TimeSlots from '../components/TimeSlots';

const TimeSlotPage = () => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) =>
    timeSlotsSelectors.selectAll(state.timeSlots),
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
