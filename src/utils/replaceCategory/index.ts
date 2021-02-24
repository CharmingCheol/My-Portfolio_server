const replaceCategory = ({ text }: { text: string }) => {
  if (/[a-z|A-Z]/.test(text)) {
    return text.toLowerCase().replace(/^[a-z|A-Z]/, (letter) => letter.toUpperCase());
  }
  return text;
};

export default replaceCategory;
