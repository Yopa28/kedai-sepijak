// ============================================
// Recaptcha loader helper
// Kedai Sepijak Frontend
// ============================================

const RECAPTCHA_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";
let loadPromise = null;

export function loadRecaptcha() {
  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RECAPTCHA_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
      } else {
        reject(new Error("reCAPTCHA script loaded but grecaptcha is undefined"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.body.appendChild(script);
  });

  return loadPromise;
}
