export function getBaseUrl(){
        return 'http://localhost:5000/';
}

export function sanitizeInput(e: any){
  // Allow: arrows, backspace, delete, enter, comma 
  if ([37, 39, 46, 8, 13, 189].indexOf(e.keyCode) !== -1 ||
  // Allow: big letters
  ((e.keyCode >= 65 && e.keyCode <= 90) && e.shiftKey === true) ||
  // Allow: Ctrl+A
  (e.keyCode === 65 && e.ctrlKey === true) ||
  // Allow: Shift + 2
  (e.keyCode === 50 && e.shiftKey === true)) {
  // let it happen, don't do anything
  return;
}
// Ensure that it is a word character and stop the keypress
if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105)) {
  e.preventDefault();
}
}