const { OAuth2Client } = require("google-auth-library");
const { generate_jwt_token } = require("../../services/generate.JWT");
const User = require("../../database/models/User");
const Role = require("../../database/models/Role");
const client = new OAuth2Client(
  "1014670675453-vna7io3paffh2lv386tek6u2b108l3fv.apps.googleusercontent.com"
);

let gooleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "1014670675453-vna7io3paffh2lv386tek6u2b108l3fv.apps.googleusercontent.com",
  });

  const payload = ticket.getPayload();

  return {
    username: payload.name,
    email: payload.email,
    verified: true,
  };
};

exports.google = async (req, res) => {
  let token = req.body.idtoken;

  let googleUser = await gooleVerify(token).catch((Err) => {
    return res.status(403).json({
      ok: false,
      error: Err,
    });
  });

  try {
    const user = await User.findOne({
      where: {
        email: googleUser.email,
      },
      include: [
        {
          model: Role,
          attributes: ["role"],
        },
      ],
    });

    if (user) {
      if (user.verified === false) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Debe de usar su autenticación normal",
          },
        });
      } else {
        let token = generate_jwt_token(user);

        return res.json({
          ok: true,
          usuario: user,
          token
        });
      }
    } else {
      const role =
        (await Role.findOne({ where: { role: "cliente" } })) ||
        (await Role.create({ role: "cliente" }));

      // console.log(role)

      User.create({
        username: googleUser.username,
        email: googleUser.email,
        password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        verified: null,
        google: true,
        RoleId: role.id,
      });

      res.status(201).json({
        ok: true,
        message: "Registro Excitoso!",
        token,
        usuario: role
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};
