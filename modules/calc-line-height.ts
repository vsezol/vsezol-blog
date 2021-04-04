export const calcLineHeight = (element: Element) => {
  const br = document.createElement('br');
  const initialHeight = element.scrollHeight;
  element.append(br);
  const newHeight = element.scrollHeight;
  element.removeChild(br);

  return newHeight - initialHeight;
};
