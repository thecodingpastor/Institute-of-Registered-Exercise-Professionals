export const ValidateEmail = (email: string) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
// /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(email);

export const LetterSpaceDash = (word: string) =>
  word?.trim().length > 3 && /^[A-Za-z-\s]{5,100}$/.test(word);

export const ValidatePassword = (password: string) =>
  /^.{6,50}$/.test(password);

export const ValidateName = (name: string) =>
  /^[A-Za-z0-9\\s]{2,50}$/.test(name);
