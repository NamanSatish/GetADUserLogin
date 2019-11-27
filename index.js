const Shell = require('node-powershell');
const command = "(Get-VMReplication |Select-Object -property name, ReplicationHealth| ConvertTo-Json -Compress)"
const check = "Get-VMReplication"
const ps = new Shell({                  // Constructor function, creating a new object
  executionPolicy: 'Bypass',            // Nothing is blocked and there are no warnings or prompts
  noProfile: true
});

ps.addCommand(check)  // Point the PS Script you want to use
ps.invoke()
.then(output => {
    console.log(output);
    ps.dispose();                
})
.catch(err => {
  console.log(err);
  ps.dispose();   
})