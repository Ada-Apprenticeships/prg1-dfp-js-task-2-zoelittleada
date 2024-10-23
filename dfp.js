const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  if (!fs.existsSync(indata)) return -1; //checks if indata file exists

  try{
    fs.writeFileSync(outdata, '') //clears or creates outdata file

    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/);

    count = 0 //counts the number of lines processed
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; //this skips any empty lines in the file
      
      //trims and splits lines so there are no white spaces and reviews are only 20 characters 
      const [review, sentiment] = line.split(delimiter).map(item => item.trim());
      const shortReview = review.substring(0,20);
      
      fs.appendFileSync(outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8');
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