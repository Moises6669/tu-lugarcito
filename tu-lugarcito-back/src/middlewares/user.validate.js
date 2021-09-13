const { validationResult, body } = require("express-validator");
const { Role, User } = require("../database/db");

const user_singup_validate = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("El nombre de usuario es requerido")
      .not(),
    body("email")
      .notEmpty()
      .withMessage("El email es requerido")
      .isEmail()
      .withMessage("El email no valido"),
    body("password")
      .not()
      .notEmpty()
      .withMessage("la contraseña es requerida")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener almenos 8 caracteres")
      .custom((value) => {
        let palabras = [
          "12345678",
          "admin12345",
          "admin12345678",
          "12345admin",
          "password",
          "12345password",
          "1234568contraseña",
          "contraseña",
        ];

        palabras.forEach((element) => {
          if (value === element) {
            throw new Error("Utilize una contraseña mas segura");
          }
        });
        return true;
      })
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,16}$/)
      .withMessage(
        "la contraseña debe contener al menos un número y un carácter especial"
      ),
    body("passwordConfirmation")
      .notEmpty()
      .withMessage("La confirmacion de contraseña es requerida")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error(
            "La confirmación de la contraseña no coincide con la contraseña"
          );
        }
        return true;
      }),
  ];
};

const username_validate = (req, res, next) => {
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      res.status(400).json({
        ok: true,
        message: "Lo sentimos este nombre de usuario ya esta en uso",
      });
      return;
    }
    next();
  });
};

const email_validate = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      res.status(400).json({
        ok: true,
        message: "Lo sentimos este email ya esta en uso",
      });
      return;
    }
    next();
  });
};

const check_roles_existed = (req, res, next) => {
  let role = req.body.role;

  if (role === "admin" || role === "cliente") {
    next();
  } else {
    return res.json({
      ok: false,
      error: `El rol ${req.body.role} no es compatible`,
    });
  }
};

const message_Validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) return next();

  let errors;

  error.array().map((Err) => {
    errors = JSON.stringify(Err.msg);
  });

  return res.status(422).json({
    ok: false,
    error: errors,
  });
};

module.exports = {
  user_singup_validate,
  username_validate,
  email_validate,
  message_Validate,
  check_roles_existed
};