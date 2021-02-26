import SectionGoals from './SectionGoals';
import { useState } from 'react';

const AllGoals = () => {
  const [isAllAchievedGoalsForm, setIsAllAchievedGoalsForm] = useState(false);
  const [isAllAchievedGoalsList, setIsAllAchievedGoalsList] = useState(false);

  return (
    <>
      <SectionGoals
        title="Goals for Appointment Form"
        goals={[
          'Show the list of practitioners and select one of them',
          'Show the list of patients and select one of them',
          'Show the availabities of the selected practitioner',
          "Choose the date and the time depending of the selected practitioner's availabities",
          'Validate and submit the form',
        ]}
        name="goals-form"
        onChangeIsAchievedAllGoals={setIsAllAchievedGoalsForm}
      />
      <SectionGoals
        title="Goals for Appointment List"
        goals={[
          'Show the list of all appointments with all mandatory informations',
          'Update dynamically the list',
        ]}
        name="goals-list"
        onChangeIsAchievedAllGoals={setIsAllAchievedGoalsList}
      />

      {isAllAchievedGoalsForm && isAllAchievedGoalsList && (
        <p>
          You finished the test, congratulation ! Before sending your project,
          make sure that everything works well and that your code is clean.
        </p>
      )}
    </>
  );
};

export default AllGoals;
