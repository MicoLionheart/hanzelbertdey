document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    header.classList.add("fade-in");
});

const birthDate = new Date("2001-01-10");
const ageElement = document.getElementById("age");

function calculateAge() {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const currentYear = today.getFullYear();
  
  let age = currentYear - birthYear;

  const birthdayThisYear = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  if (today < birthdayThisYear) {
    age -= 1;
  }
  
  return age;
}

ageElement.textContent = calculateAge();

const messageForm = document.getElementById('messageForm');
const userNameInput = document.getElementById('userName');
const userMessageInput = document.getElementById('userMessage');
const messageList = document.getElementById('messageList').querySelector('ul');
const archivedMessages = document.getElementById('archivedMessages').querySelector('ul');
const archivedSection = document.getElementById('archivedMessages');

let allMessages = JSON.parse(localStorage.getItem('messages')) || [];

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const userName = userNameInput.value.trim();
  const userMessage = userMessageInput.value.trim();

  if (userName && userMessage) {
    allMessages.unshift({ name: userName, message: userMessage });

    localStorage.setItem('messages', JSON.stringify(allMessages));

    updateMessageList();

    userNameInput.value = '';
    userMessageInput.value = '';
  }
});

function updateMessageList() {
  messageList.innerHTML = '';
  archivedMessages.innerHTML = '';

  const currentMessages = allMessages.slice(0, 20);
  currentMessages.forEach((msg) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${msg.name}:</strong> ${msg.message}`;
    messageList.appendChild(li);
  });

  const olderMessages = allMessages.slice(20);
  if (olderMessages.length > 0) {
    archivedSection.style.display = 'block';
    olderMessages.forEach((msg) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${msg.name}:</strong> ${msg.message}`;
      archivedMessages.appendChild(li);
    });
  } else {
    archivedSection.style.display = 'none';
  }
}

updateMessageList();


document.addEventListener("DOMContentLoaded", () => {
    const gallerySection = document.querySelector(".gallery");
    const leftAnimation = document.querySelector(".left-animation");
    const rightAnimation = document.querySelector(".right-animation");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            leftAnimation.classList.add("active");
            rightAnimation.classList.add("active");
          } else {
            leftAnimation.classList.remove("active");
            rightAnimation.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
  
    observer.observe(gallerySection);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("mobile-carousel");

    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    const images = Array.from(carousel.querySelectorAll("img"));

    images.forEach((img, index) => {
        img.addEventListener("touchstart", (event) => touchStart(event, index));
        img.addEventListener("touchmove", touchMove);
        img.addEventListener("touchend", touchEnd);
    });

    function touchStart(event, index) {
        isDragging = true;
        startPosition = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        carousel.classList.add("grabbing");
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPosition;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < images.length - 1) {
            currentIndex += 1;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        carousel.classList.remove("grabbing");
    }

    function getPositionX(event) {
        return event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
});