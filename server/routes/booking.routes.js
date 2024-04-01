import bookingCtrl from '../controllers/booking.controller.js'
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()


router.route('/api/bookings')
  .get(bookingCtrl.list)

router.route('/api/bookings:laundryId')
  .get(bookingCtrl.read)

router.route('/api/bookings/by/:laundryId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, bookingCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, bookingCtrl.listByOwner)

router.route('/api/bookings/:laundryId')
  .put(authCtrl.requireSignin, bookingCtrl.isOwner, bookingCtrl.update)
  .delete(authCtrl.requireSignin, bookingCtrl.isOwner, bookingCtrl.remove)

router.route('/api/logo/:laundryId')
  .get(bookingCtrl.photo, bookingCtrl.defaultPhoto)

router.route('/api/defaultphoto')
  .get(bookingCtrl.defaultPhoto)

router.param('laundryId', bookingCtrl.laundryByID)
router.param('userId', userCtrl.userByID)

export default router
