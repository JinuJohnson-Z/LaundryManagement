import mongoose from 'mongoose'
const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    trim: true,
    required: 'Date is required'
  },

  start:{
    type:String,
    trim:true
  },
  end:{
    type : String,
    trim:true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
},
  laundry: {type: mongoose.Schema.ObjectId, ref: 'Laundry'}
})

export default mongoose.model('Booking', BookingSchema)
