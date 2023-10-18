const { authJwt } = require('../middleware')
const userController = require('../controllers/user.controller')

module.exports = function (app) {
  var router = require("express").Router();
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })

  // router.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   )
  //   next()
  // })

  app.get("/api/user/get-profile",
    [authJwt.verifyToken],
    userController.getProfile
  )

  app.use("/api/user", router)
}