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

const glob = require("glob");
const { exec } = require("child_process");

const pdfFolder = "./pdf/";
const outFolder = "./out/"

const files = glob.sync(pdfFolder + "**/*.pdf");

const cmd = file => `java -jar ./buildvu-html-trial.jar ${file} ${outFolder}`;

files.forEach(file => {
  exec(cmd(file), (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(error);
    } else {
      console.log("Done!");
    }
  });
});
