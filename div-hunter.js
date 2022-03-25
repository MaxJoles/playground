const hunterForm = document.getElementById("hunter-form");
const hunterOutput = document.getElementById("hunter-result");
const hunterLink = document.getElementById("hunter-link");
const styleSheets = document.styleSheets;


for (const key in styleSheets) {
    if (styleSheets.hasOwnProperty.call(styleSheets, key)) {
        let styleSheet = styleSheets[key];
        let styeSheetUrl = new URL (styleSheet.href);
        let styleSheetDomain = styeSheetUrl.hostname;

        if (styleSheetDomain == "assets-global.website-files.com" || styleSheetDomain == "uploads-ssl.webflow.com" ) {
            console.log("Is Webflow Sitemap")
            console.log(styeSheetUrl);
        }


        console.log(styleSheet);
     
    }
}

hunterForm.addEventListener("submit", () => {
    let siteLink = hunterLink.value;
    console.log(siteLink);
    console.log("Form Submitted");

} )