let pageTitle = document.getElementById("pageTitle");


// Typewriter effect variables and function
let typeWriterIndex = 0;
let typeWriterIsDeleting = false;
let titleText = pageTitle.textContent;
pageTitle.textContent = "";
function typeWriter(toAnimateObject, toAnimateText) {
    if (!typeWriterIsDeleting) {
        if (typeWriterIndex < toAnimateText.length) {
            toAnimateObject.textContent += toAnimateText.charAt(typeWriterIndex);
            typeWriterIndex++;
            setTimeout(() => typeWriter(toAnimateObject, toAnimateText), 100);
        } else {
            setTimeout(() => {
                typeWriterIsDeleting = true;
                typeWriter(toAnimateObject, toAnimateText);
            }, 2000);
        }
    } else {
        if (typeWriterIndex > 0) {
            toAnimateObject.textContent = toAnimateText.substring(0, typeWriterIndex - 1);
            typeWriterIndex--;
            setTimeout(() => typeWriter(toAnimateObject, toAnimateText), 50);
        } else {
            typeWriterIsDeleting = false;
            setTimeout(() => typeWriter(toAnimateObject, toAnimateText), 500);
        }
    }
}


typeWriter(pageTitle, titleText);