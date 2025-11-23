export const getAvatar = (text: string) => {
  const parts = text.split(' ').filter((c) => c);
  return parts.map((c) => c[0].toUpperCase()).join('');
};
