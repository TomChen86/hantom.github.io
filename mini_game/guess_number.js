"use strict";

for (let i = 1; i <= 6; i = i + 1) {

    document.write("<table border='5'>");
    document.write('<tr><th colspan="8">第'+String(i)+'張卡片'
        + '<input type="checkbox">'
        + '</th></tr>'
    );
    
    for (let k=0,m=2**(i-1); k<= 31; k++) {
        if ((k%8) == 0) document.write("<tr>");
        document.write("<td>" + String(k*2 +m - (k%m)));
        document.write("</td>");
        if ((k%8) == 7) document.write("</tr>");
    }

    document.write("</table>");
    console.log(i);

}