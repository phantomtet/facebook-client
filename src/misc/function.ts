export const sleep = async (time) =>
  new Promise((res, rej) => setTimeout(res, time));
export const getDifferentTime = (time) => {
  let donvi = "m";
  let differentTime = Date.now() - new Date(time).getTime();
  differentTime /= 60000; // phut
  if (differentTime / 60 >= 1) {
    donvi = "h";
    differentTime /= 60;
    if (differentTime / 24 >= 1) {
      donvi = "d";
      differentTime /= 24;
      if (differentTime / 7 >= 1) {
        donvi = "w";
        differentTime /= 7;
        if (differentTime / 52 >= 1) {
          donvi = "y";
          differentTime /= 52;
        }
      }
    }
  }
  return (Math.floor(differentTime) || 1) + donvi;
};
export const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
