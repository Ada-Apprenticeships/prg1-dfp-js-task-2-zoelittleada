const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  if (!fs.existsSync(indata)) return -1; //checks if indata file exists

  //try..catch handles errors so the code doesn't crash
  try{
    fs.writeFileSync(outdata, '') //clears or creates outdata file

    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/);

    count = 0 //counts the number of lines processed to return at the end 
    
    //iterates through lines skipping the first one as this contains the headers 
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; //skips any empty lines in file
      
      //trims and splits lines so there are no white spaces and reviews are only 20 characters 
      const [review, sentiment] = line.split(delimiter).map(item => item.trim());
      const shortenedReview = review.substring(0,20);
      
      //appends sentiment and shortened review to outdata file in correct format 
      fs.appendFileSync(outdata, `${sentiment}${delimiter}${shortenedReview}\n`, 'utf-8');
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