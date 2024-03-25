import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import shopCtrl from '../controllers/shop.controller.js'

const router = express.Router()

router.route('/api/laundry')
  .get(shopCtrl.list)

router.route('/api/laundry/:shopId')
  .get(shopCtrl.read)

router.route('/api/laundry/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

router.route('/api/laundry/:laundryId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

router.route('/api/laundry/logo/:laundryId')
  .get(shopCtrl.photo, shopCtrl.defaultPhoto)

router.route('/api/laundry/defaultphoto')
  .get(shopCtrl.defaultPhoto)

router.param('laundryId', shopCtrl.laundryByID)
router.param('userId', userCtrl.userByID)

export default router
