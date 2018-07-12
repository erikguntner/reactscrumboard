import React from 'react';
import { connect } from 'react-redux';

import { updateStory, deleteStory } from '../actions/stories.js';

const Task = props => {
  console.log('stories', props.task);
  const order = ['todo', 'inProgress', 'testing', 'done'];
  return (
    <div
      style={{
        border: '2.5px solid black',
        padding: '4px 4px',
        backgroundColor: props.task.completed ? 'green' : 'red',
        marginTop: '2px',
        marginBottom: '2px',
      }}
    >
      <button
        className="delete button_clear--small"
        onClick={() => props.deleteStory(props.task.story_id)}
      >
        X
      </button>
      <p>{props.task.task}</p>
      <span
        onClick={() => {
          let { completed } = props.task;

          props.updateStory(props.task, { completed: !completed });
        }}
      >
        Status
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateStory: (task, updates) => dispatch(updateStory(task, updates)),
  deleteStory: taskId => dispatch(deleteStory(taskId)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(Task);
