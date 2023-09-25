import fs from "fs";

// const input = `>tr|A0A2U9ICR9|A0A2U9ICR9_9CREN ABC transporter ATP-binding protein OS=Acidianus brierleyi OX=41673 GN=DFR85_03490 PE=4 SV=1
// FYY
// >tr|A0A2U9IEJ5|A0A2U9IEJ5_9CREN Triphosphoribosyl-dephospho-CoA synthase OS=Acidianus brierleyi OX=41673 GN=DFR85_06900 PE=4 SV=1
// IYK`;

// Read the input from a file (assuming the file is named 'input.txt')
fs.readFile("Eukarya_total.HbYX.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the input file:", err);
    return;
  }

  const lines = data.split(">tr");
  const jsonResult = [];

  lines.forEach((line) => {
    const [info, motif] = line.split("\n");

    const matcher = info.match(
      /\|([A-Z0-9]+)\|([A-Z0-9]+_[A-Z0-9]+) ([A-Za-z- ]+) OS=([A-Za-z- ]+) OX=/
    );

    if (matcher) {
      const [, id, gene, name, species] = matcher;
      console.log(id, gene, name, species, motif);

      jsonResult.push({ id, gene, name, species, motif });
    }
  });

  // Convert the JSON to a string
  const jsonString = JSON.stringify(jsonResult, null, 2);

  // Write the JSON to a new file (assuming the file name is 'output.json')
  fs.writeFile("output.json", jsonString, (err) => {
    if (err) {
      console.error("Error writing the output file:", err);
      return;
    }
    console.log("JSON data has been written to output.json");
  });
});
