let n = 5;
let sum = 0;
let output = "";

for (let i = 1; i <= n; i++) {
    sum += i;
    output += i; 
    if (i < n) {
        output += "+"; 
    }
}

output += `=${sum}`; 
console.log(output);
