const subString = (text: string, element?: string) => {
  if (element === "title") {
    if (text.length > 50) return text.substring(0, 50) + "...";
    else return text;
  } else {
    if (text.length > 120) return text.substring(0, 116) + "...";
    else return text;
  }
};

export default subString;
