const express = require("express");
const router = express.Router();
const { transfers } = require("../controllers/Admin/data");
const { authUser } = require("../controllers/Admin/basicAuth");
const {
  canViewtransfer,
  canDeletetransfer,
  scopedtransfers,
} = require("../permissions/bank");

router.get("/", authUser, (req, res) => {
  res.json(scopedtransfers(req.user, transfers));
});

router.get(
  "/:transferId",
  settransfer,
  authUser,
  authGettransfer,
  (req, res) => {
    res.json(req.transfer);
  }
);

router.delete(
  "/:transferId",
  settransfer,
  authUser,
  authDeletetransfer,
  (req, res) => {
    res.send("Deleted transfer");
  }
);

function settransfer(req, res, next) {
  const transferId = parseInt(req.params.transferId);
  req.transfer = transfers.find((transfer) => transfer.id === transferId);

  if (req.transfer == null) {
    res.status(404);
    return res.send("transfer not found");
  }
  next();
}

function authGettransfer(req, res, next) {
  if (!canViewtransfer(req.user, req.transfer)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

function authDeletetransfer(req, res, next) {
  if (!canDeletetransfer(req.user, req.transfer)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

module.exports = router;
