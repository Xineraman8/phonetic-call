document.addEventListener("DOMContentLoaded", function () {
    const words = ["UR1299SWL", "RS0ISS", "KF7HJS", "VE3XRM", "IW3HMH", "KA1NIR", "ZL2BRF", "DL7GAG", "WA4YRF", "F4CQP", "JA5FNX", "VK4FWA"];
    const inputElement = document.getElementById("callsign");
    const internationalElement = document.getElementById("international");
    const uaElement = document.getElementById("ua");
    const ruElement = document.getElementById("ru");
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let deleting = false;
    let continueTyping = true;

    const phoneticAlphabet = {
        A: "Alfa", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot",
        G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima",
        M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo",
        S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey",
        X: "X-ray", Y: "Yankee", Z: "Zulu", 1: "One", 2: "Two", 3: "Three",
        4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 0: "Zero"
    };

    const phoneticAlphabetUa = {
        // Ukrainian Phonetic Alphabet
        A: "Антон", B: "Борис", C: "Центр", D: "Дмитро", E: "Еней", F: "Федір",
        G: "Григорій", H: "Христина", I: "Іван", J: "Йосип", K: "Кіловат", L: "Леонід",
        M: "Марія", N: "Наталка", O: "Ольга", P: "Павло", Q: "Щука", R: "Роман",
        S: "Степан", T: "Тамара", U: "Україна", V: "Жук", W: "Василь",
        X: "Знак", Y: "Ігрек", Z: "Зоя", 1: "Один", 2: "Два", 3: "Три",
        4: "Чотири", 5: "П'ять", 6: "Шість", 7: "Сім", 8: "Вісім", 9: "Дев'ять", 0: "Нуль"
    };

    const phoneticAlphabetRu = {
        // Russian Phonetic Alphabet
        A: "Анна", B: "Борис", C: "Центр", D: "Дмитрий", E: "Елена", F: "Фёдор",
        G: "Григорий", H: "Харитон", I: "Иван", J: "Иван краткий", K: "Константин", L: "Леонид",
        M: "Марія", N: "Наталка", O: "Ольга", P: "Павло", Q: "Щука", R: "Роман",
        S: "Сергей", T: "Тамара", U: "Ульяна", V: "Женя", W: "Василий",
        X: "Знак", Y: "Игрек", Z: "Зинаида", 1: "Один", 2: "Два", 3: "Три",
        4: "Четыре", 5: "Пять", 6: "Шесть", 7: "Семь", 8: "Восемь", 9: "Девять", 0: "Ноль"
    };

    function toPhonetic(text, alphabet) {
        return text
            .toUpperCase()
            .split("")
            .map((char) => alphabet[char] || char)
            .join(" ");
    }

    function typeWord() {
        if (!continueTyping) {
            return;
        }

        if (!deleting && currentCharIndex < words[currentWordIndex].length) {
            inputElement.value += words[currentWordIndex].charAt(currentCharIndex);
            currentCharIndex++;
        } else if (!deleting) {
            deleting = true;
            setTimeout(typeWord, 500);
            return;
        } else if (deleting && currentCharIndex > 0) {
            inputElement.value = inputElement.value.slice(0, -1);
            currentCharIndex--;
        } else if (deleting) {
            deleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }
        setTimeout(typeWord, deleting ? 50 : 150);
    }

    inputElement.addEventListener("focus", function () {
        continueTyping = false;
        inputElement.value = "";
    });

    inputElement.addEventListener("input", function () {
        internationalElement.innerText = toPhonetic(inputElement.value, phoneticAlphabet);
        uaElement.innerText = toPhonetic(inputElement.value, phoneticAlphabetUa);
        ruElement.innerText = toPhonetic(inputElement.value, phoneticAlphabetRu);
    });

    typeWord();
});
