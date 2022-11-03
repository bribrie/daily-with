import TaskListContainer from "containers/task/TaskListContainer";
import CreateButton from "components/layout/create/CreateButton";

function TaskPage() {
  return (
    <>
      <TaskListContainer />
      <CreateButton />
    </>
  );
}

export default TaskPage;
