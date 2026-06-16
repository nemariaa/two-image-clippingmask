window.addEventListener("DOMContentLoaded", () => {
  const mask = document.querySelector(".mask-image");

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 50);
    const y = Math.round((clientY / window.innerHeight) * 50);

    mask.style.setProperty("--x", `${x}%`);
    mask.style.setProperty("--y", `${y}%`);
  });
});
