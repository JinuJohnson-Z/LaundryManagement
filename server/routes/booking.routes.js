import bookingCtrl from '../controllers/booking.controller.js'
import shop from '../controllers/shop.controller.js'
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/booking')
  .get(bookingCtrl.list);


  router.route('/api/booking/by/:laundryId')
  .post(authCtrl.requireSignin, bookingCtrl.create)
  .get(authCtrl.requireSignin,bookingCtrl.listByLaundry)
  router.route('/api/booking/:laundryId')
  .put(authCtrl.requireSignin, bookingCtrl.isOwner, bookingCtrl.update)
  .delete(authCtrl.requireSignin, bookingCtrl.remove)

router.param('laundryId', shop.laundryByID)
router.param('userId', userCtrl.userByID)

export default router
