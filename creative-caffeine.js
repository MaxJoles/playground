// Styles webflow theme based on time of day
var currentTime = new Date().getHours();
console.log(currentTime);

var dynamicThemeSelector = '[cc=theme]';
var times = {am: 5, mid: 11, pm: 17 };


if (times.am <= currentTime && currentTime < times.mid) {
    console.log('morning');
    $(dynamicThemeSelector).addClass( "morning" );

}

else if (11 <= currentTime && currentTime < 17) {
    console.log('afternoon');
}

else {
    console.log('night');
    $(dynamicThemeSelector).addClass( "night" );
}
