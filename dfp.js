const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  if (!fs.existsSync(indata)) return -1;

  count = 0

  try{
    fs.writeFileSync(outdata, '')
    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/);
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line == '') continue;
      const [index0, index1] = line.split(delimiter).map(item => item.trim());
      const reviews = index0.substring(0,20);
      //console.log(reviews)
      fs.appendFileSync(outdata, `${index1}${delimiter}${reviews}\n`, 'utf-8');
      count ++;
    }

    }catch (err) {
      console.error('Error parsing file:', err);
      return -1;
    }
    return count;
}
  
parseFile('./datafile.csv', './outputfile.csv')

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}