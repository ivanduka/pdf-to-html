var exec = require("child_process").exec;

const file = "./file.pdf";

var cmd = `java -jar ./buildvu-html-trial.jar ${file} ./`;

exec(cmd, function(error, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);

  if (error) {
    console.log(error);
  } else {
    console.log("Done!");
  }
});
