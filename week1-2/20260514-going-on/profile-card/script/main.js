document.getElementById('call').addEventListener('click', function () {
    document.getElementById('popup').classList.add('active');
});

document.getElementById('hangup').addEventListener('click', function () {
    document.getElementById('popup').classList.remove('active');
});