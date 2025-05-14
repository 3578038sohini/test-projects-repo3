document.getElementById("generate").addEventListener("click", async () => {
    const memeImg = document.getElementById("meme");
    const generateBtn = document.getElementById("generate");

    memeImg.src = "";
    generateBtn.disabled = true;
    generateBtn.textContent = "Loading...";

    try {
        const response = await fetch("https://meme-api.com/gimme");
        const data = await response.json();

        if (data.url) {
            memeImg.crossOrigin = "anonymous";
            memeImg.src = data.url;
        } else {
            throw new Error("No meme url found in response");
        }
    } catch (error) {
        console.error(error);
        alert("Failed to load meme. Please try again.");
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Get Meme";
    }
});

document.getElementById("download").addEventListener("click", () => {
    const memeImg = document.getElementById("meme");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = memeImg.naturalWidth;
    canvas.height = memeImg.naturalHeight;

    ctx.drawImage(memeImg, 0, 0);

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});