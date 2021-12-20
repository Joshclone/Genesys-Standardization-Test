const User = require('./../../models/user')

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  //before registering anyuser first validate that the email is not already in use

  const user = await User.findOne({ email });
  if (user) return res.status(403).json({ error: { message: "Email already in use" } });
  
  const newUser = new User({ firstName, lastName, email, password });
  await newUser.save();
  res.status(200).json({ message: "success" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(403)
      .json({ error: { message: "invalid email/password" } });
  if (password !== user.password)
    return res
      .status(403)
      .json({ error: { message: "invalid email/password" } });

  res.status(200).json({ message: "success" });
};
