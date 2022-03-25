const hunterForm = document.getElementById("hunter-form");
const hunterOutput = document.getElementById("hunter-result");
const hunterLink = document.getElementById("hunter-link");
const styleSheets = document.styleSheets;


for (const key in styleSheets) {
    if (styleSheets.hasOwnProperty.call(styleSheets, key)) {
        let styleSheet = styleSheets[key];
        console.log(styleSheet);
        
        
    }
}

hunterForm.addEventListener("submit", (e) => {
    let siteLink = hunterLink.ariaValueMax;
    console.log(siteLink);

} )