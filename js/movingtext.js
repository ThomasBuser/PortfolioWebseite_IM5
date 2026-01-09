document.querySelectorAll('.scroll-line span').forEach(span => {
    const text = span.textContent;
    let repeatCount = 10; // Adjust as needed for seamless scrolling
    let repeatedText = '';
    for (let i = 0; i < repeatCount; i++) {
        repeatedText += text + ' ';
    }
    span.textContent = repeatedText;
});