import mongoose from 'mongoose'
const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    trim: true,
    required: 'Date is required'
  },
  duration: {
    type: Number,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  laundry: {type: mongoose.Schema.ObjectId, ref: 'Laundry'}
})

export default mongoose.model('Booking', BookingSchema)
