const hunterForm = document.getElementById("hunter-form");
const hunterOutput = document.getElementById("hunter-result");
const hunterLink = document.getElementById("hunter-link");
const styleSheets = document.styleSheets;

styleSheets.array.forEach(element => {
    console.log(element);
});


hunterForm.addEventListener("submit", (e) => {
    let siteLink = hunterLink.ariaValueMax;
    console.log(siteLink);

} )