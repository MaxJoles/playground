const hunterForm = document.getElementById("hunter-form");
const hunterOutput = document.getElementById("hunter-result");
const hunterLink = document.getElementById("hunter-link");
const styleSheets = document.styleSheets;

styleSheets.array.forEach(element => {
    console.log(element);
});

for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
        let styleSheet = object[key];
        console.log(styleSheet);
        
        
    }
}

hunterForm.addEventListener("submit", (e) => {
    let siteLink = hunterLink.ariaValueMax;
    console.log(siteLink);

} )