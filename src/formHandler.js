document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("contactFormToast");
  const toastIcon = document.getElementById("contactFormToastIcon");
  const toastMessage = document.getElementById("contactFormToastMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      toastMessage.innerText = "Message envoyé avec succès.";
      toast.classList.remove("hidden", "opacity-0");
      toast.classList.add("opacity-100");
      toastIcon.classList.remove("text-red-500");
      toastIcon.classList.add("text-primary");

      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
        setTimeout(() => toast.classList.add("hidden"), 500);
      }, 3000);

      form.reset();
    } catch (error) {
      console.log("Erreur capturée :", error);
      toastMessage.innerText = "Échec de l’envoi du message. Veuillez réessayer.";
      toast.classList.remove("hidden", "opacity-0");
      toast.classList.add("opacity-100");
      toastIcon.classList.remove("text-primary");
      toastIcon.classList.add("text-red-500");

      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
        setTimeout(() => toast.classList.add("hidden"), 500);
      }, 3000);
    }
  });
});
