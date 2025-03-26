const output = document.getElementById("output");
const errorDiv = document.createElement("div");
errorDiv.id = "error";
document.body.appendChild(errorDiv);

const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.textContent = "Loading images...";
document.body.appendChild(loadingDiv);
loadingDiv.style.display = "none";

const button = document.createElement("button");
button.id = "download-images-button";
button.textContent = "Download Images";
document.body.appendChild(button);

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  const imagePromises = imageUrls.map(downloadImage);

  Promise.all(imagePromises)
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      errorDiv.textContent = error.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}

button.addEventListener("click", downloadImages);
