// Screens & forms
const loginForm = document.getElementById('user-form');
const loginScreen = document.getElementById('login-screen');
const initScreen = document.getElementById('init-screen');
const welcomeMessage = document.getElementById('welcome-message');
const userName = document.getElementById('user-name');

const femalepage = document.getElementById("second-screen");
const femBtn = document.getElementById('female-btn');
const malBtn = document.getElementById('male-btn');
const maleScreen = document.getElementById("third-screen");

const mesoGain = document.getElementById("meso-gain");
const mesoMain = document.getElementById("meso-ment");
const endoLoss = document.getElementById("endo-loss");
const ectoGain = document.getElementById("ecto-gain");

const weighForm = document.getElementById("weigh-form");
const weighPage = document.getElementById("weigh-page");
const heightForm = document.getElementById("height-form");
const heightPage = document.getElementById("height-page");
const ageForm = document.getElementById("age-form");
const agePage = document.getElementById("age-page");
const activityForm = document.getElementById("activity-form");
const activityPage = document.getElementById("activity-page");
const resultScreen = document.getElementById("result-screen");

const caloriesEl = document.getElementById("calories");
const proteinsEl = document.getElementById("proteins");
const carbsEl = document.getElementById("carbs");
const fatEl = document.getElementById("fat");

// female buttons effect

// Activity buttons
const lightly = document.getElementById("lightly");
const moderate = document.getElementById("moderate");
const very = document.getElementById("very");
const sedentary = document.getElementById("sedentary");

// Back buttons
const femBack = document.getElementById("femBack");
const malBack = document.getElementById("malBack");
const ageBack = document.getElementById("ageBack");
const weighBack = document.getElementById("weighBack");
const heightBack = document.getElementById("heightBack");
const activityBack = document.getElementById("activityBack");

// State variables
let gendre = "";
let genre = "";
let age, weigh, height;
let bmrResult, tdeeResult;
let activityFact = 1.375;

// ------------------- Login screen -------------------
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loginScreen.classList.remove('active');

    const message = `Welcome!`;
    let index = 0;
    welcomeMessage.textContent = '';
    welcomeMessage.style.opacity = '1';
    welcomeMessage.style.display = 'block';

    function typeWriter() {
        document.body.style.display = "flex";
        if (index < message.length) {
            welcomeMessage.textContent += message[index];
            index++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                welcomeMessage.style.opacity = '0';
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    initScreen.classList.add("active");
                }, 500);
            }, 1000);
        }
    }
    typeWriter();
});

// ------------------- Gender selection -------------------
femBtn.addEventListener("click", () => {
    gendre = "female";
    initScreen.classList.remove("active");
    femalepage.classList.add("active");
});

malBtn.addEventListener("click", () => {
    gendre = "male";
    initScreen.classList.remove("active");
    maleScreen.classList.add("active");
});

// ------------------- male Body type selection -------------------
mesoGain.addEventListener("click", () => {
    maleScreen.classList.remove("active");
    agePage.classList.add("active");
    genre = "mesog";
});

mesoMain.addEventListener("click", () => {
    maleScreen.classList.remove("active");
    agePage.classList.add("active");
    genre = "mesom";
});

endoLoss.addEventListener("click", () => {
    maleScreen.classList.remove("active");
    agePage.classList.add("active");
    genre = "endol";
});

ectoGain.addEventListener("click", () => {
    maleScreen.classList.remove("active");
    agePage.classList.add("active");
    genre = "ectog";
});
//the female body
const mesogFemale = document.getElementById("meso-gain-female");
const mesomFemale = document.getElementById("meso-ment-female");
const endolFemale = document.getElementById("endo-loss-female");
const ectogFemale = document.getElementById("ecto-gain-female");
// ------------------- female Body type selection -------------------
mesogFemale.addEventListener("click", () => {
    femalepage.classList.remove("active");
    agePage.classList.add("active");
    genre = "mesog";
});

mesomFemale.addEventListener("click", () => {
    femalepage.classList.remove("active");
    agePage.classList.add("active");
    genre = "mesom";
});

endolFemale.addEventListener("click", () => {
    femalepage.classList.remove("active");
    agePage.classList.add("active");
    genre = "endol";
});

ectogFemale.addEventListener("click", () => {
    femalepage.classList.remove("active");
    agePage.classList.add("active");
    genre = "ectog";
});

// ------------------- Age, weight, height forms -------------------
ageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    age = parseFloat(document.getElementById("age").value);
    agePage.classList.remove("active");
    weighPage.classList.add("active");
});

weighForm.addEventListener("submit", (e) => {
    e.preventDefault();
    weigh = parseFloat(document.getElementById("weigh").value);
    if (!weigh || !genre) return;
    weighPage.classList.remove("active");
    heightPage.classList.add("active");
});

heightForm.addEventListener("submit", (e) => {
    e.preventDefault();
    height = parseFloat(document.getElementById("height").value);
    if (!height || !genre) return;
    bmrResult = bmr(gendre, weigh, age, height);
    heightPage.classList.remove("active");
    activityPage.classList.add("active");
});

// ------------------- Activity form -------------------
activityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Genre before calculating macros:", genre);
    console.log("Weight:", weigh, "Height:", height, "BMR:", bmrResult, "Activity:", activityFact);

    if (!height || !genre || !weigh) {
        alert("Please fill in all previous fields");
        return;
    }

    tdeeResult = tdee(bmrResult, activityFact);
    const macros = calculateMacros(tdeeResult, genre, weigh);

    if (!macros) {
        alert("Error calculating macros");
        console.error("Invalid genre:", genre);
        return;
    }

    caloriesEl.innerHTML = `${macros.calories} kcal`;
    proteinsEl.innerHTML = `${macros.protein} g`;
    carbsEl.innerHTML = `${macros.carbs} g`;
    fatEl.innerHTML = `${macros.fat} g`;

    activityPage.classList.remove("active");
    resultScreen.classList.add("active");
});



// ------------------- Activity buttons -------------------
sedentary.addEventListener("click", () => { activityFact = 1.2; setActiveBtn(sedentary); });
lightly.addEventListener("click", () => { activityFact = 1.375; setActiveBtn(lightly); });
moderate.addEventListener("click", () => { activityFact = 1.55; setActiveBtn(moderate); });
very.addEventListener("click", () => { activityFact = 1.725; setActiveBtn(very); });

function setActiveBtn(btn) {
    [sedentary, lightly, moderate, very].forEach(b => b.classList.remove("btn-active"));
    btn.classList.add("btn-active");
}

// ------------------- Back buttons -------------------
femBack.addEventListener("click", () => {
    initScreen.classList.add("active");
    femalepage.classList.remove("active");
});
malBack.addEventListener("click", () => {
    initScreen.classList.add("active");
    maleScreen.classList.remove("active");
});
ageBack.addEventListener("click", (e) => {
    e.preventDefault();
    agePage.classList.remove("active");
    if (gendre === "male") maleScreen.classList.add("active");
    else femalepage.classList.add("active");
});
weighBack.addEventListener("click", (e) => {
    e.preventDefault();
    weighPage.classList.remove("active");
    agePage.classList.add("active");
});
heightBack.addEventListener("click", (e) => {
    e.preventDefault();
    heightPage.classList.remove("active");
    weighPage.classList.add("active");
});
activityBack.addEventListener("click", (e) => {
    e.preventDefault();
    activityPage.classList.remove("active");
    heightPage.classList.add("active");
});

// ------------------- BMR & TDEE -------------------
function bmr(gendre, weight, age, height) {
    if (gendre === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
    if (gendre === "female") return 10 * weight + 6.25 * height - 5 * age - 161;
    return null;
}

function tdee(bmrResult, activityFact) {
    return bmrResult * activityFact;
}

// ------------------- Macro calculator -------------------
function calculateMacros(tdee, type, weight) {
    let totalCalories, protein, fat, carbs;

    if (type === "mesog") {          // mesomorph gain
        totalCalories = tdee + 400;
        protein = 2 * weight;
        fat = totalCalories * 0.25 / 9;
    } else if (type === "mesom") {   // mesomorph maintenance
        totalCalories = tdee;
        protein = 1.8 * weight;
        fat = totalCalories * 0.25 / 9;
    } else if (type === "endol") {   // endomorph loss
        totalCalories = tdee - 400;
        protein = 2 * weight;
        fat = totalCalories * 0.33 / 9;
    } else if (type === "ectog") {   // ectomorph gain
        totalCalories = tdee + 400;
        protein = 2 * weight;
        fat = totalCalories * 0.2 / 9;
    } else {
        return null; // unknown type
    }

    carbs = (totalCalories - protein * 4 - fat * 9) / 4;

    return {
        calories: Math.round(totalCalories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat)
    };
}
// -------------creating pdf-----------

document.getElementById("download").addEventListener("click", () => {
    const button = document.getElementById("download");
    const contact = document.getElementById("contact");
    const dlBtn = document.getElementById("dl");
    button.style.display = 'none';
    contact.style.display = 'none';
    dlBtn.style.paddingRight = "130px";

    const element = document.getElementById("report");
    html2pdf()
        .from(element).save("Nutrition.pdf").then(() => {
            button.style.display = 'block';
            contact.style.display = 'block';
            dlBtn.style.paddingRight = "42px";
        });
});
// ------------contact button-------------
const contactBtn = document.getElementById("contact");
const contactPage = document.getElementById("contact-screen");
contactBtn.addEventListener("click", () => {
    resultScreen.classList.remove("active");
    contactPage.classList.add("active");

})
// ------------contact back button-------------
const contactBackBtn = document.getElementById("contactBack");
contactBackBtn.addEventListener("click", () => {
    resultScreen.classList.add("active");
    contactPage.classList.remove("active");
})
// ------------back to the start----------------
const backStartBtn = document.getElementById("backToStart");
backStartBtn.addEventListener("click", () => {
    contactPage.classList.remove("active");
    loginScreen.classList.add("active");
    location.reload();
})
