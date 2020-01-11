// var exec = require("child_process").exec;

// const file = "./file.pdf";

// var cmd = `java -jar ./buildvu-html-trial.jar ${file} ./`;

// exec(cmd, function(error, stdout, stderr) {
//   console.log(stdout);
//   console.log(stderr);

//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Done!");
//   }
// });

const { exec } = require("child_process");

const pdfFolder = "./pdf/";
const outFolder = "./out/";
const cmd = `java -jar ./buildvu-html-trial.jar ${pdfFolder} ${outFolder}`;

exec(cmd, error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Done!");
  }
});
