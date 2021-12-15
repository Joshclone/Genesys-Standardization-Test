const { ROLE } = require("../controllers/Admin/data");


//function to enable Admin view all transactions
function canViewtransfer(user, transfer) {
  return user.role === ROLE.ADMIN || transfer.userId === user.id;
}

function scopedtransfers(user, transfers) {
  if (user.role === ROLE.ADMIN) return transfers;
  return transfers.filter((transfer) => transfer.userId === user.id);
}

function canDeletetransfer(user, transfer) {
  return transfer.userId === user.id;
}

module.exports = {
  canViewtransfer,
  scopedtransfers,
  canDeletetransfer,
};
