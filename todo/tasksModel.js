import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  done: Boolean
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
