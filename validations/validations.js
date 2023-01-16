import { body } from "express-validator";

export const registerValitadion = [
  body("email", "Некорректно вказана пошта").isEmail(),
  body("password", "Пароль має бути довший 5 символів").isLength({ min: 5 }),
  body("fullName", "Введіть корректне імʼя (довше 3 символів)").isLength({
    min: 3,
  }),
  body("avatarUrl", "Має бути саме лінк на аватар").optional().isURL(),
];

export const loginValidation = [
  body("email", "Некорректно вказана пошта").isEmail(),
  body("password", "Пароль має бути довший 5 символів").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
  body("text", "Введіть текст статті").isLength({ min: 10 }).isString(),
  body("tags", "Некорректний формат тегів").optional().isString(),
  body("imageUrl", "Некорректний лінк на зображення").optional().isString(),
];
