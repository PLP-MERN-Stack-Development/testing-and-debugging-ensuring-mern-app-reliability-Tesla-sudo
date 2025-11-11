import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  reportedBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Bug', bugSchema);