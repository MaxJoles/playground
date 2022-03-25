const hunterForm = document.getElementById("hunter-form");
const hunterOutput = document.getElementById("hunter-result");
const hunterLink = document.getElementById("hunter-link");


function divHunter() {
    const styleSheets = document.styleSheets;
    for (const key in styleSheets) {
        let styleSheet = styleSheets[key];
        if (styleSheet.href) {
            console.log(styleSheet.href);
            let styeSheetUrl = new URL(styleSheet.href);
            let styleSheetDomain = styeSheetUrl.hostname;
            if (styleSheetDomain == "assets-global.website-files.com" || styleSheetDomain == "uploads-ssl.webflow.com") {
                console.log("Is Webflow Sitemap")
                console.log(styeSheetUrl);
                console.log(styleSheet.cssRules)
            }
        }
    }
}



hunterForm.addEventListener("submit", () => {
    let siteLink = hunterLink.value;
    console.log("Form Submitted");
})

