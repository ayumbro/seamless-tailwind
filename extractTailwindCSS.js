const execSync = require("child_process").execSync;
const tailwindVersion = [
  '3.1.6',
]
const tailwindPublicPath = `./public/tailwindcss/${tailwindVersion[0]}`;
const tailwindPublicLatestPath = './public/tailwindcss/latest';
const tailwindImports = ['tailwind-base', 'tailwind-components', 'tailwind-utilities'];
const exportTailwindCSS = () => {
  tailwindImports.forEach(file =>{
    console.log(`\nExporting: ${file} ${tailwindVersion[0]}`);
    execSync(`npx tailwindcss -i ./${file}.css -o ${tailwindPublicPath}/${file}.css`);
    execSync(`npx tailwindcss -i ./${file}.css -o ${tailwindPublicLatestPath}/${file}.css`);
  });
}
exportTailwindCSS();

const fs = require('fs');
tailwindBaseFile = `${tailwindPublicPath}/${tailwindImports[0]}.css`
tailwindBaseFileLatest = `${tailwindPublicLatestPath}/${tailwindImports[0]}.css`
tailwindUtilitiesFile = `${tailwindPublicPath}/${tailwindImports[2]}.css`

try {
  let data = fs.readFileSync(tailwindUtilitiesFile, 'utf8');
  // Replace all newlines to \n
  data = data.replace('\r\n', '\n'); // Windows
  data = data.replace('\r', '\n'); // Mac
  // Iterate every classes to valid LESS mixins
  const separatorRegex = /[\r\n][\r\n]/g; // This regex will also split @keyframes with nested rules, so need to handle the @keyframes at first iteration.
  const cssNormalClassRegex = /^\.[\w\-\:\.\\\/]+ \{/g;
  const cssDirectChildRegex = /^\..+ > .+\{/g;

  var dataToLESS = '';
  data.split(separatorRegex).forEach(item => {
    // filter out @keyframes and nested %{...}, append these to base.
    if ((!item.match(cssNormalClassRegex)) && (!item.match(cssDirectChildRegex))) {
      fs.writeFileSync(tailwindBaseFile, `${item}\n`, {encoding: "utf8", flag: 'a'});
      fs.writeFileSync(tailwindBaseFileLatest, `${item}\n`, {encoding: "utf8", flag: 'a'});
    } 
    // Put the rest classes(mixins) to LESS file
    else {
      // Add semi-colon at the end of each class
      item = item.replace('\n}',';\n}')
      // Rewrite css direct child syntax to valid LESS
      if (item.match(cssDirectChildRegex)){
        matchedPart = item.match(/> .+\{/g)[0];
        item = item.replace(matchedPart, `{\n ${matchedPart}`);
        item += '\n}'
      }
      dataToLESS += `${item}\n`
    }
  });
  fs.writeFileSync(`${tailwindPublicPath}/tailwind-utilities.less`, dataToLESS, {encoding: "utf8", flag: 'w'});
  fs.writeFileSync(`${tailwindPublicLatestPath}/tailwind-utilities.less`, dataToLESS, {encoding: "utf8", flag: 'w'});
} catch (err) {
  console.error(err);
}