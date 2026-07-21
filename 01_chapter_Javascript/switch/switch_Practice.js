const num = parseInt(require('fs').readFileSync(0, 'utf8').trim());
switch(num)
{
    case 1:
    console.log("ONE");
    break;
    
    case 2:
    console.log("TWO");
    break;
    
    case 3:
    console.log("THREE");
    break;
    
    case 4:
    console.log("FOUR");
    break;
    
    case 5:
    console.log("FIVE");
    break;
    
    case 6:
    console.log("SIX");
    break;
    
    case 7:
    console.log("SEVEN");
    break;
    
    case 8:
    console.log("EIGHT");
    break;
    
    case 9:
    console.log("NINE");
    break;
    
    default:
    console.log("PLEASE TRY AGAIN");
    
}
// In the terminal:
// Type 15
// Press Enter
// Press Ctrl+D
//https://www.hackerrank.com/contests/7days-javascript/challenges/js-switch-statements/problem?isFullScreen=true