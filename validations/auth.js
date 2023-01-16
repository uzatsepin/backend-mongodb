import { body } from "express-validator";

export const registerValitadion = [
  body("email", "Некорректно вказана пошта").isEmail(),
  body("password", "Пароль має бути довший 5 символів").isLength({ min: 5 }),
  body("fullName", "Введіть корректне імʼя (довше 3 символів)").isLength({ min: 3 }),
  body("avatarUrl", "Має бути саме лінк на аватар").isURL()
];